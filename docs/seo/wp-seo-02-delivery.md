# WP-SEO-02｜英文 Buying Guides 与住宅泳池滑梯指南开发交付

**日期：**2026-11-17（Asia/Shanghai）
**状态：**本地可验收、未获内容发布批准、未部署。
**Git：**`codex/wp-03-product-catalog`，HEAD `1ed582e065b38b9838cf8bce29fb5e1448290650` 未改变。原工作区的 Work/Codex 未提交成果保留；没有 reset、clean、提交、推送、合并、修改 GitHub/Cloudflare 设置或部署。

## 1. 输入和内容完整性

- 唯一文章正文来源：`docs/seo/content/AQUASEE_Residential_Pool_Slide_Buying_Guide_Draft_V2.md`；已阅读其 V2 中文编辑说明、页面需求摘要、WP-SEO-01、项目战略/交接及权威产品边界文件。V1 未进入页面。
- `scripts/seo/sync-guide-v2.mjs` 从 V2 原文生成 `src/content/en/pool-slide-guide-v2.generated.ts`，保存完整正文、页面所需 frontmatter 字段和原文件 SHA-256 `44e760edb41a356c07157a7fe928bea5e66e118cde266e23c64e3b26e29278fa`。构建入口运行 `--check`，V2 与生成文件不一致时停止构建。没有改写或删减 V2 原稿。Hero H1 与原文标题一致，其后的两段摘要放在 Hero，剩余 H2/H3、比较表、正文中段询价链接、FAQ、五条来源及最后的 Editorial boundary 均从原文渲染。
- V2 frontmatter 的状态为 **“for final content review, not approved for publication”**。因此没有编造发布时间；文章中心卡片显示 `Publication pending · Editorial preview`，文章 JSON-LD 不含 `datePublished`。正式发布时间只从后续审批记录取得。
- 唯一封面采用现有 `public/images/concepts/pool-slides-v2.webp`（1672×941，227,238 bytes，SHA-256 `79a4bf47c490e547aeeb1caff636f8126ee2ff1e5fdeffc4d962203cf7b57700`）。来源见 `docs/strategy-v2-image-refresh.md`：2026-11-14 项目内 AI 生成图，原始 PNG ID `exec-b4d7b386-a28f-43c2-9a22-efe32d77e969.png`；关联正式 SKU：无；工程/安全验证：无。卡片与文章图均显示 AI 概念披露、场景 alt 和图注。正式发布前仍需品牌/权利责任人确认素材台账及适用范围。

## 2. 实际实现

| 文件 | 本包改动 |
| --- | --- |
| `src/app/[locale]/buying-guides/page.tsx` | 英文内容中心 `/buying-guides`；按主题分组、文章卡片含标题、V2 摘要、封面与真实发布时间（待批时显示待发布），只接入一篇真实 V2 草稿。 |
| `src/app/[locale]/buying-guides/[slug]/page.tsx` | `/buying-guides/choose-a-pool-slide` 详情模板；H1、两段摘要、正文、自动目录、概念图、比较表、FAQ、来源、面包屑、文章末尾类别/个人询价 CTA。无虚构相关文章。 |
| `src/components/seo/GuideMarkdown.tsx`、`src/lib/guide-markdown.ts` | GFM Markdown 表格与列表、标题锚点及自动目录；手机折叠目录置于正文之前，桌面右侧目录；外链/内链、焦点样式和可横向滚动的比较表。 |
| `src/content/seo/buying-guides.ts`、`src/content/en/pool-slide-guide-v2.generated.ts` | 可扩展文章集合、主题、封面与版本绑定的人工发布决定；当前 `approval: null`。 |
| `src/lib/metadata.ts`、`src/app/sitemap.ts`、`src/components/site/LanguageSwitcher.tsx` | 草稿英文路由仅有英文语言切换，不指向不存在的译版；获批后才启用索引、英文 hreflang 和 sitemap。 |
| `src/app/[locale]/layout.tsx`、`src/app/[locale]/collections/[slug]/page.tsx` | 仅在正式发布后显示 Guides 导航与 Pool Slides → 文章回链。当前文章正文已链接 Pool Slides 分类概念页和 Personal Inquiry。 |
| `next.config.ts`、`src/content/catalog-source-digests.ts`、`package.json`、`package-lock.json` | 构建时核对 V2 源文；更新既有目录源码覆盖清单；增加 `react-markdown@10.1.0`、`remark-gfm@4.0.1`。没有修改生产部署工作流或 Wrangler 配置。 |
| `scripts/seo/sync-guide-v2.mjs`、`check-guide-release.mjs`、`check-guide-preview.mjs` | 原文同步/门禁、隔离审批测试、本地 Worker 浏览器验收。 |
| `docs/previews/wp-seo-02/` | 1440px 与 390px 的文章及内容中心首屏截图，共 4 张；320px 做功能检查，未留截图。 |

页面还提供绝对 Open Graph/Twitter 图片 URL。详情页输出与页面可见内容一致的 `Article`、`BreadcrumbList`，不输出 `Product`、`Offer`、价格、评分、虚构资质或未确认认证。没有为其他语言生成文章。

## 3. 路由与发布门禁

| 路由 | 本地 OpenNext Worker | Robots / canonical / sitemap | 说明 |
| --- | --- | --- | --- |
| `/buying-guides` | 200 | `noindex, follow`；自指 canonical；不在 sitemap | 一篇 V2 待审核卡片；无伪造出版日。 |
| `/buying-guides/choose-a-pool-slide` | 200 | `noindex, follow`；自指 canonical；不在 sitemap | 精确 V2 SEO Title、Meta Description、Article 与 BreadcrumbList。 |
| `/collections/pool-slides` | 200 | 既有索引策略保持 | 草稿状态不显示到待发布文章的反向链接；获批后自动开启。 |
| `/inquiry/personal` | 200 | 既有索引策略保持 | 中段和文末 CTA 均有效。 |
| `/zh/buying-guides`、`/zh/buying-guides/choose-a-pool-slide` | 404 | 不在 hreflang/sitemap | 未创建虚假翻译。 |

发布门禁位于 `src/content/seo/buying-guides.ts`：需有与当前 V2 SHA-256 一致的文章 ID/摘要、批准人、批准时间、决定编号、实际发布时间，且发布时间不能早于批准时间。审批对象当前为 `null`。`scripts/seo/check-guide-release.mjs` 用**仅存在于进程内的测试记录**验证：草稿、错误版本摘要、提前发布日期和空批准人均不能发布，完整的测试审批记录才进入发布状态。测试没有写入真实审批文件。

**编辑说明中的边界与需求冲突：**V2 编辑说明要求发布前不把该路径加入站内链接，而本开发指令要求品类页与文章双向链接。本包把反向链接和主导航与发布审批同门禁；本地预览可通过文章/内容中心直接访问，正式发布批准后双向链接自动出现。当前待发布版本仍为单向链接，未擅自覆盖编辑决定。

## 4. 测试结果

| 检查 | 结果 |
| --- | --- |
| `node scripts/seo/sync-guide-v2.mjs --check` | 通过；源文与生成内容一致。 |
| `node scripts/seo/check-guide-release.mjs` | 通过；四种拒绝条件和有效测试批准状态符合预期。 |
| `npm run typecheck` | 通过；Next 16 类型生成和 TypeScript 无错误，WP-03 G1/G2 门禁通过。 |
| `npm run build` | 通过；两条英文 SSG 路由生成。 |
| `npm run geo:check` | 通过；65 页、4 语言、12 条 sitemap，故障 fixture 自检通过。早期曾发现草稿页语言切换器产生 6 条不存在的译版链接，修正后复测通过。 |
| `npm run build:opennext` | 通过；生成 `.open-next/worker.js`，未部署。 |
| 本地 `wrangler dev --local --port 8788` | 两条新路由 200；SEO Title/Description/robots/canonical/OG/JSON-LD 检查通过。Article 无虚假日期；5 条来源对应 6 个外链均保留；页面内链均 200。草稿与 `/products` 不在 sitemap。 |
| `node scripts/seo/check-guide-preview.mjs` | 通过；1440/390/320px 均无水平溢出或客户端错误，唯一 H1、图片加载、表格、FAQ、目录锚点及两处询价 CTA 均通过。已人工查看桌面与手机截图。 |
| `git diff --check` | 通过；仅出现原有两个 llms 路由文件的 LF→CRLF 提示，无空白错误。 |

测试为本地 OpenNext Worker；没有对正式网站执行本包部署验证，也没有提交真实询盘。外部来源的事实适用性由 V2 编辑说明列为发布前复核，本包只保证完整保留链接及证据边界。

## 5. 未完成事项与风险

1. **内容批准缺失。**Work V2 自身标记待最终事实/品牌/英文编辑审核；无真实批准人、决定编号与发布时间。当前不具备正式发布或申请收录条件。文章中的美国法规和 ASTM/NEN 范围仍需目标市场专业审校；不能把标准示例推断为 AQUASEE 产品认证。
2. **Next.js 安全提示。**首次及部分 OpenNext 内部 `next build` 在末尾被安全版本检查中断；同命令重试可完成。对 npm 官方 registry 的只读 audit 确认 `next@16.4.2` 受 [GHSA-mfr8-8qww-v76h](https://github.com/advisories/GHSA-mfr8-8qww-v76h) 影响，等级 moderate，修复版本 `16.4.6`。本轮范围不含框架升级，**正式部署前应安排独立安全升级与回归验收**。默认 npmmirror audit 接口返回 404，故核验使用 `--registry=https://registry.npmjs.org`。
3. **素材边界。**图像是既有 AI 概念图，不能证明模型已获供货、工程适配或使用安全；正式发布前仍需图片权利及视觉适用性复核。图中儿童使用场景更要维持显著披露。
4. **部署治理。**此工作区仍有之前 Work/Codex 的大量未提交内容；本包未整理、覆盖或提交。当前工作树的 `.github/workflows/deploy.yml` 仍包含 `main` push 自动部署历史配置；本包不修改工作流，也未触及远端。正式整合必须先按现行生产仓库/PR 审核流程核对来源，不可直接合并脏工作树或以本地构建代替生产验收。

**结论：**技术上达到本地待审核预览的验收条件；**内容与安全发布门槛尚未完成，因此不具备正式发布条件。**待 Work/Chat 最终批准 V2、记录真实发布日期、完成专业/图片复核并处理 Next 安全版本后，再按受控流程审查、合并与部署；本包没有自行上线。

## 6. 后续本地执行补记（2026-11-17）

用户确认原始 V2 Markdown 为最终正文基准，且要求新 AI 素材均使用 APIMart MJ。现有 V2 原文和历史交付结论保留；页面仍未获得正式发布日期或上线批准。后续执行的实际图片、提示词、任务 ID、文件摘要、页面插图、复测和剩余风险见 `docs/seo/content/WP-SEO-02-Apimart-MJ-visual-brief.md` 与 `HANDOFF-AQUASEE-2.0.md` §9.1。两张 MJ 辅助图已在本地页面展示；三张 MJ 头图候选未达到画面要求，因此没有替换原有概念封面。Article JSON-LD 删去未经证实的作者字段。所有草稿索引门禁继续生效；无提交、推送或部署。

## 7. Chat 验收修订补记（2026-11-17）

按 Chat 独立验收提出的三项问题，后续本地修订已完成：Next.js 升至 16.4.6，生产依赖审计为 0 漏洞；发布门禁现在绑定 V2 与三张实际页面图片的原图/WebP manifest 摘要，缺少权利或视觉复核记录不能通过；浏览器脚本逐项比对 V2 的 89 个文本块、20 个标题及 6 个来源 URL。构建后社交图片 URL 门禁检查 67 个 HTML 页、132 个标签均为正式域名，无 localhost 实际输出。Next 构建仍打印 `metadataBase` 回退警告，须与“实际 HTML 无 localhost”两个事实同时记录。完整文件、摘要、命令与风险见 `HANDOFF-AQUASEE-2.0.md` §9.2 和图片记录。草稿继续 `noindex`，未进入 sitemap，未获上线批准。

## 8. 用户要求重做图片后的本地视觉修订（2026-11-18）

用户指出三张图质量不足，封面还复用了主页图，并建议由 Chat 重写提示词。Codex 将三张旧图的具体问题交给 Chat；Chat 给出了两轮英文 APIMart MJ 提示词。原文、提示词、任务收据、视觉淘汰理由及新旧图片摘要见 `docs/seo/content/WP-SEO-02-Apimart-MJ-visual-brief.md`。本轮只使用 APIMart **Midjourney 8.2** 出新 AI 图，未调用 Nano Banana。新的独立别墅泳池封面、俯视选型图和金属外观细节图已接入本地草稿；选型图上的五个标记和文字说明为页面 HTML，清楚写明不代表尺寸、施工或实际服务路线。旧封面及两张 v1 图片保留但不再由文章引用。

`scripts/seo/guide-image-sources.json` 现指向三张 v2 图片的原始 PNG 与公开 WebP，重新生成的图片 manifest SHA-256 为 `09a297108709265921391001a9170519928dd3d4c9843ae529e92ee8c09aa1aa`，自动使旧图片审批摘要失效。三张图仍是显著标注的 AI 概念图；新封面的上行入口部分被景观遮挡，不能据此认定真实工程可行。图片权利、相似性与正式视觉选择继续待人工审核，发布决定仍为 `approval: null`。

本地 `typecheck`、V2/图片摘要同步、发布/产品门禁、`geo:check`（65 页、4 语言、12 sitemap）、228 文件覆盖、`build`（67 页/132 个社交图片标签）、`build:opennext` 均通过。Wrangler 本地 Worker 8789 的 1440/390/320px 浏览器回归继续匹配 V2 的 89 个文本块、20 个标题、6 个来源 URL，确认三张新 MJ 图片被实际引用且旧主页图不再被文章引用；图片均加载，无横向溢出或客户端错误。新截图写入 `docs/previews/wp-seo-02/visual-v2/` 和 `visual-v2-worker/`，未覆盖历史。构建仍有既有 `metadataBase` 回退警告，但实际 HTML 社交图片 URL 检查无 localhost。此轮未提交、推送、合并、部署或申请收录。

## 9. 用户指定材料图与发布准备（2026-11-18）

用户选定另一张 APIMart MJ 银色滑道细节图，要求只替换原材料特写，其他图文不变，并明确要求发布。素材与原始 MJ 任务 `task_01M7MQ2AAZDR6BH4KKS36R3DJM` 的 PNG 摘要一致；新增 WebP v3 与图像 manifest 的摘要见图片记录。V2 英文原文及另外两张 v2 图片未改。用户确认已人工审核图片；既往内容验收覆盖原文一致性及来源限定语，但不构成目标市场法律意见。发布决定及事实边界见 `docs/seo/wp-seo-02-release-decision.md`。

隔离发布工作树在 `E:\aquasee-wp-seo-02-release`，基于公共生产仓库 `origin/main` 的 `c2047b9`。发布版 V2/图像同步、类型检查、OpenNext 构建、发布门禁、GEO、产品门禁及本地 Worker 1440/390/320px 浏览器核验通过；浏览器逐项匹配 89 个文本块、20 个标题、6 个来源 URL，路由 200、内链 200、正确 index/sitemap/Article 发布时间、图片加载和响应式布局。构建中的旧 `metadataBase` 警告仍有打印，社交图片产物检查未发现 localhost。实际线上部署及核验结果另行补记。
