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
