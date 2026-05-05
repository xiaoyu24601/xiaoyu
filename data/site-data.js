export const siteMeta = {
  name: "小鱼",
  title: "小鱼 | 夏日作品集",
  description: "一个清爽、透明感、带有唯美像素夏日氛围的个人作品网站。",
  email: "2696827479@qq.com",
  github: "https://github.com/xiaoyu24601",
  githubLabel: "@xiaoyu24601",
  bilibili: "https://space.bilibili.com/",
};

export const navigation = [
  { label: "Home", text: "首页", href: "index.html", page: "home" },
  { label: "About", text: "关于", href: "about.html", page: "about" },
  { label: "Projects", text: "作品", href: "projects.html", page: "projects" },
  { label: "Resources", text: "资源", href: "resources.html", page: "resources" },
  { label: "Downloads", text: "下载", href: "downloads.html", page: "downloads" },
  { label: "Blog", text: "博客", href: "blog.html", page: "blog" },
  { label: "Contact", text: "联系", href: "contact.html", page: "contact" },
];

export const home = {
  eyebrow: "Summer Light / Personal Space",
  title: "把灵感写成清澈、温柔、可以被打开的作品。",
  subtitle: "个人展示、AI 资源、工具下载和博客内容的轻量入口。",
  copy: "我喜欢简洁的界面、轻盈的交互和有秩序的内容表达。这里会逐步沉淀我的项目、资源整理、可下载工具和长期写作。",
  image: "assets/summer-pixel-scene.svg",
  imageAlt: "透明感夏日天空、海面与小站台的像素风插画",
  noteLabel: "Current mood",
  noteText: "clear sky, soft code",
  actions: [
    { text: "查看作品", href: "projects.html", variant: "primary" },
    { text: "浏览资源", href: "resources.html", variant: "ghost" },
  ],
};

export const quickEntries = [
  {
    label: "Projects",
    title: "项目作品",
    summary: "整理网页应用、仪表盘和视觉模板等作品记录。",
    href: "projects.html",
  },
  {
    label: "Resources",
    title: "AI 资源",
    summary: "沉淀 AI 工具、提示词、学习资料和灵感收藏。",
    href: "resources.html",
  },
  {
    label: "Downloads",
    title: "下载中心",
    summary: "预留模板、脚本、小工具和版本说明的下载入口。",
    href: "downloads.html",
  },
  {
    label: "Blog",
    title: "博客记录",
    summary: "记录架构调整、学习复盘和长期内容沉淀。",
    href: "blog.html",
  },
];

export const recentUpdates = [
  {
    date: "2026-05-05",
    title: "完成多页面架构拆分",
    summary: "从单页锚点站点重构为 Home / About / Projects / Resources / Downloads / Blog / Contact。",
    href: "blog.html",
  },
  {
    date: "2026-05-05",
    title: "抽离数据配置与共享 Layout",
    summary: "导航、项目、资源、博客和联系信息统一由配置驱动，页面使用共享渲染层。",
    href: "about.html",
  },
  {
    date: "2026-05-05",
    title: "保留原有视觉并优化扩展能力",
    summary: "继续沿用清爽、透明、夏日像素风格，同时为资源库和下载中心预留结构。",
    href: "resources.html",
  },
];

export const featuredContent = [
  {
    label: "Selected Project",
    title: "Breeze Notes",
    summary: "轻量笔记工具概念，适合继续扩展为真实的笔记原型。",
    href: "projects.html",
  },
  {
    label: "Resource Plan",
    title: "AI 工具清单",
    summary: "预留给常用 AI 工具、提示词、工作流和使用笔记。",
    href: "resources.html",
  },
  {
    label: "Writing",
    title: "个人网站从单页走向多页",
    summary: "记录信息架构、页面拆分、配置化渲染和静态部署的取舍。",
    href: "blog.html",
  },
];

export const about = {
  eyebrow: "About",
  title: "关于我",
  intro:
    "我正在搭建自己的个人网站，也在持续学习前端、设计和产品表达。比起堆满效果，我更在意页面是否清楚、舒服、能让人快速理解我是谁、做过什么、想做什么。",
  tags: ["前端开发", "界面设计", "像素风", "夏日电影感", "治愈系视觉"],
};

export const focusItems = [
  {
    index: "01",
    title: "把想法做成可访问的网页",
    copy: "从静态页面开始，慢慢补齐部署、域名、内容维护和作品记录。",
  },
  {
    index: "02",
    title: "练习更克制的视觉表达",
    copy: "用色彩、留白、层级和小动效制造记忆点，而不是让装饰抢走内容。",
  },
  {
    index: "03",
    title: "整理项目与学习轨迹",
    copy: "把完成过的练习、代码片段和设计探索沉淀成可展示的作品。",
  },
];

export const projects = [
  {
    title: "Breeze Notes",
    type: "Web App / Notes",
    category: "web",
    categoryLabel: "网页应用",
    image: "assets/project-breeze.svg",
    imageAlt: "Breeze Notes 项目封面",
    summary: "轻量笔记工具概念，强调快速记录、自然分类和安静的阅读体验。",
    detail:
      "轻量笔记工具概念，强调快速记录、自然分类和安静的阅读体验。它适合继续扩展为真实的笔记原型，例如加入标签、搜索、归档和导出功能。",
    tools: "HTML, CSS, JavaScript",
    status: "概念设计",
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
  },
];

export const skills = [
  { icon: "H", text: "HTML / CSS" },
  { icon: "JS", text: "JavaScript" },
  { icon: "Py", text: "Python" },
  { icon: "UI", text: "UI Design" },
  { icon: "Git", text: "Git / GitHub" },
  { icon: "AI", text: "AI Tools" },
];

export const timeline = [
  { time: "Step 1", text: "完善个人介绍、作品截图和真实链接。" },
  { time: "Step 2", text: "上传到 GitHub Pages，让别人能通过链接访问。" },
  { time: "Step 3", text: "后续补充博客、学习记录或项目复盘。" },
];

export const resourceCategories = [
  { id: "all", label: "全部" },
  { id: "ai-tools", label: "AI工具" },
  { id: "prompts", label: "提示词" },
  { id: "model-platforms", label: "模型平台" },
  { id: "learning", label: "学习资料" },
  { id: "links", label: "常用链接" },
  { id: "favorites", label: "我的收藏" },
];

export const resources = [
  {
    title: "ChatGPT",
    description: "日常问答、写作、代码辅助和资料整理的通用 AI 助手。",
    category: "ai-tools",
    url: "https://chatgpt.com/",
    backupUrl: "https://openai.com/chatgpt/",
    note: "适合作为默认入口，复杂任务建议拆成明确步骤。",
    tags: ["AI工具", "写作", "代码", "常用"],
    isFavorite: true,
    isImportant: true,
  },
  {
    title: "Claude",
    description: "适合长文本阅读、结构化写作、代码解释和文档分析。",
    category: "ai-tools",
    url: "https://claude.ai/",
    backupUrl: "https://www.anthropic.com/claude",
    note: "长文档处理体验稳定，可作为 ChatGPT 的互补工具。",
    tags: ["AI工具", "长文本", "写作"],
    isFavorite: true,
    isImportant: false,
  },
  {
    title: "提示词模板库",
    description: "收集可复用的提示词结构，用于学习、写作、开发和资料整理。",
    category: "prompts",
    url: "https://www.promptingguide.ai/",
    backupUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide",
    note: "后续可以把自己的常用提示词拆成独立 JSON 数据。",
    tags: ["提示词", "Prompt", "学习"],
    isFavorite: false,
    isImportant: true,
  },
  {
    title: "OpenAI Platform",
    description: "OpenAI API、模型文档、控制台和开发者资源入口。",
    category: "model-platforms",
    url: "https://platform.openai.com/",
    backupUrl: "https://platform.openai.com/docs",
    note: "查询模型、API、计费和示例时优先看官方文档。",
    tags: ["模型平台", "API", "文档"],
    isFavorite: true,
    isImportant: true,
  },
  {
    title: "Hugging Face",
    description: "模型、数据集、Spaces 和开源 AI 应用生态平台。",
    category: "model-platforms",
    url: "https://huggingface.co/",
    backupUrl: "https://huggingface.co/models",
    note: "适合查找开源模型、演示空间和模型卡说明。",
    tags: ["模型平台", "开源", "数据集"],
    isFavorite: false,
    isImportant: false,
  },
  {
    title: "MDN Web Docs",
    description: "前端标准、浏览器 API、HTML/CSS/JavaScript 的权威学习资料。",
    category: "learning",
    url: "https://developer.mozilla.org/",
    backupUrl: "https://developer.mozilla.org/zh-CN/",
    note: "遇到 Web API 和 CSS 细节时优先查这里。",
    tags: ["学习资料", "前端", "文档"],
    isFavorite: true,
    isImportant: false,
  },
  {
    title: "GitHub",
    description: "代码托管、项目管理、开源检索和个人作品发布入口。",
    category: "links",
    url: "https://github.com/",
    backupUrl: "https://docs.github.com/",
    note: "个人站部署和资源版本管理可以继续依赖 GitHub Pages。",
    tags: ["常用链接", "部署", "开源"],
    isFavorite: true,
    isImportant: false,
  },
  {
    title: "个人 AI 收藏夹",
    description: "预留给自己长期沉淀的高频工具、文章、提示词和模型观察。",
    category: "favorites",
    url: "resources.html",
    backupUrl: "resources.html",
    note: "这是内部占位条目，后续可替换为自己的真实收藏数据库。",
    tags: ["我的收藏", "长期维护", "个人"],
    isFavorite: true,
    isImportant: true,
  },
];

export const posts = [
  {
    title: "个人网站从单页走向多页",
    date: "2026-05-05",
    category: "Architecture",
    summary: "记录信息架构、页面拆分、配置化渲染和静态部署的取舍。",
    status: "草稿",
  },
  {
    title: "如何整理自己的 AI 资源库",
    date: "待补充",
    category: "AI",
    summary: "预留给工具分类、场景笔记和长期维护方法。",
    status: "规划中",
  },
];

export const contactLinks = [
  { label: "QQ 邮箱", value: siteMeta.email, href: `mailto:${siteMeta.email}` },
  { label: "GitHub", value: siteMeta.githubLabel, href: siteMeta.github },
  { label: "Bilibili", value: "可替换为你的主页", href: siteMeta.bilibili },
];
