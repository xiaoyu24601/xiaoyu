import { writeFile } from "node:fs/promises";

const sources = [
  { name: "OpenAI News", url: "https://openai.com/news/rss.xml", weight: 10 },
  { name: "Google Research", url: "https://research.google/blog/rss/", weight: 9 },
  { name: "Google DeepMind", url: "https://deepmind.google/blog/rss.xml", weight: 9 },
  { name: "Anthropic News", url: "https://www.anthropic.com/news/rss.xml", weight: 9 },
  { name: "Hugging Face Blog", url: "https://huggingface.co/blog/feed.xml", weight: 8 },
  { name: "The Batch", url: "https://www.deeplearning.ai/the-batch/feed/", weight: 7 },
  { name: "MIT News AI", url: "https://news.mit.edu/rss/topic/artificial-intelligence2", weight: 7 },
  { name: "TechCrunch AI", url: "https://techcrunch.com/category/artificial-intelligence/feed/", weight: 6 },
];

const aiTerms = [
  "ai",
  "artificial intelligence",
  "agent",
  "llm",
  "model",
  "open source",
  "multimodal",
  "reasoning",
  "inference",
  "robotics",
  "benchmark",
  "生成式",
  "人工智能",
  "大模型",
  "智能体",
];

const categoryRules = [
  { name: "Model", terms: ["model", "llm", "multimodal", "reasoning", "inference", "大模型"] },
  { name: "Agent", terms: ["agent", "workflow", "automation", "tool use", "智能体"] },
  { name: "Research", terms: ["research", "paper", "benchmark", "dataset", "evaluation"] },
  { name: "Open Source", terms: ["open source", "github", "release", "repository"] },
  { name: "Product", terms: ["launch", "product", "app", "api", "platform"] },
];

const decodeEntities = (value = "") =>
  value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&#x2F;/g, "/");

const stripHtml = (value = "") =>
  decodeEntities(value)
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const getTagValue = (xml, tag) => {
  const match = xml.match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tag}>`, "i"));
  return match ? decodeEntities(match[1]).trim() : "";
};

const getAtomLink = (xml) => {
  const alternate = xml.match(/<link[^>]+rel=["']alternate["'][^>]+href=["']([^"']+)["'][^>]*>/i);
  const any = xml.match(/<link[^>]+href=["']([^"']+)["'][^>]*>/i);
  return decodeEntities(alternate?.[1] || any?.[1] || "");
};

const getBlocks = (xml) => {
  const itemBlocks = [...xml.matchAll(/<item\b[\s\S]*?<\/item>/gi)].map((match) => match[0]);
  if (itemBlocks.length) return itemBlocks;
  return [...xml.matchAll(/<entry\b[\s\S]*?<\/entry>/gi)].map((match) => match[0]);
};

const normalizeUrl = (url = "") => url.split("?")[0].replace(/\/$/, "").toLowerCase();

const shortDate = (value) => {
  const date = value ? new Date(value) : new Date();
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 10);
};

const summarize = (text) => {
  const cleaned = stripHtml(text);
  if (cleaned.length <= 190) return cleaned;
  return `${cleaned.slice(0, 188).trim()}...`;
};

const detectCategory = (title, summary) => {
  const haystack = `${title} ${summary}`.toLowerCase();
  return categoryRules.find((rule) => rule.terms.some((term) => haystack.includes(term)))?.name || "Industry";
};

const buildTags = (title, summary, category) => {
  const haystack = `${title} ${summary}`.toLowerCase();
  const tags = [category];

  if (haystack.includes("open source") || haystack.includes("github")) tags.push("Open Source");
  if (haystack.includes("agent") || haystack.includes("workflow")) tags.push("Agent");
  if (haystack.includes("api") || haystack.includes("developer")) tags.push("Developer");
  if (haystack.includes("research") || haystack.includes("paper")) tags.push("Research");
  if (haystack.includes("model") || haystack.includes("llm")) tags.push("Model");

  return [...new Set(tags)].slice(0, 4);
};

const scoreItem = ({ title, summary, publishedAt, sourceWeight }) => {
  const text = `${title} ${summary}`.toLowerCase();
  const ageHours = publishedAt ? Math.max(0, (Date.now() - publishedAt.getTime()) / 36e5) : 168;
  const recencyScore = Math.max(0, 42 - Math.floor(ageHours / 6));
  const keywordScore = aiTerms.reduce((score, term) => score + (text.includes(term) ? 4 : 0), 0);
  return Math.min(100, Math.round(sourceWeight * 4 + recencyScore + keywordScore));
};

const parseFeed = async (source) => {
  const response = await fetch(source.url, {
    headers: {
      "user-agent": "xiaoyu-ai-news-radar/1.0 (+https://github.com/)",
      accept: "application/rss+xml, application/atom+xml, application/xml, text/xml",
    },
  });

  if (!response.ok) {
    throw new Error(`${source.name} returned ${response.status}`);
  }

  const xml = await response.text();
  return getBlocks(xml)
    .slice(0, 12)
    .map((block) => {
      const title = stripHtml(getTagValue(block, "title"));
      const rawSummary = getTagValue(block, "description") || getTagValue(block, "summary") || getTagValue(block, "content");
      const summary = summarize(rawSummary || title);
      const link = getTagValue(block, "link") || getAtomLink(block) || getTagValue(block, "guid") || source.url;
      const published = getTagValue(block, "pubDate") || getTagValue(block, "published") || getTagValue(block, "updated");
      const publishedAt = published ? new Date(published) : new Date();
      const category = detectCategory(title, summary);

      return {
        title,
        source: source.name,
        category,
        date: shortDate(publishedAt),
        summary,
        url: link,
        tags: buildTags(title, summary, category),
        score: scoreItem({ title, summary, publishedAt, sourceWeight: source.weight }),
      };
    })
    .filter((item) => item.title && item.url);
};

const fallbackItems = [
  {
    title: "AI 资讯模块已就绪",
    source: "Local",
    category: "System",
    date: "待更新",
    summary: "自动收集脚本暂未获取到外部内容。稍后重新运行 node scripts/fetch-ai-news.mjs 即可刷新。",
    url: "ai-news.html",
    tags: ["Auto Update", "RSS", "AI News"],
    score: 0,
  },
];

const toModule = ({ items, generatedAt, activeSources }) => `export const aiNewsMeta = ${JSON.stringify(
  {
    generatedAt,
    updateLabel: new Date(generatedAt).toLocaleString("zh-CN", { timeZone: "Asia/Shanghai" }),
    sourceCount: activeSources,
    itemCount: items.length,
  },
  null,
  2
)};

export const aiNewsSources = ${JSON.stringify(
  sources.map(({ name, url }) => ({ name, url })),
  null,
  2
)};

export const aiNewsItems = ${JSON.stringify(items, null, 2)};
`;

const main = async () => {
  const results = await Promise.allSettled(sources.map(parseFeed));
  const activeSources = results.filter((result) => result.status === "fulfilled").length;
  const allItems = results.flatMap((result) => (result.status === "fulfilled" ? result.value : []));
  const deduped = [];
  const seen = new Set();

  for (const item of allItems.sort((a, b) => b.score - a.score || String(b.date).localeCompare(String(a.date)))) {
    const key = normalizeUrl(item.url) || item.title.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    deduped.push(item);
  }

  const items = deduped.slice(0, 24);
  const generatedAt = new Date().toISOString();

  await writeFile(
    new URL("../data/ai-news-data.js", import.meta.url),
    toModule({ items: items.length ? items : fallbackItems, generatedAt, activeSources }),
    "utf8"
  );

  console.log(`AI news updated: ${items.length} items from ${activeSources}/${sources.length} sources.`);
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
