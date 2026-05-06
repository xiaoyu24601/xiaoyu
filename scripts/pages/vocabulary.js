import { vocabularyLevels, vocabularyWords } from "../../data/vocabulary-data.js";
import { pageHero } from "../render-helpers.js";
import { escapeHtml } from "../utils.js";

const levelLabel = (levelId) => vocabularyLevels.find((item) => item.id === levelId)?.label || levelId;
const featuredWord = vocabularyWords[0];

export const renderVocabularyPage = () => `
  ${pageHero({
    eyebrow: "Word Studio",
    title: "单词练习室",
    copy: "面向初中、高中和大学阶段的英语单词学习作品，结合真实语境、语法用法、派生词、固定搭配和复习测验。",
  })}

  <section class="section vocab-hero-section" data-defer-section>
    <div class="vocab-shell reveal">
      <div class="vocab-study-card">
        <div class="vocab-card-top">
          <p class="project-type">${escapeHtml(levelLabel(featuredWord.level))} / ${escapeHtml(featuredWord.part)}</p>
          <span>${escapeHtml(featuredWord.phonetic)}</span>
        </div>
        <h2 data-vocab-word>${escapeHtml(featuredWord.word)}</h2>
        <p class="vocab-meaning" data-vocab-meaning>${escapeHtml(featuredWord.meaning)}</p>
        <div class="vocab-tabs" aria-label="单词详情">
          <button class="filter-button is-active" type="button" data-vocab-tab="grammar">语法</button>
          <button class="filter-button" type="button" data-vocab-tab="derivatives">派生</button>
          <button class="filter-button" type="button" data-vocab-tab="collocations">搭配</button>
        </div>
        <div class="vocab-detail" data-vocab-detail>${escapeHtml(featuredWord.grammar)}</div>
        <blockquote>
          <p data-vocab-sentence>${escapeHtml(featuredWord.sentence)}</p>
          <cite data-vocab-translation>${escapeHtml(featuredWord.translation)}</cite>
        </blockquote>
      </div>

      <aside class="vocab-plan">
        <p class="eyebrow">词书计划</p>
        <h2>按阶段学习</h2>
        <div class="vocab-levels">
          ${vocabularyLevels
            .map(
              (level, index) => `
                <button class="category-button ${index === 0 ? "is-active" : ""}" type="button" data-vocab-level="${escapeHtml(level.id)}">
                  <span>${escapeHtml(level.label)} · ${escapeHtml(level.target)}</span>
                  <strong>${escapeHtml(level.count)}</strong>
                </button>
              `
            )
            .join("")}
        </div>
        <div class="vocab-progress">
          <span>今日进度</span>
          <strong data-vocab-progress>1 / ${escapeHtml(vocabularyWords.filter((word) => word.level === featuredWord.level).length)}</strong>
        </div>
      </aside>
    </div>
  </section>

  <section class="section compact-section" data-defer-section>
    <div class="section-heading reveal section-heading-row">
      <div>
        <p class="eyebrow">Vocabulary</p>
        <h2>词库浏览</h2>
      </div>
      <label class="search-field vocab-search">
        <span>搜索单词</span>
        <input type="search" placeholder="搜索单词、释义、派生或搭配" data-vocab-search />
      </label>
    </div>
    <div class="vocab-word-grid" data-vocab-list>
      ${vocabularyWords.map(renderVocabularyCard).join("")}
    </div>
  </section>

  <section class="section compact-section" data-defer-section>
    <div class="vocab-quiz reveal">
      <div>
        <p class="eyebrow">Review</p>
        <h2>快速复习</h2>
        <p>根据中文释义输入英文单词，检查拼写是否准确。</p>
      </div>
      <div class="vocab-quiz-box">
        <span data-vocab-quiz-meaning>${escapeHtml(featuredWord.meaning)}</span>
        <input type="text" placeholder="输入英文单词" data-vocab-answer />
        <button class="resource-action primary" type="button" data-vocab-check>检查</button>
        <strong data-vocab-feedback>准备开始</strong>
      </div>
    </div>
  </section>
`;

export const renderVocabularyCard = (item) => `
  <button class="vocab-word-card reveal" type="button" data-vocab-card data-word="${escapeHtml(item.word)}">
    <span>${escapeHtml(levelLabel(item.level))}</span>
    <strong>${escapeHtml(item.word)}</strong>
    <em>${escapeHtml(item.meaning)}</em>
    <small>${escapeHtml(item.derivatives.slice(0, 2).join(" / "))}</small>
  </button>
`;
