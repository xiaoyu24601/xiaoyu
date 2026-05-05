import { navigation, siteMeta } from "../data/site-data.js";
import { escapeHtml } from "./utils.js";

export const renderLayout = (page) => `
  <div class="ambient-grid" aria-hidden="true"></div>
  <div class="scroll-progress" aria-hidden="true" data-scroll-progress></div>

  <header class="site-header" data-header>
    <a class="brand" href="index.html" aria-label="返回首页">
      <span class="brand-mark" aria-hidden="true"></span>
      <span>${escapeHtml(siteMeta.name)}</span>
    </a>

    <nav class="site-nav" aria-label="主导航">
      <button class="nav-toggle" type="button" aria-label="打开菜单" aria-expanded="false" data-nav-toggle>
        <span></span>
        <span></span>
        <span></span>
      </button>
      <div class="nav-links" data-nav-links>
        ${navigation
          .map(
            (item) =>
              `<a href="${escapeHtml(item.href)}" class="${item.page === page ? "is-active" : ""}">${escapeHtml(
                item.text
              )}</a>`
          )
          .join("")}
      </div>
    </nav>

    <button class="theme-toggle" type="button" aria-label="切换深浅色模式" data-theme-toggle>
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M12 18.5A6.5 6.5 0 1 0 12 5.5a6.5 6.5 0 0 0 0 13Zm0 3a1 1 0 0 1-1-1v-.6a1 1 0 1 1 2 0v.6a1 1 0 0 1-1 1Zm0-17.4a1 1 0 0 1-1-1v-.6a1 1 0 1 1 2 0v.6a1 1 0 0 1-1 1ZM3.5 13H2.9a1 1 0 0 1 0-2h.6a1 1 0 1 1 0 2Zm17.6 0h-.6a1 1 0 1 1 0-2h.6a1 1 0 1 1 0 2ZM5.7 19.7a1 1 0 0 1-.7-1.7l.4-.4A1 1 0 1 1 6.8 19l-.4.4a1 1 0 0 1-.7.3Zm12.5-12.5a1 1 0 0 1-.7-1.7l.4-.4a1 1 0 1 1 1.4 1.4l-.4.4a1 1 0 0 1-.7.3Zm.4 12.8a1 1 0 0 1-.7-.3l-.4-.4a1 1 0 0 1 1.4-1.4l.4.4a1 1 0 0 1-.7 1.7ZM6.1 7.5a1 1 0 0 1-.7-.3L5 6.8a1 1 0 0 1 1.4-1.4l.4.4a1 1 0 0 1-.7 1.7Z" />
      </svg>
    </button>
  </header>

  <main class="page-main page-transition" data-page="${escapeHtml(page)}"></main>

  <dialog class="project-dialog" data-project-dialog>
    <button class="dialog-close" type="button" aria-label="关闭弹窗" data-close-project>×</button>
    <p class="project-type" data-dialog-type></p>
    <h2 data-dialog-title></h2>
    <p data-dialog-detail></p>
    <dl class="project-meta">
      <div>
        <dt>使用工具</dt>
        <dd data-dialog-tools></dd>
      </div>
      <div>
        <dt>当前状态</dt>
        <dd data-dialog-status></dd>
      </div>
    </dl>
  </dialog>

  <button class="back-to-top" type="button" aria-label="返回顶部" data-back-to-top>↑</button>

  <footer class="site-footer">
    <p>© <span data-year></span> ${escapeHtml(siteMeta.name)}. Built with summer light.</p>
  </footer>
`;
