# Personal Research & Technology Site

明亮极简的研究与技术个人主页。Astro + TypeScript + 原生 CSS，中英同页混排。

## 本地开发

需要 Node.js 24 LTS 与 npm。

```sh
npm ci
npm run dev
```

开发服务器显示明确标记的演示文章、项目和草稿。它们不是个人经历或成果。

```sh
npm run check
npm run build
npm test
npm run preview
```

生产构建仅包含 `draft: false` 且 `demo: false` 的内容。没有真实内容时展示空状态，预览演示不会公开为项目详情。

## 内容目录与填充模板

完整说明见 [CONTENT_GUIDE.md](CONTENT_GUIDE.md)。复制 `templates/` 下的 Markdown 模板，即可新增研究、项目或文章。全站目录、页内目录和相邻内容导航会自动更新；关于页编辑 `src/content/pages/about.md`。

## 填写个人资料

编辑 `src/data/profile.ts`：姓名、首屏中英文短句、简介、邮箱、GitHub 与简历路径。空字段不生成联系方式按钮。请仅填写希望公开的信息。

## 发布文章与项目

在 `src/content/articles/` 或 `src/content/projects/` 添加 Markdown 文件，文件名就是 URL slug。可复制演示模板并改名；填写真实内容后同时设置 `draft: false` 和 `demo: false`。

文章需要 `title`、`description`、`date`，可设置 `tags`。
项目需要 `title`、`description`，可设置 `cover`、`coverAlt`、`tags`、`order`、`code`、`paper`。项目链接仅填写真实可访问地址。

图片放入 `public/images/`，建议项目封面 1600×1000，压缩为 WebP/AVIF 并保持文件体积适中。标题从二级标题开始，自动生成目录。头像可选；第一版不依赖头像。

## GitHub Pages

目标公开仓库：`1230605/1230605.github.io`。在 Settings → Pages → Build and deployment 中选择 **GitHub Actions**，将代码推送到 `main` 后工作流自动检查、构建、验证并发布。

部署地址：https://1230605.github.io/

如更换域名，修改 `astro.config.mjs` 的 `site` 和 `public/robots.txt`；使用项目子路径时还需设置 `base` 并统一调整根路径链接。

## 设计与无障碍

系统字体、响应式布局、键盘焦点、跳转正文、语义化导航、移动菜单 Escape 关闭与 reduced-motion 支持。首页的中性几何视觉由 CSS/SVG 绘制，没有使用苹果产品素材。

`npm test` 检查生产包不含演示详情、站点地图排除演示内容，以及所有静态内链与素材是否存在。
