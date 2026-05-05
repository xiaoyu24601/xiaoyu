import { downloadCategories, downloads } from "../../data/downloads-data.js";
import { pageHero } from "../render-helpers.js";
import { escapeHtml } from "../utils.js";

const downloadCategoryLabel = (categoryId) => downloadCategories.find((item) => item.id === categoryId)?.label || categoryId;

const downloadTags = () => Array.from(new Set(downloads.flatMap((item) => item.tags || [])));

export const renderDownloadsPage = () => `
  ${pageHero({
    eyebrow: "Downloads",
    title: "AI 工具下载中心",
    copy: "集中管理 AI 编程工具、本地 AI、开发工具和运行环境，支持搜索、分类、标签、官方下载入口和备用链接。",
  })}
  <section class="section download-section" data-defer-section>
    <div class="download-shell reveal">
      <aside class="download-sidebar" aria-label="下载分类">
        <div class="resource-sidebar-head">
          <p class="eyebrow">Center</p>
          <h2>下载分类</h2>
        </div>
        <div class="category-filter" data-download-category-group>
          ${downloadCategories
            .map(
              (category, index) => `
                <button class="category-button ${index === 0 ? "is-active" : ""}" type="button" data-download-category="${escapeHtml(category.id)}">
                  <span>${escapeHtml(category.label)}</span>
                  <strong data-download-category-count="${escapeHtml(category.id)}">0</strong>
                </button>
              `
            )
            .join("")}
        </div>
      </aside>

      <div class="download-panel">
        <div class="download-toolbar">
          <label class="search-field">
            <span>搜索下载项</span>
            <input type="search" placeholder="搜索名称、用途、平台、备注或分类" data-download-search />
          </label>
          <button class="resource-reset download-reset" type="button" data-download-reset>重置筛选</button>
        </div>

        <div class="tag-filter" aria-label="下载标签筛选">
          <button class="filter-button is-active" type="button" data-download-tag="all">全部标签</button>
          ${downloadTags()
            .map((tag) => `<button class="filter-button" type="button" data-download-tag="${escapeHtml(tag)}">${escapeHtml(tag)}</button>`)
            .join("")}
        </div>

        <div class="resource-result-bar">
          <strong data-download-count>${downloads.length}</strong>
          <span>downloads available</span>
        </div>

        <div class="download-list" data-download-list>
          ${downloads.map(renderDownloadCard).join("")}
        </div>
      </div>
    </div>
  </section>
`;

export const renderDownloadCard = (item) => `
  <article class="download-card" data-download-card>
    <div class="download-card-head">
      <div>
        <p class="project-type">${escapeHtml(downloadCategoryLabel(item.category))}</p>
        <h3>${escapeHtml(item.name)}</h3>
      </div>
      <span class="version-pill">${escapeHtml(item.version)}</span>
    </div>

    <p class="download-description">${escapeHtml(item.description)}</p>

    <dl class="download-meta">
      <div>
        <dt>Platform</dt>
        <dd>${escapeHtml(item.platform)}</dd>
      </div>
      <div>
        <dt>Usage</dt>
        <dd>${escapeHtml(item.usage)}</dd>
      </div>
    </dl>

    <div class="download-notes">
      <p><strong>Note</strong>${escapeHtml(item.note)}</p>
      <p><strong>Category</strong>${escapeHtml(downloadCategoryLabel(item.category))}</p>
    </div>

    <div class="mini-tags">
      ${(item.tags || []).map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}
    </div>

    <div class="download-actions">
      <a class="resource-action primary" href="${escapeHtml(item.downloadUrl)}" target="_blank" rel="noreferrer">Official Download</a>
      <button class="resource-action" type="button" data-copy-download="${escapeHtml(item.downloadUrl)}">Copy Link</button>
      <a class="resource-action" href="${escapeHtml(item.backupUrl)}" target="_blank" rel="noreferrer">Backup Link</a>
    </div>
  </article>
`;
