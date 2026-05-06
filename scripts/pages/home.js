import { updates } from "../../data/updates-data.js";
import { aiNewsItems, aiNewsMeta } from "../../data/ai-news-data.js";
import { featuredContent, home, quickEntries } from "../../data/site-data.js";
import { linkCardList, sectionHeading } from "../render-helpers.js";
import { escapeHtml } from "../utils.js";

const recentUpdates = updates.slice(0, 5);
const latestAiNews = aiNewsItems.slice(0, 3);

const aiNewsUpdatedLabel = () => {
  if (!aiNewsMeta.generatedAt) return aiNewsMeta.updateLabel || "等待首次自动更新";

  try {
    return new Intl.DateTimeFormat("zh-CN", {
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(aiNewsMeta.generatedAt));
  } catch {
    return aiNewsMeta.updateLabel || aiNewsMeta.generatedAt;
  }
};

export const renderHomePage = () => `
  <section class="hero section" id="hero">
    <div class="cloud cloud-one" aria-hidden="true"></div>
    <div class="cloud cloud-two" aria-hidden="true"></div>
    <div class="star-pixels" aria-hidden="true"><span></span><span></span><span></span><span></span></div>

    <div class="hero-inner">
      <div class="hero-copy-block reveal">
        <p class="eyebrow">${escapeHtml(home.eyebrow)}</p>
        <h1>${escapeHtml(home.title)}</h1>
        <p class="hero-subtitle">${escapeHtml(home.subtitle)}</p>
        <p class="hero-copy">${escapeHtml(home.copy)}</p>
        <div class="hero-actions">
          ${home.actions
            .map((action) => `<a class="button ${escapeHtml(action.variant)}" href="${escapeHtml(action.href)}">${escapeHtml(action.text)}</a>`)
            .join("")}
        </div>
      </div>

      <div class="hero-art reveal" aria-label="像素风夏日插画">
        <img src="${escapeHtml(home.image)}" alt="${escapeHtml(home.imageAlt)}" fetchpriority="high" decoding="async" />
        <div class="glass-note">
          <span>${escapeHtml(home.noteLabel)}</span>
          <strong>${escapeHtml(home.noteText)}</strong>
        </div>
      </div>
    </div>
  </section>

  <section class="section home-overview" data-defer-section>
    ${sectionHeading({ eyebrow: "Quick Access", title: "快速入口" })}
    ${linkCardList(quickEntries, "overview-grid", "overview-card")}
  </section>

  <section class="section compact-section" data-defer-section>
    <div class="section-heading reveal section-heading-row">
      <div>
        <p class="eyebrow">最近更新</p>
        <h2>最近更新</h2>
      </div>
      <a class="section-link" href="blog.html">查看全部</a>
    </div>
    <div class="updates-list">
      ${recentUpdates
        .map(
          (item) => `
            <a class="update-item reveal" href="${escapeHtml(item.href)}">
              <time>${escapeHtml(item.date)}</time>
              <span>
                <i>${escapeHtml(item.type)}</i>
                <strong>${escapeHtml(item.title)}</strong>
                <em>${escapeHtml(item.summary)}</em>
              </span>
            </a>
          `
        )
        .join("")}
    </div>
  </section>

  <section class="section compact-section" data-defer-section>
    <div class="section-heading reveal section-heading-row">
      <div>
        <p class="eyebrow">AI 技术雷达</p>
        <h2>AI 资讯速览</h2>
      </div>
      <a class="section-link" href="ai-news.html">查看雷达</a>
    </div>
    <div class="ai-news-preview">
      <div class="ai-news-preview-meta reveal">
        <span>最近更新</span>
        <strong>${escapeHtml(aiNewsUpdatedLabel())}</strong>
        <p>${escapeHtml(aiNewsMeta.itemCount || latestAiNews.length)} 条资讯来自 ${escapeHtml(aiNewsMeta.sourceCount || "多")} 个来源</p>
      </div>
      <div class="ai-news-preview-list">
        ${latestAiNews
          .map(
            (item) => `
              <a class="ai-news-preview-card reveal" href="${escapeHtml(item.url)}" target="_blank" rel="noreferrer">
                <p class="project-type">${escapeHtml(item.source)} / ${escapeHtml(item.category || "AI")}</p>
                <h3>${escapeHtml(item.title)}</h3>
                <p>${escapeHtml(item.summary)}</p>
              </a>
            `
          )
          .join("")}
      </div>
    </div>
  </section>

  <section class="section compact-section" data-defer-section>
    ${sectionHeading({ eyebrow: "精选内容", title: "精选内容" })}
    ${linkCardList(featuredContent, "content-grid", "info-card feature-card")}
  </section>
`;
