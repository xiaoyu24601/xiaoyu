import { resourceCategories, resources } from "../../data/site-data.js";
import { pageHero } from "../render-helpers.js";
import { escapeHtml } from "../utils.js";

const resourceTags = () => Array.from(new Set(resources.flatMap((item) => item.tags || [])));

const categoryLabel = (categoryId) => resourceCategories.find((item) => item.id === categoryId)?.label || categoryId;

export const renderResourcesPage = () => `
  ${pageHero({
    eyebrow: "Resources",
    title: "AI 资源管理面板",
    copy: "集中管理 AI 工具、提示词、模型平台、学习资料和常用链接，支持搜索、分类、标签和收藏筛选。",
  })}
  <section class="section resource-section" data-defer-section>
    <div class="resource-shell reveal">
      <aside class="resource-sidebar" aria-label="资源分类">
        <div class="resource-sidebar-head">
          <p class="eyebrow">Library</p>
          <h2>资源库</h2>
        </div>
        <div class="category-filter" data-resource-category-group>
          ${resourceCategories
            .map(
              (category, index) => `
                <button class="category-button ${index === 0 ? "is-active" : ""}" type="button" data-resource-category="${escapeHtml(category.id)}">
                  <span>${escapeHtml(category.label)}</span>
                  <strong data-category-count="${escapeHtml(category.id)}">0</strong>
                </button>
              `
            )
            .join("")}
        </div>
      </aside>

      <div class="resource-panel">
        <div class="resource-toolbar" data-resource-toolbar>
          <label class="search-field">
            <span>搜索资源</span>
            <input type="search" placeholder="搜索标题、描述、备注或标签" data-resource-search />
          </label>
          <button class="favorite-toggle" type="button" data-resource-important>
            <span>重要资源</span>
          </button>
        </div>

        <div class="tag-filter" aria-label="资源标签筛选">
          <button class="filter-button is-active" type="button" data-resource-tag="all">全部标签</button>
          ${resourceTags()
            .map((tag) => `<button class="filter-button" type="button" data-resource-tag="${escapeHtml(tag)}">${escapeHtml(tag)}</button>`)
            .join("")}
        </div>

        <div class="resource-result-bar">
          <strong data-resource-count>${resources.length}</strong>
          <span>items found</span>
          <button class="resource-reset" type="button" data-resource-reset>重置筛选</button>
        </div>

        <div class="resource-list" data-resource-list>
          ${resources.map(renderResourceCard).join("")}
        </div>
      </div>
    </div>
  </section>
`;

export const renderResourceCard = (item) => `
  <article class="resource-card ${item.isImportant ? "is-important" : ""} ${item.isFavorite ? "is-favorite" : ""}" data-resource-card>
    <div class="resource-card-main">
      <div class="resource-card-head">
        <div>
          <p class="project-type">${escapeHtml(categoryLabel(item.category))}</p>
          <h3>${escapeHtml(item.title)}</h3>
        </div>
        <div class="resource-flags" aria-label="资源标记">
          ${item.isImportant ? '<span class="flag important">Important</span>' : ""}
          ${item.isFavorite ? '<span class="flag favorite">Favorite</span>' : ""}
        </div>
      </div>
      <p>${escapeHtml(item.description)}</p>
      <dl class="resource-meta">
        <div>
          <dt>Note</dt>
          <dd>${escapeHtml(item.note)}</dd>
        </div>
        <div>
          <dt>URL</dt>
          <dd>${escapeHtml(item.url)}</dd>
        </div>
      </dl>
    </div>
    <div class="mini-tags">
      ${(item.tags || []).map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}
    </div>
    <div class="resource-actions">
      <a class="resource-action primary" href="${escapeHtml(item.url)}" target="_blank" rel="noreferrer">Open</a>
      <button class="resource-action" type="button" data-copy-resource="${escapeHtml(item.url)}">Copy Link</button>
      <a class="resource-action" href="${escapeHtml(item.backupUrl)}" target="_blank" rel="noreferrer">Backup Link</a>
    </div>
  </article>
`;
