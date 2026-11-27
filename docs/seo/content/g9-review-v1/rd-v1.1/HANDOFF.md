# G9 Leo研发概念图导出 — rd-v1.1

2026-11-27，Asia/Shanghai。制作/导出：SP02 Aria。接收验收：AQ03 Nora。任务：AQ03-G9-20261127。

状态：两张现有图的WebP导出与自检完成，待Nora核验接收；不是最终发布批准。仅编码压缩，没有裁剪、缩放、重绘、叠字、修图或生成新图。

## 配入决定

| 角色 | 文件 | 尺寸/全图比例 | 大小 |
|---|---|---|---|
| 新封面 | g9-leo-fox-concept-v1.1.webp | 1536×1024，3:2 | 492372 bytes |
| 正文船形/森林概念补图 | g9-leo-boat-forest-concept-v1.1.webp | 1536×512，3:1 | 292972 bytes |

两图保留原始全图，封面不强制16:9，不用cover裁切；建议HTML等比展示。第二图包含攀爬坡道/网通道组合，不称纯网攀爬设备。

原 `../final/g9-interfaces-v1.webp` 与 `../final/g9-scope-v1.webp` 沿用，保留其ASSET_REGISTER中的图注和HTML文字等价。原矢量 `../final/g9-climbing-cover-v1.webp` 退为历史，不与新封面并称现行封面；原文件与既有验收记录均未更改。Nora按此调整选择和集成，Aria未接触网站。

## 英文alt/caption/文字等价

### Fox concept — cover

Alt: `Leo R&D concept visualization of a fox-themed play structure with a climbing net, slide, overhead shade sails and mist, with children shown illustratively.`

Caption: `Leo R&D concept visualization, identified and supplied for reuse by the owner. This is not a physical prototype, built AQUASEE project or available SKU. The people, layout and mist shown do not establish safe use, approved equipment interfaces, shade coverage or cooling performance.`

HTML text equivalent: `A fox-shaped themed structure includes a sloping climbing net and a slide under large shade sails. Mist is visible near the fox entrance and other parts of the illustrated play setting, with children depicted around and on the concept. These figures and apparent separations are visualization elements, not a validated operating layout or proof that climbing surfaces remain dry.`

### Boat / forest concept — body

Alt: `Leo R&D concept visualization of a boat-themed forest play setting with a climbing ramp, raised net passage, slide, shade sails and surrounding mist.`

Caption: `Leo R&D concept visualization, identified and supplied for reuse by the owner: a climbing-ramp and net-passage combination in a boat-themed setting. This is not a physical prototype, built project or available SKU. Depicted people, circulation and mist placement are illustrative, not safety, wet-use or cooling validation.`

HTML text equivalent: `A boat-shaped structure and raised tower connect through a net passage. A climbing ramp provides an illustrated route toward the deck, and a slide is shown on the right. Fabric sails span above the setting, with children and mist shown nearby. The concept combines several activities; it is not a standalone climbing-net product specification or verified design. Equipment, supervision, water drift and wetting, surfacing, access and shade supports require separate review.`

## 来源、授权与工具

- 已实际读取 `../../Nora/leo-owner-source-record.json`，其中记录Victor在Nora会话明确提供共享库“AI产出/小红书图”并要求复用Leo新品图。本包依据该业主来源和复用指令执行，不以缺原生成记录为重复确认门槛。该记录摘要在EXPORT_RECEIPT.json。
- 原图路径、原图SHA256、导出SHA256、原/导出字节数、尺寸、原图未改变校验和工具版本均记录于EXPORT_RECEIPT.json。源图留在原位，没有复制篡改或移动。
- 原始生成工具/模型未记录，不从文件名推断模型。此包只用Pillow现有环境编码WebP：quality=92，method=6，lossless=false；RGB；不缩放、不裁剪。未调用图像生成工具或付费API。
- 用途为业主指定G9文章的概念配图和审阅。业主提供的来源归属是复用依据，不虚构独占版权、第三方授权证书、客户案例、制造/量产、认证、可售SKU或工程验证。
- 场景地域、实际年龄、结构/间距、雾化漂移、水质/卫生、材料、覆盖和降温均未经本次验证。图中真实感与人物不等于实拍或安全验证；应保留外置可见概念图注，避免仅凭封面解读为已建项目。

## 自检与下一步

Aria逐张查看两张原图及WebP导出，主题/全图构图对应、尺寸一致、无裁剪叠字或新内容。两源图SHA256与业主来源记录一致，压缩前后源图摘要不变，导出解码通过。WebP为有损网页压缩，导出字节不同于PNG属于编码结果，不声称像素无损。

Nora下一步：核验摘要与尺寸、验收两图和概念图注，按上述角色替换封面并增补正文；保留接口/报价两图。人物和雾气可能在视觉上接近攀爬区域，不能将图认作直接喷湿绳网的运营建议或已验证干区；沿用正文的漂移/湿面/停雾核查要求。最终图文和发布版本由Nora接续，发布批准单独处理。本次未改网站、未发布、未向其他聊天发消息。
