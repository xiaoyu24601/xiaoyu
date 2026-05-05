import { escapeHtml } from "./utils.js";

export const sectionHeading = ({ eyebrow, title }) => `
  <div class="section-heading reveal">
    <p class="eyebrow">${escapeHtml(eyebrow)}</p>
    <h2>${escapeHtml(title)}</h2>
  </div>
`;

export const pageHero = ({ eyebrow, title, copy }) => `
  <section class="section page-hero">
    <div class="page-hero-inner reveal">
      <p class="eyebrow">${escapeHtml(eyebrow)}</p>
      <h1>${escapeHtml(title)}</h1>
      <p>${escapeHtml(copy)}</p>
    </div>
  </section>
`;

export const linkCardList = (items, className = "content-grid", cardClassName = "info-card") => `
  <div class="${className}">
    ${items
      .map(
        (item) => `
          <a class="${cardClassName} reveal" href="${escapeHtml(item.href)}">
            <p class="project-type">${escapeHtml(item.label || item.date || "")}</p>
            <h3>${escapeHtml(item.title)}</h3>
            <p>${escapeHtml(item.summary)}</p>
          </a>
        `
      )
      .join("")}
  </div>
`;
