import { aiNewsItems, aiNewsMeta, aiNewsSources } from "../../data/ai-news-data.js";
import { pageHero } from "../render-helpers.js";
import { escapeHtml } from "../utils.js";

const newsTags = () => Array.from(new Set(aiNewsItems.flatMap((item) => item.tags || [])));
const newsCategories = () => Array.from(new Set(aiNewsItems.map((item) => item.category).filter(Boolean)));

const formatUpdateTime = () => {
  if (!aiNewsMeta.generatedAt) return aiNewsMeta.updateLabel || "等待首次自动更新";

  try {
    return new Intl.DateTimeFormat("zh-CN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(aiNewsMeta.generatedAt));
  } catch {
    return aiNewsMeta.updateLabel || aiNewsMeta.generatedAt;
  }
};

export const renderAiNewsPage = () => `
  ${pageHero({
    eyebrow: "AI Radar",
    title: "热门 AI 资讯聚合",
    copy: "自动收集整合优质 AI 新闻、研究进展、模型发布、开源项目和产品动态，按来源可信度、时效性和内容相关度排序。",
  })}

  <section class="section ai-news-section" data-defer-section>
    <div class="ai-news-shell reveal">
      <aside class="ai-news-sidebar" aria-label="AI 资讯筛选">
        <div class="resource-sidebar-head">
          <p class="eyebrow">Signals</p>
          <h2>资讯雷达</h2>
        </div>
        <dl class="ai-news-stats">
          <div>
            <dt>Last Update</dt>
            <dd>${escapeHtml(formatUpdateTime())}</dd>
          </div>
          <div>
            <dt>Sources</dt>
            <dd>${escapeHtml(aiNewsMeta.sourceCount || aiNewsSources.length)}</dd>
          </div>
          <div>
            <dt>Items</dt>
            <dd>${escapeHtml(aiNewsMeta.itemCount || aiNewsItems.length)}</dd>
          </div>
        </dl>
        <div class="category-filter" data-ai-news-category-group>
          <button class="category-button is-active" type="button" data-ai-news-category="all">
            <span>全部</span>
            <strong data-ai-news-category-count="all">0</strong>
          </button>
          ${newsCategories()
            .map(
              (category) => `
                <button class="category-button" type="button" data-ai-news-category="${escapeHtml(category)}">
                  <span>${escapeHtml(category)}</span>
                  <strong data-ai-news-category-count="${escapeHtml(category)}">0</strong>
                </button>
              `
            )
            .join("")}
        </div>
      </aside>

      <div class="ai-news-panel">
        <div class="resource-toolbar">
          <label class="search-field">
            <span>搜索资讯</span>
            <input type="search" placeholder="搜索标题、摘要、来源或标签" data-ai-news-search />
          </label>
          <button class="resource-reset download-reset" type="button" data-ai-news-reset>重置筛选</button>
        </div>

        <div class="tag-filter" aria-label="AI 资讯标签筛选">
          <button class="filter-button is-active" type="button" data-ai-news-tag="all">全部标签</button>
          ${newsTags()
            .map((tag) => `<button class="filter-button" type="button" data-ai-news-tag="${escapeHtml(tag)}">${escapeHtml(tag)}</button>`)
            .join("")}
        </div>

        <div class="resource-result-bar">
          <strong data-ai-news-count>${aiNewsItems.length}</strong>
          <span>signals collected</span>
          <a class="section-link ai-news-source-link" href="data/ai-news-data.js">查看数据</a>
        </div>

        <div class="ai-news-list" data-ai-news-list>
          ${aiNewsItems.map(renderAiNewsCard).join("")}
        </div>
      </div>
    </div>
  </section>
`;

export const renderAiNewsCard = (item) => `
  <article class="ai-news-card" data-ai-news-card>
    <div class="ai-news-card-head">
      <div>
        <p class="project-type">${escapeHtml(item.source)} / ${escapeHtml(item.category || "AI")}</p>
        <h3>${escapeHtml(item.title)}</h3>
      </div>
      <span class="version-pill">${escapeHtml(item.date || "Recent")}</span>
    </div>
    <p class="ai-news-summary">${escapeHtml(item.summary)}</p>
    <div class="mini-tags">
      ${(item.tags || []).map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}
    </div>
    <div class="ai-news-actions">
      <a class="resource-action primary" href="${escapeHtml(item.url)}" target="_blank" rel="noreferrer">Read Source</a>
      <span class="ai-news-score">Score ${escapeHtml(item.score ?? 0)}</span>
    </div>
  </article>
`;
