import { aiNewsItems, aiNewsMeta, aiNewsSources, aiNewsSummaries, aiRepoRadar } from "../../data/ai-news-data.js";
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
    eyebrow: "技术雷达",
    title: "AI 技术资讯",
    copy: "聚合 AI 工程实践、智能体、AI 编程、开源工具、模型技术和实用技能，并按日期、周期总结和仓库热度进行整理。",
  })}

  <section class="section ai-news-section" data-defer-section>
    <div class="ai-news-shell reveal">
      <aside class="ai-news-sidebar" aria-label="AI 资讯筛选">
        <div class="resource-sidebar-head">
          <p class="eyebrow">技术信号</p>
          <h2>资讯雷达</h2>
        </div>
        <dl class="ai-news-stats">
          <div>
            <dt>最近更新</dt>
            <dd>${escapeHtml(formatUpdateTime())}</dd>
          </div>
          <div>
            <dt>可用来源</dt>
            <dd>${escapeHtml(aiNewsMeta.sourceCount || aiNewsSources.length)}</dd>
          </div>
          <div>
            <dt>收录条数</dt>
            <dd>${escapeHtml(aiNewsMeta.itemCount || aiNewsItems.length)}</dd>
          </div>
          <div>
            <dt>仓库条数</dt>
            <dd>${escapeHtml(aiNewsMeta.repoCount || (aiRepoRadar.hot?.length || 0) + (aiRepoRadar.rising?.length || 0))}</dd>
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
          <label class="search-field">
            <span>按日期查询</span>
            <input type="date" data-ai-news-date />
          </label>
          <button class="resource-reset download-reset" type="button" data-ai-news-reset>重置筛选</button>
        </div>

        <div class="ai-news-summary-grid">
          ${renderSummaryCard("今日总结", aiNewsSummaries.daily)}
          ${renderSummaryCard("本周总结", aiNewsSummaries.weekly)}
          ${renderSummaryCard("本月总结", aiNewsSummaries.monthly)}
        </div>

        <div class="tag-filter" aria-label="AI 资讯标签筛选">
          <button class="filter-button is-active" type="button" data-ai-news-tag="all">全部标签</button>
          ${newsTags()
            .map((tag) => `<button class="filter-button" type="button" data-ai-news-tag="${escapeHtml(tag)}">${escapeHtml(tag)}</button>`)
            .join("")}
        </div>

        <div class="resource-result-bar">
          <strong data-ai-news-count>${aiNewsItems.length}</strong>
          <span>条技术资讯</span>
          <a class="section-link ai-news-source-link" href="data/ai-news-data.js">查看数据</a>
        </div>

        <div class="ai-news-list" data-ai-news-list>
          ${aiNewsItems.map(renderAiNewsCard).join("")}
        </div>
      </div>
    </div>
  </section>

  <section class="section compact-section" data-defer-section>
    <div class="section-heading reveal section-heading-row">
      <div>
        <p class="eyebrow">GitHub 雷达</p>
        <h2>高质量 AI 仓库</h2>
      </div>
      <a class="section-link" href="https://github.com/search?q=agent+llm+stars%3A%3E500&type=repositories" target="_blank" rel="noreferrer">查看更多</a>
    </div>
    <div class="repo-radar-grid">
      <div class="repo-radar-column reveal">
        <div class="repo-radar-head">
          <p class="eyebrow">高热度</p>
          <h3>星标和生态基础较强</h3>
        </div>
        ${aiRepoRadar.hot?.length ? aiRepoRadar.hot.map((repo) => renderRepoCard(repo, "热度", repo.heatScore)).join("") : '<p class="empty-state">暂无符合星标和活跃度要求的仓库。</p>'}
      </div>
      <div class="repo-radar-column reveal">
        <div class="repo-radar-head">
          <p class="eyebrow">上升趋势</p>
          <h3>近期活跃度更明显</h3>
        </div>
        ${aiRepoRadar.rising?.length ? aiRepoRadar.rising.map((repo) => renderRepoCard(repo, "趋势", repo.trendScore)).join("") : '<p class="empty-state">暂无符合趋势条件的仓库。</p>'}
      </div>
    </div>
  </section>
`;

const renderSummaryCard = (title, summary = {}) => `
  <article class="ai-news-summary-card">
    <span>${escapeHtml(title)}</span>
    <strong>${escapeHtml(summary.count || 0)} 条</strong>
    <p>重点方向：${escapeHtml(summary.topCategory || "暂无")}</p>
    <small>${escapeHtml((summary.topItems || []).slice(0, 2).join(" / ") || "等待更多技术信号")}</small>
  </article>
`;

export const renderAiNewsCard = (item) => `
  <article class="ai-news-card" data-ai-news-card>
    <div class="ai-news-card-head">
      <div>
        <p class="project-type">${escapeHtml(item.source)} / ${escapeHtml(item.category || "AI")}</p>
        <h3>${escapeHtml(item.title)}</h3>
      </div>
      <span class="version-pill">${escapeHtml(item.date || "近期")}</span>
    </div>
    <p class="ai-news-summary">${escapeHtml(item.summary)}</p>
    <div class="mini-tags">
      ${(item.tags || []).map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}
    </div>
    <div class="ai-news-actions">
      <a class="resource-action primary" href="${escapeHtml(item.url)}" target="_blank" rel="noreferrer">阅读原文</a>
      <span class="ai-news-score">热度 ${escapeHtml(item.score ?? 0)}</span>
    </div>
  </article>
`;

const renderRepoCard = (repo, scoreLabel, scoreValue) => `
  <a class="repo-card" href="${escapeHtml(repo.url)}" target="_blank" rel="noreferrer">
    <div class="repo-card-head">
      <strong>${escapeHtml(repo.name)}</strong>
      <span>${escapeHtml(scoreLabel)} ${escapeHtml(scoreValue)}</span>
    </div>
    <p>${escapeHtml(repo.description)}</p>
    <dl>
      <div><dt>星标</dt><dd>${escapeHtml(repo.stars)}</dd></div>
      <div><dt>分支</dt><dd>${escapeHtml(repo.forks)}</dd></div>
      <div><dt>语言</dt><dd>${escapeHtml(repo.language)}</dd></div>
      <div><dt>更新</dt><dd>${escapeHtml(repo.updatedAt)}</dd></div>
    </dl>
    <div class="mini-tags">
      ${(repo.topics || []).map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}
    </div>
  </a>
`;
