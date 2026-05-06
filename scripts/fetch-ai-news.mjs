import { writeFile } from "node:fs/promises";

const sources = [
  { name: "OpenAI News", url: "https://openai.com/news/rss.xml", weight: 7 },
  { name: "Google Research", url: "https://research.google/blog/rss/", weight: 9 },
  { name: "Google DeepMind", url: "https://deepmind.google/blog/rss.xml", weight: 9 },
  { name: "Anthropic News", url: "https://www.anthropic.com/news/rss.xml", weight: 7 },
  { name: "Hugging Face Blog", url: "https://huggingface.co/blog/feed.xml", weight: 8 },
  { name: "The Batch", url: "https://www.deeplearning.ai/the-batch/feed/", weight: 7 },
  { name: "MIT News AI", url: "https://news.mit.edu/rss/topic/artificial-intelligence2", weight: 7 },
];

const repoQueries = [
  "agent llm stars:>800 pushed:>2026-02-01",
  "multi-agent stars:>500 pushed:>2026-02-01",
  "ai coding stars:>300 pushed:>2026-02-01",
  "code agent stars:>300 pushed:>2026-02-01",
  "mcp llm stars:>300 pushed:>2026-02-01",
  "rag llm stars:>800 pushed:>2026-02-01",
];

const fallbackRepos = [
  {
    name: "microsoft/autogen",
    description: "面向多智能体协作、工具调用和自动化工作流的开源框架。",
    url: "https://github.com/microsoft/autogen",
    stars: 48000,
    forks: 7200,
    language: "Python",
    updatedAt: "2026-05-01",
    topics: ["agents", "llm", "multi-agent", "workflow"],
    heatScore: 720,
    trendScore: 260,
  },
  {
    name: "langchain-ai/langchain",
    description: "构建 LLM 应用、RAG、工具调用和 Agent 工作流的核心框架。",
    url: "https://github.com/langchain-ai/langchain",
    stars: 108000,
    forks: 18000,
    language: "Python",
    updatedAt: "2026-05-01",
    topics: ["llm", "rag", "agents", "framework"],
    heatScore: 1680,
    trendScore: 310,
  },
  {
    name: "crewAIInc/crewAI",
    description: "用于编排角色化 AI Agent 团队和任务流的轻量框架。",
    url: "https://github.com/crewAIInc/crewAI",
    stars: 38000,
    forks: 5200,
    language: "Python",
    updatedAt: "2026-05-01",
    topics: ["agents", "automation", "workflow"],
    heatScore: 553,
    trendScore: 290,
  },
  {
    name: "continuedev/continue",
    description: "开源 AI 编程助手，可接入 IDE、本地模型和代码上下文。",
    url: "https://github.com/continuedev/continue",
    stars: 27000,
    forks: 2600,
    language: "TypeScript",
    updatedAt: "2026-05-01",
    topics: ["ai-coding", "ide", "llm"],
    heatScore: 356,
    trendScore: 245,
  },
  {
    name: "open-webui/open-webui",
    description: "本地和私有化 LLM Web UI，适合搭建个人 AI 工作台。",
    url: "https://github.com/open-webui/open-webui",
    stars: 92000,
    forks: 12000,
    language: "JavaScript",
    updatedAt: "2026-05-01",
    topics: ["local-ai", "llm", "ollama"],
    heatScore: 1320,
    trendScore: 275,
  },
  {
    name: "modelcontextprotocol/servers",
    description: "MCP 官方服务器集合，适合扩展 Agent 的工具和数据源能力。",
    url: "https://github.com/modelcontextprotocol/servers",
    stars: 15000,
    forks: 1800,
    language: "TypeScript",
    updatedAt: "2026-05-01",
    topics: ["mcp", "agents", "tool-use"],
    heatScore: 210,
    trendScore: 330,
  },
];

const strongTechTerms = [
  "agent",
  "agents",
  "ai coding",
  "code agent",
  "codex",
  "claude code",
  "copilot",
  "cursor",
  "mcp",
  "tool use",
  "workflow",
  "automation",
  "prompt",
  "rag",
  "retrieval",
  "embedding",
  "fine-tuning",
  "eval",
  "benchmark",
  "framework",
  "sdk",
  "api",
  "developer",
  "open source",
  "github",
  "repository",
  "release",
  "inference",
  "serving",
  "local ai",
  "ollama",
  "llama",
  "llm",
  "model",
  "multimodal",
  "reasoning",
  "智能体",
  "开源",
  "工作流",
  "提示词",
  "技能",
  "工具",
  "编程",
  "开发者",
  "本地模型",
];

const weakAiTerms = [
  "ai",
  "artificial intelligence",
  "生成式",
  "人工智能",
  "大模型",
];

const excludedTerms = [
  "ads",
  "advertising",
  "cfo",
  "finance",
  "funding",
  "investment",
  "revenue",
  "partnership",
  "collaborate",
  "policy",
  "regulation",
  "safety report",
  "office",
  "广告",
  "融资",
  "财务",
  "合作",
  "监管",
  "政策",
];

const categoryRules = [
  { name: "智能体", terms: ["agent", "agents", "workflow", "automation", "tool use", "mcp", "智能体"] },
  { name: "AI 编程", terms: ["ai coding", "code agent", "codex", "claude code", "copilot", "cursor", "developer"] },
  { name: "开源项目", terms: ["open source", "github", "release", "repository", "开源"] },
  { name: "模型技术", terms: ["model", "llm", "multimodal", "reasoning", "inference", "serving", "大模型"] },
  { name: "实用技能", terms: ["prompt", "rag", "retrieval", "embedding", "fine-tuning", "eval", "技能", "提示词"] },
  { name: "研究进展", terms: ["research", "paper", "benchmark", "dataset", "evaluation"] },
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
  return categoryRules.find((rule) => rule.terms.some((term) => haystack.includes(term)))?.name || "技术工具";
};

const buildTags = (title, summary, category) => {
  const haystack = `${title} ${summary}`.toLowerCase();
  const tags = [category];

  if (haystack.includes("open source") || haystack.includes("github")) tags.push("开源");
  if (haystack.includes("agent") || haystack.includes("workflow")) tags.push("智能体");
  if (haystack.includes("api") || haystack.includes("developer") || haystack.includes("sdk")) tags.push("开发者");
  if (haystack.includes("research") || haystack.includes("paper")) tags.push("研究");
  if (haystack.includes("model") || haystack.includes("llm")) tags.push("模型");
  if (haystack.includes("prompt") || haystack.includes("rag") || haystack.includes("embedding")) tags.push("技能");

  return [...new Set(tags)].slice(0, 4);
};

const isUsefulTechItem = (title, summary) => {
  const text = `${title} ${summary}`.toLowerCase();
  const strongMatches = strongTechTerms.filter((term) => text.includes(term)).length;
  const weakMatches = weakAiTerms.filter((term) => text.includes(term)).length;
  const excludedMatches = excludedTerms.filter((term) => text.includes(term)).length;

  return strongMatches > 0 && strongMatches * 2 + weakMatches - excludedMatches * 3 > 0;
};

const scoreItem = ({ title, summary, publishedAt, sourceWeight }) => {
  const text = `${title} ${summary}`.toLowerCase();
  const ageHours = publishedAt ? Math.max(0, (Date.now() - publishedAt.getTime()) / 36e5) : 168;
  const recencyScore = Math.max(0, 42 - Math.floor(ageHours / 6));
  const strongScore = strongTechTerms.reduce((score, term) => score + (text.includes(term) ? 6 : 0), 0);
  const weakScore = weakAiTerms.reduce((score, term) => score + (text.includes(term) ? 2 : 0), 0);
  const penalty = excludedTerms.reduce((score, term) => score + (text.includes(term) ? 10 : 0), 0);
  return Math.max(0, Math.min(100, Math.round(sourceWeight * 4 + recencyScore + strongScore + weakScore - penalty)));
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
    .filter((item) => item.title && item.url && isUsefulTechItem(item.title, item.summary));
};

const daysAgo = (days) => {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() - days);
  return date;
};

const isWithinDays = (dateValue, days) => {
  const date = new Date(dateValue);
  return !Number.isNaN(date.getTime()) && date >= daysAgo(days);
};

const periodSummary = (items, days) => {
  const scoped = items.filter((item) => isWithinDays(item.date, days));
  const categoryCounts = scoped.reduce((counts, item) => {
    counts[item.category] = (counts[item.category] || 0) + 1;
    return counts;
  }, {});
  const topCategory = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "技术工具";

  return {
    count: scoped.length,
    topCategory,
    topItems: scoped.slice(0, 3).map((item) => item.title),
  };
};

const fetchGitHubRepos = async () => {
  const headers = {
    "user-agent": "xiaoyu-ai-news-radar/1.0 (+https://github.com/)",
    accept: "application/vnd.github+json",
  };
  const allRepos = [];

  for (const query of repoQueries) {
    const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&sort=stars&order=desc&per_page=12`;
    const response = await fetch(url, { headers });

    if (!response.ok) continue;

    const data = await response.json();
    allRepos.push(...(data.items || []));
  }

  const seen = new Set();
  const repos = allRepos
    .filter((repo) => {
      const haystack = `${repo.full_name} ${repo.description || ""} ${(repo.topics || []).join(" ")}`.toLowerCase();
      const hasTechSignal = strongTechTerms.some((term) => haystack.includes(term));
      const hasEnoughStars = repo.stargazers_count >= 500;
      const isActive = isWithinDays(repo.pushed_at, 120);
      const key = repo.full_name.toLowerCase();

      if (seen.has(key) || !hasTechSignal || !hasEnoughStars || !isActive) return false;
      seen.add(key);
      return true;
    })
    .map((repo) => {
      const daysSinceCreated = Math.max(1, (Date.now() - new Date(repo.created_at).getTime()) / 864e5);
      const starsPerDay = repo.stargazers_count / daysSinceCreated;
      const recentBoost = isWithinDays(repo.pushed_at, 14) ? 1.25 : 1;
      const trendScore = Math.round((starsPerDay * 18 + repo.forks_count * 0.08 + repo.open_issues_count * 0.03) * recentBoost);

      return {
        name: repo.full_name,
        description: repo.description || "暂无描述",
        url: repo.html_url,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        language: repo.language || "Unknown",
        updatedAt: shortDate(repo.pushed_at),
        topics: (repo.topics || []).slice(0, 5),
        heatScore: Math.round(repo.stargazers_count / 100 + repo.forks_count / 30),
        trendScore,
      };
    });

  return repos.length ? repos : fallbackRepos;
};

const fallbackItems = [
  {
    title: "AI 资讯模块已就绪",
    source: "Local",
    category: "Tooling",
    date: "待更新",
    summary: "自动收集脚本暂未获取到足够的技术向内容。稍后重新运行 node scripts/fetch-ai-news.mjs 即可刷新。",
    url: "ai-news.html",
    tags: ["自动更新", "RSS", "AI 技术"],
    score: 0,
  },
];

const toModule = ({ items, repos, generatedAt, activeSources }) => {
  const hotRepos = [...repos].sort((a, b) => b.heatScore - a.heatScore || b.stars - a.stars).slice(0, 8);
  const risingRepos = [...repos].sort((a, b) => b.trendScore - a.trendScore || b.updatedAt.localeCompare(a.updatedAt)).slice(0, 8);
  const summaries = {
    daily: periodSummary(items, 1),
    weekly: periodSummary(items, 7),
    monthly: periodSummary(items, 30),
  };

  return `export const aiNewsMeta = ${JSON.stringify(
  {
    generatedAt,
    updateLabel: new Date(generatedAt).toLocaleString("zh-CN", { timeZone: "Asia/Shanghai" }),
    sourceCount: activeSources,
    itemCount: items.length,
    repoCount: repos.length,
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

export const aiRepoRadar = ${JSON.stringify({ hot: hotRepos, rising: risingRepos }, null, 2)};

export const aiNewsSummaries = ${JSON.stringify(summaries, null, 2)};
`;
};

const main = async () => {
  const [feedResults, repoResult] = await Promise.all([
    Promise.allSettled(sources.map(parseFeed)),
    fetchGitHubRepos().catch(() => fallbackRepos),
  ]);
  const results = feedResults;
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
    toModule({ items: items.length ? items : fallbackItems, repos: repoResult, generatedAt, activeSources }),
    "utf8"
  );

  console.log(`AI news updated: ${items.length} items and ${repoResult.length} repos from ${activeSources}/${sources.length} sources.`);
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
