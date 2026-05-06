export { renderHomePage } from "./pages/home.js";
export { renderAboutPage } from "./pages/about.js";
export { renderProjectsPage } from "./pages/projects.js";
export { renderVocabularyPage, renderVocabularyCard } from "./pages/vocabulary.js";
export { renderResourcesPage, renderResourceCard } from "./pages/resources.js";
export { renderAiNewsPage, renderAiNewsCard } from "./pages/ai-news.js";
export { renderDownloadsPage, renderDownloadCard } from "./pages/downloads.js";
export { renderBlogPage } from "./pages/blog.js";
export { renderContactPage } from "./pages/contact.js";

export const pageRenderers = {
  home: (...args) => import("./pages/home.js").then((module) => module.renderHomePage(...args)),
  about: (...args) => import("./pages/about.js").then((module) => module.renderAboutPage(...args)),
  projects: (...args) => import("./pages/projects.js").then((module) => module.renderProjectsPage(...args)),
  vocabulary: (...args) => import("./pages/vocabulary.js").then((module) => module.renderVocabularyPage(...args)),
  resources: (...args) => import("./pages/resources.js").then((module) => module.renderResourcesPage(...args)),
  "ai-news": (...args) => import("./pages/ai-news.js").then((module) => module.renderAiNewsPage(...args)),
  downloads: (...args) => import("./pages/downloads.js").then((module) => module.renderDownloadsPage(...args)),
  blog: (...args) => import("./pages/blog.js").then((module) => module.renderBlogPage(...args)),
  contact: (...args) => import("./pages/contact.js").then((module) => module.renderContactPage(...args)),
};
