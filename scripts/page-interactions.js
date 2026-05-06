import { downloads } from "../data/downloads-data.js";
import { aiNewsItems } from "../data/ai-news-data.js";
import { resources } from "../data/resources-data.js";
import { vocabularyWords } from "../data/vocabulary-data.js";
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
    copyButton.textContent = didCopy ? "已复制" : "复制失败";

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
    copyButton.textContent = didCopy ? "已复制" : "复制失败";

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
  const dateInput = document.querySelector("[data-ai-news-date]");
  const list = document.querySelector("[data-ai-news-list]");
  const count = document.querySelector("[data-ai-news-count]");
  const categoryCounts = document.querySelectorAll("[data-ai-news-category-count]");
  let renderAiNewsCard;

  if (!searchInput || !tagButtons.length || !categoryButtons.length || !list) return;

  const state = {
    query: "",
    category: "all",
    tag: "all",
    date: "",
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
      const matchesDate = !state.date || item.date === state.date;
      return matchesQuery && matchesCategory && matchesTag && matchesDate;
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

  dateInput?.addEventListener("change", (event) => {
    state.date = event.target.value;
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
    state.date = "";
    searchInput.value = "";
    if (dateInput) dateInput.value = "";
    categoryButtons.forEach((item) => item.classList.toggle("is-active", item.dataset.aiNewsCategory === "all"));
    tagButtons.forEach((item) => item.classList.toggle("is-active", item.dataset.aiNewsTag === "all"));
    renderNews();
  });

  import("./pages/ai-news.js").then((module) => {
    renderAiNewsCard = module.renderAiNewsCard;
    renderNews();
  });
};

export const initVocabularyInteractions = () => {
  const levelButtons = document.querySelectorAll("[data-vocab-level]");
  const tabButtons = document.querySelectorAll("[data-vocab-tab]");
  const searchInput = document.querySelector("[data-vocab-search]");
  const list = document.querySelector("[data-vocab-list]");
  const wordNode = document.querySelector("[data-vocab-word]");
  const meaningNode = document.querySelector("[data-vocab-meaning]");
  const detailNode = document.querySelector("[data-vocab-detail]");
  const sentenceNode = document.querySelector("[data-vocab-sentence]");
  const translationNode = document.querySelector("[data-vocab-translation]");
  const progressNode = document.querySelector("[data-vocab-progress]");
  const quizMeaning = document.querySelector("[data-vocab-quiz-meaning]");
  const answerInput = document.querySelector("[data-vocab-answer]");
  const checkButton = document.querySelector("[data-vocab-check]");
  const feedback = document.querySelector("[data-vocab-feedback]");
  const speakButton = document.querySelector("[data-vocab-speak]");
  const nextButton = document.querySelector("[data-vocab-next]");
  const dailyTargetInput = document.querySelector("[data-vocab-daily-target]");
  const retentionInput = document.querySelector("[data-vocab-retention]");
  const planResult = document.querySelector("[data-vocab-plan-result]");
  const reviewCurve = document.querySelector("[data-review-curve]");
  let renderVocabularyCard;

  if (!levelButtons.length || !list || !wordNode || !meaningNode || !detailNode) return;

  const state = {
    level: "junior",
    activeWord: vocabularyWords[0],
    tab: "grammar",
    query: "",
  };

  const detailText = (word) => {
    if (state.tab === "derivatives") return word.derivatives.join(" / ");
    if (state.tab === "collocations") return word.collocations.join(" / ");
    return word.grammar;
  };

  const levelWords = () => vocabularyWords.filter((word) => word.level === state.level);

  const updatePlan = () => {
    const dailyTarget = Number(dailyTargetInput?.value || 20);
    const retention = Number(retentionInput?.value || 85);
    const totalText = document.querySelector(`[data-vocab-level="${state.level}"] strong`)?.textContent || "";
    const estimatedTotal = Number(totalText.replace(/\D/g, "")) || levelWords().length;
    const days = Math.max(1, Math.ceil(estimatedTotal / Math.max(dailyTarget, 1)));

    if (planResult) {
      planResult.textContent = `预计 ${days} 天完成当前词书；每日 ${dailyTarget} 个新词，保持率目标 ${retention}%。`;
    }

    if (reviewCurve) {
      const reviewDays = [1, 2, 4, 7, 15, 30];
      reviewCurve.innerHTML = reviewDays
        .map(
          (day, index) => `
            <div class="review-step">
              <span>第 ${day} 天</span>
              <strong>${index === 0 ? "首次复习" : `第 ${index + 1} 轮`}</strong>
              <em>${Math.max(1, Math.round(dailyTarget * Math.pow(retention / 100, index)))} 个复习量</em>
            </div>
          `
        )
        .join("");
    }
  };

  const fillWord = (word) => {
    state.activeWord = word;
    wordNode.textContent = word.word;
    meaningNode.textContent = word.meaning;
    detailNode.textContent = detailText(word);
    if (sentenceNode) sentenceNode.textContent = word.sentence;
    if (translationNode) translationNode.textContent = word.translation;
    if (quizMeaning) quizMeaning.textContent = word.meaning;
    if (answerInput) answerInput.value = "";
    if (feedback) feedback.textContent = "准备开始";

    const index = levelWords().findIndex((item) => item.word === word.word) + 1;
    if (progressNode) progressNode.textContent = `${Math.max(index, 1)} / ${levelWords().length}`;
    updatePlan();
  };

  const renderList = () => {
    if (!renderVocabularyCard) return;

    const query = state.query.trim().toLowerCase();
    const visibleWords = vocabularyWords.filter((word) => {
      const fields = [word.word, word.meaning, word.part, word.grammar, word.root, ...(word.derivatives || []), ...(word.collocations || [])].join(" ").toLowerCase();
      return word.level === state.level && (!query || fields.includes(query));
    });

    list.innerHTML =
      visibleWords.length > 0
        ? visibleWords.map(renderVocabularyCard).join("")
        : `<p class="empty-state">没有找到匹配的单词，可以切换阶段或换一个关键词。</p>`;

    if (!visibleWords.some((word) => word.word === state.activeWord.word) && visibleWords[0]) {
      fillWord(visibleWords[0]);
    }
  };

  levelButtons.forEach((button) => {
    button.addEventListener("click", () => {
      state.level = button.dataset.vocabLevel || "junior";
      levelButtons.forEach((item) => item.classList.toggle("is-active", item === button));
      fillWord(levelWords()[0] || vocabularyWords[0]);
      renderList();
      updatePlan();
    });
  });

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      state.tab = button.dataset.vocabTab || "grammar";
      tabButtons.forEach((item) => item.classList.toggle("is-active", item === button));
      detailNode.textContent = detailText(state.activeWord);
    });
  });

  searchInput?.addEventListener("input", (event) => {
    state.query = event.target.value;
    renderList();
  });

  list.addEventListener("click", (event) => {
    const card = event.target.closest("[data-vocab-card]");
    if (!card) return;

    const word = vocabularyWords.find((item) => item.word === card.dataset.word);
    if (word) fillWord(word);
  });

  checkButton?.addEventListener("click", () => {
    const value = answerInput?.value.trim().toLowerCase();
    if (!feedback || !value) return;
    feedback.textContent = value === state.activeWord.word.toLowerCase() ? "拼写正确" : `再试一次：${state.activeWord.word}`;
  });

  speakButton?.addEventListener("click", () => {
    if (!("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(state.activeWord.word);
    utterance.lang = "en-US";
    utterance.rate = 0.82;
    window.speechSynthesis.speak(utterance);
  });

  nextButton?.addEventListener("click", () => {
    const words = levelWords();
    const currentIndex = words.findIndex((word) => word.word === state.activeWord.word);
    const nextWord = words[(currentIndex + 1) % words.length] || vocabularyWords[0];
    fillWord(nextWord);
  });

  dailyTargetInput?.addEventListener("input", updatePlan);
  retentionInput?.addEventListener("input", updatePlan);

  import("./pages/vocabulary.js").then((module) => {
    renderVocabularyCard = module.renderVocabularyCard;
    fillWord(state.activeWord);
    renderList();
    updatePlan();
  });
};
