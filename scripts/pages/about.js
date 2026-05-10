import { about, skills, timeline } from "../../data/site-data.js";
import { pageHero, sectionHeading } from "../render-helpers.js";
import { escapeHtml } from "../utils.js";

export const renderAboutPage = () => `
  ${pageHero({
    eyebrow: about.eyebrow,
    title: about.heroTitle,
    copy: about.heroCopy,
  })}
  <section class="section about" data-defer-section>
    ${sectionHeading({ eyebrow: about.eyebrow, title: about.title })}
    <div class="about-grid reveal">
      <p>${escapeHtml(about.intro)}</p>
      <div class="tag-list" aria-label="兴趣关键词">
        ${about.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}
      </div>
    </div>
  </section>
  <section class="section skills" data-defer-section>
    ${sectionHeading({ eyebrow: "Skills", title: "技能与工具" })}
    <div class="skill-grid">
      ${skills
        .map((skill) => `<div class="skill-item reveal"><span class="skill-icon">${escapeHtml(skill.icon)}</span><p>${escapeHtml(skill.text)}</p></div>`)
        .join("")}
    </div>
  </section>
  <section class="section timeline" data-defer-section>
    ${sectionHeading({ eyebrow: "Trace", title: "小小路线图" })}
    <ol class="timeline-list reveal">
      ${timeline.map((item) => `<li><time>${escapeHtml(item.time)}</time><span>${escapeHtml(item.text)}</span></li>`).join("")}
    </ol>
  </section>
`;
