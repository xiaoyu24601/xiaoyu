import { featuredContent, home, quickEntries, recentUpdates } from "../../data/site-data.js";
import { linkCardList, sectionHeading } from "../render-helpers.js";
import { escapeHtml } from "../utils.js";

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
    ${sectionHeading({ eyebrow: "Updates", title: "最近更新" })}
    <div class="updates-list">
      ${recentUpdates
        .map(
          (item) => `
            <a class="update-item reveal" href="${escapeHtml(item.href)}">
              <time>${escapeHtml(item.date)}</time>
              <span>
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
    ${sectionHeading({ eyebrow: "Featured", title: "精选内容" })}
    ${linkCardList(featuredContent, "content-grid", "info-card feature-card")}
  </section>
`;
