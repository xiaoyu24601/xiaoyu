import { contactLinks, siteMeta } from "../../data/site-data.js";
import { pageHero } from "../render-helpers.js";
import { escapeHtml } from "../utils.js";

export const renderContactPage = () => `
  ${pageHero({
    eyebrow: "Contact",
    title: "从这里找到我",
    copy: "联系信息继续沿用原站内容，复制邮箱作为独立状态管理，不影响其他页面交互。",
  })}
  <section class="section contact" data-defer-section>
    <div class="contact-panel reveal">
      <p class="eyebrow">Contact</p>
      <h2>如果你也有新的想法，可以从这里找到我。</h2>
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
