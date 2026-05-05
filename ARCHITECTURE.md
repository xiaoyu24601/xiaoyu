# 站点架构说明

当前项目保持为纯静态技术栈：HTML + CSS + JavaScript ES Modules。无需构建步骤，适合直接部署到 GitHub Pages。

## 目录结构

```text
.
├── index.html
├── about.html
├── projects.html
├── resources.html
├── downloads.html
├── blog.html
├── contact.html
├── styles.css
├── script.js
├── data/
│   └── site-data.js
├── scripts/
│   └── components.js
└── assets/
```

## 路由设计

- `index.html`: Home
- `about.html`: About
- `projects.html`: Projects
- `resources.html`: Resources
- `downloads.html`: Downloads
- `blog.html`: Blog
- `contact.html`: Contact

所有页面都使用根目录 HTML 文件，避免额外路由配置，兼容 GitHub Pages 的静态部署模式。

## Layout 设计

`scripts/components.js` 中的 `renderLayout(page)` 统一输出：

- 背景装饰
- 顶部导航
- 主题切换按钮
- 页面挂载容器
- 项目弹窗
- 返回顶部按钮
- 页脚

各页面 HTML 只保留元信息和 `data-page`，具体内容由共享入口 `script.js` 按页面类型注入。

## 组件与数据

- `data/site-data.js`: 导航、首页、关于、项目、资源、下载、博客、联系信息。
- `scripts/components.js`: 页面 Hero、卡片列表、项目列表、联系面板等渲染函数。
- `script.js`: 负责状态隔离后的交互初始化，包括导航菜单、主题、滚动进度、项目筛选、弹窗和邮箱复制。

新增内容优先写入 `data/site-data.js`，页面渲染逻辑尽量复用现有组件函数。
