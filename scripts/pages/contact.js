import { contactLinks, contactPage, siteMeta } from "../../data/site-data.js";
import { pageHero } from "../render-helpers.js";
import { escapeHtml } from "../utils.js";

export const renderContactPage = () => `
  ${pageHero({
    eyebrow: contactPage.eyebrow,
    title: contactPage.title,
    copy: contactPage.copy,
  })}
  <section class="section contact" data-defer-section>
    <div class="contact-panel reveal">
      <p class="eyebrow">${escapeHtml(contactPage.eyebrow)}</p>
      <h2>${escapeHtml(contactPage.copy)}</h2>
      <div class="contact-list">
        ${contactLinks
          .map(
            (link) =>
              `<a class="contact-link" href="${escapeHtml(link.href)}" target="${link.href.startsWith("http") ? "_blank" : "_self"}" rel="noreferrer"><span>${escapeHtml(
                link.label
              )}</span><strong>${escapeHtml(link.value)}</strong></a>`
          )
          .join("")}
        <button class="contact-link" type="button" data-copy-email="${escapeHtml(siteMeta.email)}">
          <span>复制邮箱</span>
          <strong data-copy-label>一键复制地址</strong>
        </button>
      </div>
    </div>
  </section>
`;
