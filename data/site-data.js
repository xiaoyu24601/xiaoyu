// ============================================================
// 📝 个人网站数据文件 —— 改文案就改这一个文件
// ============================================================
// 每个区块顶部有 "✏️ 改这里" 标记，找到对应位置直接改字符串即可
// 改完保存 → 刷新浏览器 → 立即生效


// ============================================================
// 🔧 基础信息 —— 改名字、邮箱、社交链接
// ============================================================
export const siteMeta = {
  name: "小鱼",                                    // ✏️ 改这里 → 你的名字/昵称
  title: "小鱼 | 个人网站",                         // ✏️ 改这里 → 浏览器标签页标题
  description: "一个清爽、透明感、带有唯美像素夏日氛围的个人作品网站。",
  email: "2696827479@qq.com",                     // ✏️ 改这里 → QQ 邮箱
  email163: "xiaoyu24601@163.com",                // ✏️ 改这里 → 网易邮箱
  github: "https://github.com/xiaoyu24601",       // ✏️ 改这里 → 你的 GitHub 主页
  githubLabel: "@xiaoyu24601",                    // ✏️ 改这里 → GitHub 显示名
  bilibili: "https://space.bilibili.com/",        // ✏️ 改这里 → 你的 B 站主页（目前是占位）
};


// ============================================================
// 🧭 导航菜单
// ============================================================
export const navigation = [
  { label: "Home", text: "首页", href: "index.html", page: "home" },
  { label: "About", text: "关于", href: "about.html", page: "about" },
  { label: "Projects", text: "作品", href: "projects.html", page: "projects" },
  { label: "Resources", text: "资源", href: "resources.html", page: "resources" },
  { label: "AI News", text: "AI 资讯", href: "ai-news.html", page: "ai-news" },
  { label: "Downloads", text: "下载", href: "downloads.html", page: "downloads" },
  { label: "Blog", text: "博客", href: "blog.html", page: "blog" },
  { label: "Contact", text: "联系", href: "contact.html", page: "contact" },
];


// ============================================================
// 🏠 首页 —— 最重要的位置，别人打开网站第一眼看到的
// ============================================================
export const home = {
  eyebrow: "Learning in Public / Personal Space", // ✏️ 改这里 → 顶部小标签
  title: "从零开始，用 AI 做自己的东西。",            // ✏️ 改这里 → 首页大标题
  subtitle: "Python 初学者 · AI 辅助编程 · 个人项目积累 · 学习资源整理", // ✏️ 改这里 → 副标题
  copy: "我是小鱼，一个正在自学编程的初学者。这里记录我的学习路线、练习项目、AI 工具使用心得和资源收藏。用 Claude Code + VS Code 边学边做，目标是成为一个能用代码解决实际问题的人。", // ✏️ 改这里 → 自我介绍段落
  image: "assets/summer-pixel-scene.svg",
  imageAlt: "透明感夏日天空、海面与小站台的像素风插画",
  noteLabel: "Current mood",                       // ✏️ 改这里 → 心情标签
  noteText: "clear sky, soft code",                // ✏️ 改这里 → 心情文字
  actions: [
    { text: "查看作品", href: "projects.html", variant: "primary" },
    { text: "浏览资源", href: "resources.html", variant: "ghost" },
  ],
};


// ============================================================
// 🃏 首页快速入口卡片
// ============================================================
export const quickEntries = [
  {
    label: "Projects",
    title: "项目作品",
    summary: "整理网页应用、仪表盘和视觉模板等作品记录。",  // ✏️ 改这里
    href: "projects.html",
  },
  {
    label: "Resources",
    title: "AI 资源",
    summary: "沉淀 AI 工具、提示词、学习资料和灵感收藏。",  // ✏️ 改这里
    href: "resources.html",
  },
  {
    label: "AI Radar",
    title: "AI 资讯",
    summary: "自动整合近期 AI 新闻、模型发布、研究进展和开源动态。",
    href: "ai-news.html",
  },
  {
    label: "Downloads",
    title: "下载中心",
    summary: "预留模板、脚本、小工具和版本说明的下载入口。",  // ✏️ 改这里
    href: "downloads.html",
  },
  {
    label: "Blog",
    title: "博客记录",
    summary: "记录架构调整、学习复盘和长期内容沉淀。",        // ✏️ 改这里
    href: "blog.html",
  },
];


// ============================================================
// ⭐ 首页精选内容
// ============================================================
export const featuredContent = [
  {
    label: "Selected Project",
    title: "Breeze Notes",                                    // ✏️ 改这里 → 精选项目名
    summary: "轻量笔记工具概念，适合继续扩展为真实的笔记原型。",  // ✏️ 改这里
    href: "projects.html",
  },
  {
    label: "Resource Plan",
    title: "AI 工具清单",                                     // ✏️ 改这里
    summary: "预留给常用 AI 工具、提示词、工作流和使用笔记。",    // ✏️ 改这里
    href: "resources.html",
  },
  {
    label: "Writing",
    title: "个人网站从单页走向多页",                            // ✏️ 改这里
    summary: "记录信息架构、页面拆分、配置化渲染和静态部署的取舍。", // ✏️ 改这里
    href: "blog.html",
  },
];


// ============================================================
// 👤 关于页 —— 个人介绍核心区域
// ============================================================
export const about = {
  eyebrow: "About",
  heroTitle: "关于小鱼",                              // ✏️ 改这里 → 关于页大标题
  heroCopy: "从零开始学编程，用 AI 辅助（Claude Code）做自己的项目。这里记录我的学习过程、作品积累和资源整理。", // ✏️ 改这里 → 关于页顶部简介
  title: "关于我",                                    // ✏️ 改这里 → 第二个区域标题
  intro: "我是小鱼，一个正在自学 Python 和前端开发的初学者。我相信 AI 时代一个人也能做出好东西——通过 Claude Code + VS Code，我在用 vibe coding 的方式搭建这个网站、练习写代码、积累小工具。比起炫技，我更在意每一行代码我是否理解、每个项目是否真的能用。", // ✏️ 改这里 → 自我介绍（最重要）
  tags: ["Python 初学", "前端入门", "AI 辅助编程", "Vibe Coding", "一人公司探索"], // ✏️ 改这里 → 兴趣标签
};


// ============================================================
// 🎯 关于页 —— 三个关注方向
// ============================================================
export const focusItems = [
  {
    index: "01",
    title: "Python 从入门到能做项目",                 // ✏️ 改这里
    copy: "跟着《Python 编程：从入门到实践》+ GitHub Python-100-Days 系统学习，用 Claude Code 辅助练习，目标是能独立写小工具。",
  },
  {
    index: "02",
    title: "前端三件套 + AI 效率",                    // ✏️ 改这里
    copy: "HTML / CSS / JavaScript 打基础，配合 Claude Code 搭个人网站、做浏览器小工具，边做边学。",
  },
  {
    index: "03",
    title: "积累作品，探索一人公司",                    // ✏️ 改这里
    copy: "把学习过程中的练习变成可展示的项目，逐步探索用 AI 做小产品、接外包、做内容的可能性。",
  },
];


// ============================================================
// 🖼️ 作品集 —— 你的项目展示
// ============================================================
export const projects = [
  {
    title: "Word Studio",                            // ✏️ 改这里 → 项目名
    type: "Web App / Vocabulary",
    category: "web",
    categoryLabel: "网页应用",
    image: "assets/project-word-studio.svg",
    imageAlt: "单词练习室项目封面",
    summary: "初高中到大学阶段的英语单词练习网站，包含语法、派生、搭配、例句和拼写复习。", // ✏️ 改这里
    detail: "单词练习室参考真实语境学习方式，按初中、高中、大学阶段组织词库，展示词义、语法、派生词、固定搭配、词根提示和例句，并提供轻量拼写复习。", // ✏️ 改这里
    tools: "HTML, CSS, JavaScript",
    status: "可交互原型",
    href: "vocabulary.html",                         // ✏️ 改这里 → 项目链接
  },
  {
    title: "Breeze Notes",
    type: "Web App / Notes",
    category: "web",
    categoryLabel: "网页应用",
    image: "assets/project-breeze.svg",
    imageAlt: "Breeze Notes 项目封面",
    summary: "轻量笔记工具概念，强调快速记录、自然分类和安静的阅读体验。",
    detail: "轻量笔记工具概念，强调快速记录、自然分类和安静的阅读体验。它适合继续扩展为真实的笔记原型，例如加入标签、搜索、归档和导出功能。",
    tools: "HTML, CSS, JavaScript",
    status: "概念设计",
    href: "",                                        // ✏️ 改这里 → 填上项目链接
  },
  {
    title: "Lumen Desk",
    type: "Dashboard / Habit",
    category: "dashboard",
    categoryLabel: "仪表盘",
    image: "assets/project-lumen.svg",
    imageAlt: "Lumen Desk 项目封面",
    summary: "个人工作流仪表盘，整合待办、习惯和灵感收集，适合日常复盘。",
    detail: "个人工作流仪表盘，整合待办、习惯和灵感收集，适合日常复盘。后续可以补充数据统计、日历视图和本地存储。",
    tools: "HTML, CSS, JavaScript",
    status: "交互草案",
    href: "",
  },
  {
    title: "Mint Gallery",
    type: "Gallery / Template",
    category: "gallery",
    categoryLabel: "视觉模板",
    image: "assets/project-mint.svg",
    imageAlt: "Mint Gallery 项目封面",
    summary: "极简图片展厅模板，用柔和视觉突出内容本身，适合摄影或插画展示。",
    detail: "极简图片展厅模板，用柔和视觉突出内容本身，适合摄影或插画展示。可以继续加入分类、灯箱预览和响应式瀑布流。",
    tools: "HTML, CSS, SVG",
    status: "视觉模板",
    href: "",
  },
];


// ============================================================
// 🛠️ 技能列表 —— 展示你会什么
// ============================================================
export const skills = [
  { icon: "Py", text: "Python（学习中）" },           // ✏️ 改这里 → 增删技能
  { icon: "H", text: "HTML / CSS" },
  { icon: "JS", text: "JavaScript（入门）" },
  { icon: "Git", text: "Git / GitHub" },
  { icon: "VS", text: "VS Code" },
  { icon: "AI", text: "Claude Code / AI 辅助" },
];


// ============================================================
// 🗺️ 路线图 —— 你在做什么、计划做什么
// ============================================================
export const timeline = [
  { time: "现在", text: "📖 Python 基础语法 + 《Python 编程：从入门到实践》" },
  { time: "1-2 月", text: "🐍 Python-100-Days 练习 + 用 Claude Code 做 2-3 个小工具" },
  { time: "3-4 月", text: "🌐 HTML/CSS/JS 系统学习 + 完善个人网站 + 第一个上线项目" },
  { time: "5-6 月", text: "🚀 尝试接小外包 / 做浏览器插件 / 写技术博客分享" },
];


// ============================================================
// 📝 博客文章
// ============================================================
export const posts = [
  {
    title: "个人网站从单页走向多页",                   // ✏️ 改这里 → 文章标题
    date: "2026-05-05",
    category: "Architecture",
    summary: "记录信息架构、页面拆分、配置化渲染和静态部署的取舍。", // ✏️ 改这里
    status: "草稿",
  },
  {
    title: "如何整理自己的 AI 资源库",                 // ✏️ 改这里
    date: "待补充",
    category: "AI",
    summary: "预留给工具分类、场景笔记和长期维护方法。",
    status: "规划中",
  },
];


// ============================================================
// 📬 联系页
// ============================================================
export const contactPage = {
  eyebrow: "Contact",                                // ✏️ 改这里
  title: "从这里找到我",                              // ✏️ 改这里 → 联系页大标题
  copy: "如果你也有新的想法，可以从这里找到我。",        // ✏️ 改这里 → 联系页简介
};


// ============================================================
// 📬 联系页 —— 联系方式列表
// ============================================================
export const contactLinks = [
  { label: "QQ 邮箱", value: siteMeta.email, href: `mailto:${siteMeta.email}` },
  { label: "网易邮箱", value: siteMeta.email163, href: `mailto:${siteMeta.email163}` },
  { label: "GitHub", value: siteMeta.githubLabel, href: siteMeta.github },
  { label: "Bilibili", value: "可替换为你的主页", href: siteMeta.bilibili }, // ✏️ 改了上面的 bilibili 链接这里自动更新
];
