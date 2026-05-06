import { projects } from "../../data/site-data.js";
import { pageHero } from "../render-helpers.js";
import { escapeHtml } from "../utils.js";

export const renderProjectsPage = () => {
  const filters = [
    { label: "全部", value: "all" },
    ...Array.from(new Map(projects.map((project) => [project.category, { label: project.categoryLabel, value: project.category }])).values()),
  ];

  return `
    ${pageHero({
      eyebrow: "Projects",
      title: "作品展示",
      copy: "保留原有项目内容，并把项目卡片改为配置驱动渲染，后续新增作品只需要更新数据。",
    })}
    <section class="section work" data-defer-section>
      <div class="project-filters reveal" aria-label="作品筛选">
        ${filters
          .map(
            (filter, index) =>
              `<button class="filter-button ${index === 0 ? "is-active" : ""}" type="button" data-filter="${escapeHtml(filter.value)}">${escapeHtml(
                filter.label
              )}</button>`
          )
          .join("")}
      </div>
      <div class="project-grid">
        ${projects
          .map(
            (project) => `
              <article
                class="project-card reveal"
                data-project-card
                data-category="${escapeHtml(project.category)}"
                data-title="${escapeHtml(project.title)}"
                data-type="${escapeHtml(project.type)}"
                data-detail="${escapeHtml(project.detail)}"
                data-tools="${escapeHtml(project.tools)}"
                data-status="${escapeHtml(project.status)}"
              >
                <img src="${escapeHtml(project.image)}" alt="${escapeHtml(project.imageAlt)}" loading="lazy" decoding="async" />
                <div>
                  <p class="project-type">${escapeHtml(project.type)}</p>
                  <h3>${escapeHtml(project.title)}</h3>
                  <p>${escapeHtml(project.summary)}</p>
                  <div class="project-card-actions">
                    <button class="project-more" type="button" data-open-project>查看详情</button>
                    ${
                      project.href
                        ? `<a class="project-more project-link" href="${escapeHtml(project.href)}">打开作品</a>`
                        : ""
                    }
                  </div>
                </div>
              </article>
            `
          )
          .join("")}
      </div>
    </section>
  `;
};
