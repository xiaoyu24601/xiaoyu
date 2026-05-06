import { downloads } from "../data/downloads-data.js";
import { aiNewsItems } from "../data/ai-news-data.js";
import { resources } from "../data/resources-data.js";
import { writeToClipboard } from "./utils.js";

export const initProjectInteractions = () => {
  const filterButtons = document.querySelectorAll("[data-filter]");
  const projectCards = document.querySelectorAll("[data-project-card]");
  const projectDialog = document.querySelector("[data-project-dialog]");
  const closeProject = document.querySelector("[data-close-project]");
  const dialogFields = {
    type: document.querySelector("[data-dialog-type]"),
    title: document.querySelector("[data-dialog-title]"),
    detail: document.querySelector("[data-dialog-detail]"),
    tools: document.querySelector("[data-dialog-tools]"),
    status: document.querySelector("[data-dialog-status]"),
  };

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      filterButtons.forEach((item) => item.classList.toggle("is-active", item === button));
      projectCards.forEach((card) => {
        const shouldShow = filter === "all" || card.dataset.category === filter;
        card.classList.toggle("is-hidden", !shouldShow);
      });
    });
  });

  const fillProjectDialog = (card) => {
    dialogFields.type.textContent = card.dataset.type || "";
    dialogFields.title.textContent = card.dataset.title || "";
    dialogFields.detail.textContent = card.dataset.detail || "";
    dialogFields.tools.textContent = card.dataset.tools || "";
    dialogFields.status.textContent = card.dataset.status || "";
  };

  const openProjectDialog = (card) => {
    if (!projectDialog) return;

    fillProjectDialog(card);

    if (typeof projectDialog.showModal === "function") {
      projectDialog.showModal();
    } else {
      projectDialog.setAttribute("open", "");
    }

    document.body.classList.add("dialog-open");
  };

  const closeProjectDialog = () => {
    if (!projectDialog) return;

    if (projectDialog.open && typeof projectDialog.close === "function") {
      projectDialog.close();
    } else {
      projectDialog.removeAttribute("open");
    }

    document.body.classList.remove("dialog-open");
  };

  projectCards.forEach((card) => {
    card.querySelector("[data-open-project]")?.addEventListener("click", () => openProjectDialog(card));
  });

  closeProject?.addEventListener("click", closeProjectDialog);

  projectDialog?.addEventListener("click", (event) => {
    if (event.target === projectDialog) {
      closeProjectDialog();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeProjectDialog();
    }
  });
};

export const initResourceInteractions = () => {
  const searchInput = document.querySelector("[data-resource-search]");
  const tagButtons = document.querySelectorAll("[data-resource-tag]");
  const categoryButtons = document.querySelectorAll("[data-resource-category]");
  const importantButton = document.querySelector("[data-resource-important]");
  const resetButton = document.querySelector("[data-resource-reset]");
  const list = document.querySelector("[data-resource-list]");
  const count = document.querySelector("[data-resource-count]");
  const categoryCounts = document.querySelectorAll("[data-category-count]");
  let renderResourceCard;

  if (!searchInput || !tagButtons.length || !categoryButtons.length || !list) return;

  const state = {
    query: "",
    category: "all",
    tag: "all",
    importantOnly: false,
  };

  const getCategoryItems = (category) => {
    if (category === "all") return resources;
    if (category === "featured") return resources.filter((item) => item.featured);
    return resources.filter((item) => item.category === category);
  };

  categoryCounts.forEach((item) => {
    const category = item.dataset.categoryCount || "all";
    item.textContent = getCategoryItems(category).length;
  });

  const renderResources = () => {
    if (!renderResourceCard) return;

    const query = state.query.trim().toLowerCase();
    const visibleItems = resources.filter((item) => {
      const fields = [item.title, item.description, item.category, item.url, item.backupUrl, item.note, ...(item.tags || [])].join(" ").toLowerCase();
      const matchesQuery = !query || fields.includes(query);
      const matchesCategory = state.category === "all" || (state.category === "featured" ? item.featured : item.category === state.category);
      const matchesTag = state.tag === "all" || item.tags?.includes(state.tag);
      const matchesImportant = !state.importantOnly || item.featured;
      return matchesQuery && matchesCategory && matchesTag && matchesImportant;
    });

    list.innerHTML =
      visibleItems.length > 0
        ? visibleItems.map(renderResourceCard).join("")
        : `<p class="empty-state">没有找到匹配的资源。可以调整分类、标签或搜索关键词。</p>`;

    if (count) count.textContent = visibleItems.length;
  };

  searchInput.addEventListener("input", (event) => {
    state.query = event.target.value;
    renderResources();
  });

  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      state.category = button.dataset.resourceCategory || "all";
      categoryButtons.forEach((item) => item.classList.toggle("is-active", item === button));
      renderResources();
    });
  });

  tagButtons.forEach((button) => {
    button.addEventListener("click", () => {
      state.tag = button.dataset.resourceTag || "all";
      tagButtons.forEach((item) => item.classList.toggle("is-active", item === button));
      renderResources();
    });
  });

  importantButton?.addEventListener("click", () => {
    state.importantOnly = !state.importantOnly;
    importantButton.classList.toggle("is-active", state.importantOnly);
    renderResources();
  });

  resetButton?.addEventListener("click", () => {
    state.query = "";
    state.category = "all";
    state.tag = "all";
    state.importantOnly = false;
    searchInput.value = "";
    categoryButtons.forEach((item) => item.classList.toggle("is-active", item.dataset.resourceCategory === "all"));
    tagButtons.forEach((item) => item.classList.toggle("is-active", item.dataset.resourceTag === "all"));
    importantButton?.classList.remove("is-active");
    renderResources();
  });

  list.addEventListener("click", async (event) => {
    const copyButton = event.target.closest("[data-copy-resource]");
    if (!copyButton) return;

    const originalText = copyButton.textContent;
    const didCopy = await writeToClipboard(copyButton.dataset.copyResource);
    copyButton.textContent = didCopy ? "Copied" : "Copy Failed";

    window.setTimeout(() => {
      copyButton.textContent = originalText;
    }, 1400);
  });

  import("./pages/resources.js").then((module) => {
    renderResourceCard = module.renderResourceCard;
    renderResources();
  });
};

export const initDownloadInteractions = () => {
  const searchInput = document.querySelector("[data-download-search]");
  const categoryButtons = document.querySelectorAll("[data-download-category]");
  const tagButtons = document.querySelectorAll("[data-download-tag]");
  const resetButton = document.querySelector("[data-download-reset]");
  const list = document.querySelector("[data-download-list]");
  const count = document.querySelector("[data-download-count]");
  const categoryCounts = document.querySelectorAll("[data-download-category-count]");
  let renderDownloadCard;

  if (!searchInput || !categoryButtons.length || !list) return;

  const state = {
    query: "",
    category: "all",
    tag: "all",
  };

  const getCategoryItems = (category) => {
    if (category === "all") return downloads;
    return downloads.filter((item) => item.category === category);
  };

  categoryCounts.forEach((item) => {
    const category = item.dataset.downloadCategoryCount || "all";
    item.textContent = getCategoryItems(category).length;
  });

  const renderDownloads = () => {
    if (!renderDownloadCard) return;

    const query = state.query.trim().toLowerCase();
    const visibleItems = downloads.filter((item) => {
      const fields = [
        item.name,
        item.version,
        item.platform,
        item.usage,
        item.description,
        item.note,
        item.risk,
        item.downloadUrl,
        item.backupUrl,
        item.category,
        ...(item.tags || []),
      ]
        .join(" ")
        .toLowerCase();
      const matchesQuery = !query || fields.includes(query);
      const matchesCategory = state.category === "all" || item.category === state.category;
      const matchesTag = state.tag === "all" || item.tags?.includes(state.tag);
      return matchesQuery && matchesCategory && matchesTag;
    });

    list.innerHTML =
      visibleItems.length > 0
        ? visibleItems.map(renderDownloadCard).join("")
        : `<p class="empty-state">没有找到匹配的下载项。可以调整分类或搜索关键词。</p>`;

    if (count) count.textContent = visibleItems.length;
  };

  searchInput.addEventListener("input", (event) => {
    state.query = event.target.value;
    renderDownloads();
  });

  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      state.category = button.dataset.downloadCategory || "all";
      categoryButtons.forEach((item) => item.classList.toggle("is-active", item === button));
      renderDownloads();
    });
  });

  tagButtons.forEach((button) => {
    button.addEventListener("click", () => {
      state.tag = button.dataset.downloadTag || "all";
      tagButtons.forEach((item) => item.classList.toggle("is-active", item === button));
      renderDownloads();
    });
  });

  resetButton?.addEventListener("click", () => {
    state.query = "";
    state.category = "all";
    state.tag = "all";
    searchInput.value = "";
    categoryButtons.forEach((item) => item.classList.toggle("is-active", item.dataset.downloadCategory === "all"));
    tagButtons.forEach((item) => item.classList.toggle("is-active", item.dataset.downloadTag === "all"));
    renderDownloads();
  });

  list.addEventListener("click", async (event) => {
    const copyButton = event.target.closest("[data-copy-download]");
    if (!copyButton) return;

    const originalText = copyButton.textContent;
    const didCopy = await writeToClipboard(copyButton.dataset.copyDownload);
    copyButton.textContent = didCopy ? "Copied" : "Copy Failed";

    window.setTimeout(() => {
      copyButton.textContent = originalText;
    }, 1400);
  });

  import("./pages/downloads.js").then((module) => {
    renderDownloadCard = module.renderDownloadCard;
    renderDownloads();
  });
};

export const initAiNewsInteractions = () => {
  const searchInput = document.querySelector("[data-ai-news-search]");
  const tagButtons = document.querySelectorAll("[data-ai-news-tag]");
  const categoryButtons = document.querySelectorAll("[data-ai-news-category]");
  const resetButton = document.querySelector("[data-ai-news-reset]");
  const list = document.querySelector("[data-ai-news-list]");
  const count = document.querySelector("[data-ai-news-count]");
  const categoryCounts = document.querySelectorAll("[data-ai-news-category-count]");
  let renderAiNewsCard;

  if (!searchInput || !tagButtons.length || !categoryButtons.length || !list) return;

  const state = {
    query: "",
    category: "all",
    tag: "all",
  };

  const getCategoryItems = (category) => {
    if (category === "all") return aiNewsItems;
    return aiNewsItems.filter((item) => item.category === category);
  };

  categoryCounts.forEach((item) => {
    const category = item.dataset.aiNewsCategoryCount || "all";
    item.textContent = getCategoryItems(category).length;
  });

  const renderNews = () => {
    if (!renderAiNewsCard) return;

    const query = state.query.trim().toLowerCase();
    const visibleItems = aiNewsItems.filter((item) => {
      const fields = [item.title, item.summary, item.source, item.category, item.url, ...(item.tags || [])].join(" ").toLowerCase();
      const matchesQuery = !query || fields.includes(query);
      const matchesCategory = state.category === "all" || item.category === state.category;
      const matchesTag = state.tag === "all" || item.tags?.includes(state.tag);
      return matchesQuery && matchesCategory && matchesTag;
    });

    list.innerHTML =
      visibleItems.length > 0
        ? visibleItems.map(renderAiNewsCard).join("")
        : `<p class="empty-state">没有找到匹配的 AI 资讯。可以调整分类、标签或搜索关键词。</p>`;

    if (count) count.textContent = visibleItems.length;
  };

  searchInput.addEventListener("input", (event) => {
    state.query = event.target.value;
    renderNews();
  });

  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      state.category = button.dataset.aiNewsCategory || "all";
      categoryButtons.forEach((item) => item.classList.toggle("is-active", item === button));
      renderNews();
    });
  });

  tagButtons.forEach((button) => {
    button.addEventListener("click", () => {
      state.tag = button.dataset.aiNewsTag || "all";
      tagButtons.forEach((item) => item.classList.toggle("is-active", item === button));
      renderNews();
    });
  });

  resetButton?.addEventListener("click", () => {
    state.query = "";
    state.category = "all";
    state.tag = "all";
    searchInput.value = "";
    categoryButtons.forEach((item) => item.classList.toggle("is-active", item.dataset.aiNewsCategory === "all"));
    tagButtons.forEach((item) => item.classList.toggle("is-active", item.dataset.aiNewsTag === "all"));
    renderNews();
  });

  import("./pages/ai-news.js").then((module) => {
    renderAiNewsCard = module.renderAiNewsCard;
    renderNews();
  });
};
