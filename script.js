import { renderLayout } from "./scripts/layout.js";
import { writeToClipboard } from "./scripts/utils.js";

const currentScript = document.currentScript;
const page = currentScript?.dataset.page || document.body.dataset.page || "home";

const pageModuleLoaders = {
  home: () => import("./scripts/pages/home.js").then((module) => module.renderHomePage),
  about: () => import("./scripts/pages/about.js").then((module) => module.renderAboutPage),
  projects: () => import("./scripts/pages/projects.js").then((module) => module.renderProjectsPage),
  resources: () => import("./scripts/pages/resources.js").then((module) => module.renderResourcesPage),
  downloads: () => import("./scripts/pages/downloads.js").then((module) => module.renderDownloadsPage),
  blog: () => import("./scripts/pages/blog.js").then((module) => module.renderBlogPage),
  contact: () => import("./scripts/pages/contact.js").then((module) => module.renderContactPage),
};

const interactionLoaders = {
  projects: () => import("./scripts/page-interactions.js").then((module) => module.initProjectInteractions()),
  resources: () => import("./scripts/page-interactions.js").then((module) => module.initResourceInteractions()),
  downloads: () => import("./scripts/page-interactions.js").then((module) => module.initDownloadInteractions()),
};

const mountLayout = () => {
  document.body.insertAdjacentHTML("afterbegin", renderLayout(page));
};

const mountPage = async () => {
  const main = document.querySelector(".page-main");
  const loadRenderer = pageModuleLoaders[page] || pageModuleLoaders.home;
  const renderPage = await loadRenderer();
  main.innerHTML = renderPage();
};

const initTheme = () => {
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;

  if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
    document.documentElement.dataset.theme = "dark";
  }
};

const initLayoutState = () => {
  const header = document.querySelector("[data-header]");
  const progress = document.querySelector("[data-scroll-progress]");
  const backToTop = document.querySelector("[data-back-to-top]");
  const year = document.querySelector("[data-year]");
  let ticking = false;

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  const updateHeader = () => {
    ticking = false;
    header?.classList.toggle("is-scrolled", window.scrollY > 16);
    backToTop?.classList.toggle("is-visible", window.scrollY > 420);

    if (progress) {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const percent = scrollable > 0 ? window.scrollY / scrollable : 0;
      progress.style.transform = `scaleX(${Math.min(percent, 1)})`;
    }
  };

  const requestUpdate = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(updateHeader);
  };

  updateHeader();
  window.addEventListener("scroll", requestUpdate, { passive: true });

  backToTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
};

const initNavigation = () => {
  const navToggle = document.querySelector("[data-nav-toggle]");
  const navLinks = document.querySelector("[data-nav-links]");

  const closeMenu = () => {
    document.body.classList.remove("nav-open");
    navLinks?.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
    navToggle?.setAttribute("aria-label", "打开菜单");
  };

  if (!navToggle || !navLinks) return;

  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    document.body.classList.toggle("nav-open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "关闭菜单" : "打开菜单");
  });

  navLinks.addEventListener("click", (event) => {
    if (event.target.matches("a")) {
      closeMenu();
    }
  });
};

const initThemeToggle = () => {
  const themeToggle = document.querySelector("[data-theme-toggle]");

  themeToggle?.addEventListener("click", () => {
    const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";

    if (nextTheme === "dark") {
      document.documentElement.dataset.theme = "dark";
    } else {
      delete document.documentElement.dataset.theme;
    }

    localStorage.setItem("theme", nextTheme);
  });
};

const initReveal = () => {
  const revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );

    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }
};

const initDeferredSections = () => {
  const sections = document.querySelectorAll("[data-defer-section]");

  if (!("IntersectionObserver" in window)) {
    sections.forEach((section) => section.classList.add("is-ready"));
    return;
  }

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-ready");
          sectionObserver.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "220px 0px", threshold: 0.01 }
  );

  sections.forEach((section) => sectionObserver.observe(section));
};

const initCopyEmail = () => {
  const copyEmailButton = document.querySelector("[data-copy-email]");
  const copyLabel = document.querySelector("[data-copy-label]");

  copyEmailButton?.addEventListener("click", async () => {
    const email = copyEmailButton.dataset.copyEmail;
    if (!email || !copyLabel) return;

    const didCopy = await writeToClipboard(email);
    copyLabel.textContent = didCopy ? "已复制，直接粘贴即可" : email;

    window.setTimeout(() => {
      copyLabel.textContent = "一键复制地址";
    }, 1800);
  });
};

const initCurrentPageInteractions = async () => {
  const loadInteractions = interactionLoaders[page];
  if (loadInteractions) {
    await loadInteractions();
  }
};

const boot = async () => {
  initTheme();
  mountLayout();
  initLayoutState();
  initNavigation();
  initThemeToggle();
  await mountPage();
  initReveal();
  initDeferredSections();
  initCopyEmail();
  await initCurrentPageInteractions();
};

boot();
