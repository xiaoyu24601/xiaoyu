import { posts } from "../../data/site-data.js";
import { pageHero, sectionHeading } from "../render-helpers.js";
import { escapeHtml } from "../utils.js";

export const renderBlogPage = () => `
  ${pageHero({
    eyebrow: "Blog",
    title: "博客与内容沉淀",
    copy: "博客页先提供文章列表骨架，适合后续扩展为 Markdown、JSON 或静态文章目录。",
  })}
  <section class="section" data-defer-section>
    ${sectionHeading({ eyebrow: "Writing", title: "文章列表" })}
    <div class="content-grid two-columns">
      ${posts
        .map(
          (post) => `
            <article class="info-card reveal">
              <p class="project-type">${escapeHtml(post.category)} / ${escapeHtml(post.date)}</p>
              <h3>${escapeHtml(post.title)}</h3>
              <p>${escapeHtml(post.summary)}</p>
              <span class="status-pill">${escapeHtml(post.status)}</span>
            </article>
          `
        )
        .join("")}
    </div>
  </section>
`;
