# 部署到 GitHub Pages

1. 登录 GitHub，新建一个公开仓库，例如 `ao-portfolio`。
2. 在本地项目目录运行：

```powershell
git init
git add .
git commit -m "Initial portfolio site"
git branch -M main
git remote add origin https://github.com/你的用户名/ao-portfolio.git
git push -u origin main
```

3. 打开仓库的 `Settings -> Pages`。
4. `Build and deployment` 选择 `Deploy from a branch`。
5. Branch 选择 `main`，目录选择 `/root`，保存。
6. 等待 GitHub Pages 构建完成，访问：

```text
https://你的用户名.github.io/ao-portfolio/
```

如果仓库名改成 `你的用户名.github.io`，访问地址会变成：

```text
https://你的用户名.github.io/
```

## AI 资讯自动更新

网站新增了 AI 资讯页 `ai-news.html`，数据来自 `data/ai-news-data.js`。

本地手动刷新：

```powershell
node scripts/fetch-ai-news.mjs
```

推送到 GitHub 后，`.github/workflows/update-ai-news.yml` 会每天自动运行一次，拉取 RSS 资讯并提交更新后的数据文件。也可以在 GitHub Actions 页面手动运行 `Update AI News`。
