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
  description: "小鱼的个人网站 —— 后端开发工程师，用 AI 辅助编程做项目和工具。",
  email: "2696827479@qq.com",                     // ✏️ 改这里 → QQ 邮箱
  email163: "xiaoyu24601@163.com",                // ✏️ 改这里 → 网易邮箱
  github: "https://github.com/xiaoyu24601",       // ✏️ 改这里 → 你的 GitHub 主页
  githubLabel: "@xiaoyu24601",                    // ✏️ 改这里 → GitHub 显示名
  bilibili: "",                                    // ✏️ 改这里 → 你的 B 站主页（暂无）
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
  eyebrow: "Backend Developer / AI-powered",      // ✏️ 改这里 → 顶部小标签
  title: "用 AI 加速后端开发，一个人就是一个团队。",   // ✏️ 改这里 → 首页大标题
  subtitle: "后端开发 · AI 辅助编程 · 工具产品 · 学习资源", // ✏️ 改这里 → 副标题
  copy: "我是小鱼，后端开发工程师。日常工作涉及服务端架构、API 设计和数据处理。通过 Claude Code + VS Code，我在用 AI 提升开发效率，同时探索一人做产品和工具的可能性。", // ✏️ 改这里 → 自我介绍段落
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
    title: "轻量待办",                                     // ✏️ 改这里 → 精选项目名
    summary: "极简待办事项工具，支持本地存储和深浅色模式，纯手写 HTML/CSS/JS。",
    href: "projects/todo/index.html",
  },
  {
    label: "Resource Plan",
    title: "AI 工具清单",                                   // ✏️ 改这里
    summary: "Claude Code、Cursor、OPB-Skills 等 Vibe Coding 工具链 + Python 学习资源整理。",
    href: "resources.html",
  },
  {
    label: "Writing",
    title: "个人网站从单页走向多页",                          // ✏️ 改这里
    summary: "记录信息架构、页面拆分、配置化渲染和静态部署的取舍。",
    href: "blog.html",
  },
];


// ============================================================
// 👤 关于页 —— 个人介绍核心区域
// ============================================================
export const about = {
  eyebrow: "About",
  heroTitle: "关于小鱼",                              // ✏️ 改这里 → 关于页大标题
  heroCopy: "后端开发工程师，用 AI 辅助编程做项目和工具，探索一人开发模式。",
  title: "关于我",
  intro: "我是小鱼，后端开发。日常工作涉及服务端开发、API 设计、数据库和系统架构。目前在用 Claude Code + VS Code 提升开发效率，同时把一些想法做成可用的工具和产品。这个网站就是我学习和探索的记录。",
  tags: ["后端开发", "API 设计", "数据库", "AI 辅助编程", "Vibe Coding", "工具产品"],
};


// ============================================================
// 🎯 关于页 —— 三个关注方向
// ============================================================
export const focusItems = [
  {
    index: "01",
    title: "后端开发 + AI 提效",
    copy: "日常后端开发中深度使用 Claude Code 辅助写代码、排查问题、设计架构，持续积累 AI 编程最佳实践。",
  },
  {
    index: "02",
    title: "前端补齐 + 独立做网站",
    copy: "HTML / CSS / JavaScript 边做边学，目标是能独立开发完整的前后端项目，不依赖前端同事。",
  },
  {
    index: "03",
    title: "一人开发 · 工具产品",
    copy: "把工作中遇到的痛点变成小工具，从后端延伸到全栈，探索一人做 SaaS 和工具产品的可能性。",
  },
];


// ============================================================
// 🖼️ 作品集 —— 你的项目展示
// ============================================================
export const projects = [
  {
    title: "轻量待办",
    type: "Web App / Todo",
    category: "web",
    categoryLabel: "网页应用",
    image: "assets/project-todo.svg",
    imageAlt: "轻量待办项目封面",
    summary: "极简待办事项工具，支持添加、完成、删除、筛选，数据保存在浏览器本地，支持深浅色模式。",
    detail: "用纯 HTML/CSS/JS 手写的轻量待办事项应用。支持添加任务、勾选完成、删除、按状态筛选，数据通过 localStorage 持久化存储，刷新不丢失。适配移动端，支持系统主题自动切换。",
    tools: "HTML, CSS, JavaScript",
    status: "已完成",
    href: "projects/todo/index.html",
  },
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
];


// ============================================================
// 🛠️ 技能列表 —— 展示你会什么
// ============================================================
export const skills = [
  { icon: "Py", text: "Python" },
  { icon: "Dj", text: "Django / Flask" },
  { icon: "Fa", text: "FastAPI" },
  { icon: "SQL", text: "MySQL" },
  { icon: "API", text: "API 设计" },
  { icon: "DK", text: "Docker" },
  { icon: "Lin", text: "Linux" },
  { icon: "Git", text: "Git / GitHub" },
  { icon: "AI", text: "Claude Code / AI 编程" },
  { icon: "VS", text: "VS Code" },
];


// ============================================================
// 🗺️ 路线图 —— 你在做什么、计划做什么
// ============================================================
export const timeline = [
  { time: "日常", text: "🔧 后端开发工作中深度使用 Claude Code 提效" },
  { time: "进行中", text: "🌐 补齐前端：HTML/CSS/JS + 个人网站迭代" },
  { time: "下一步", text: "🛠️ 用 AI 做 3-5 个可展示的小工具/API 服务" },
  { time: "目标", text: "🚀 独立开发全栈项目，探索一人 SaaS 产品" },
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
    status: "已发布",
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
];
