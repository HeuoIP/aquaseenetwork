# WP-SEO-02 | APIMart Midjourney visual record

**Date:** 2026-11-17 (Asia/Shanghai). **Historical first package:** the two MJ support images and temporary home-image cover described below were the first local preview set. They were superseded by the visual revision recorded at the end of this file. No image in this package is a manufactured, engineered, certified or available AQUASEE model.

The user's `text-to-image` skill provides an APIMart key but its current CLI lists only Tongyi, Doubao and Nano Banana. The same APIMart credential passed the skill's read-only `--check-relay` check. The new images were generated through APIMart's documented Midjourney Imagine endpoint with `scripts/seo/generate-guide-mj.py`, model version `8.2`, `raw: true`, and `speed: fast`. Do not call the skill's `nanobanana` provider for this package: it invokes Gemini rather than MJ.

## Integrated images

| Placement | Source task and file | Website derivative | Alt and visible caption |
| --- | --- | --- | --- |
| After “Measure the site before selecting a model” | `task_01M7MHQ961N5XSGEM0SVPN1K0T`; `docs/previews/wp-seo-02/mj-source/choose-a-pool-slide-zones-mj-source.png` | `public/images/guides/choose-a-pool-slide-zones-mj-v1.webp` · 1200×904 · 87,322 bytes · SHA-256 `12e4066c59fc70474ac4ee259312d48db0aff2051b3aa910a13a70adc1abea1` | Alt: “Abstract bird’s-eye pool illustration with a slide symbol and colored areas around the water.” Caption calls out five questions and explicitly says it is not a measured plan, installation drawing or safety assessment. |
| After “Ask what the materials and structure actually are” | `task_01M7MHFXKM6BEA9N3GR2TFCZ75`; `docs/previews/wp-seo-02/mj-source/choose-a-pool-slide-material-mj-source.png` | `public/images/guides/choose-a-pool-slide-material-mj-v1.webp` · 1200×904 · 79,076 bytes · SHA-256 `5f653271041a62403e2b0086ca555a7abb5d37dd72e991f57f0b0cc0af428f1e` | Alt: “AI concept close-up of a metallic-looking slide surface beside stone paving and pool water.” Caption states that alloy, finish, construction and performance are unverified. |

Both support figures show the visible label **“AI concept visualization”**. The zones graphic is an abstract discussion aid. Its shapes and slide symbol are not usable for placement, clearances, landing geometry or construction. The five checks are written as HTML text outside the image so they remain readable and do not pretend the MJ layout is technically exact.

## Source-to-WebP integrity and publication gate

The local source ledger is `scripts/seo/guide-image-sources.json`. `scripts/seo/sync-guide-images.mjs --check` recomputes SHA-256 from each raw PNG and served WebP before production builds. The resulting `src/content/seo/guide-image-manifest.generated.ts` binds all three pairs under image manifest SHA-256 `fb1832f85409de37ce31310946547122302c7001c231231d0ac7ff7cca933962`. Replacing a source PNG or WebP without regenerating the manifest fails the build; regenerating it changes the image manifest and invalidates any earlier article release approval.

| Image | Original PNG SHA-256 | Served WebP SHA-256 | Source record |
| --- | --- | --- | --- |
| Temporary cover | `9a504450777cf224733ecbad41cfd311d10fbbdbdb165dedc45d19ddde0382f2` | `79a4bf47c490e547aeeb1caff636f8126ee2ff1e5fdeffc4d962203cf7b57700` | Original copied without alteration to `docs/previews/wp-seo-02/source/pool-slides-v2-source.png`; original generation ID and limitations remain in `docs/strategy-v2-image-refresh.md`. |
| MJ selection zones | `7d8ecfab66be060e814513ee736507bbbf580771e96d3a027de4e6343e3f025f` | `12e4066c59fc70474ac4ee259312d48db0aff2051b3aa910a13a70adc1abaea1` | APIMart task `task_01M7MHQ961N5XSGEM0SVPN1K0T`; JSON receipt beside the PNG. |
| MJ material appearance | `73a947609d98359581139afd4107666420817c1b477898962b18cb7fab3169ad` | `5f653271041a62403e2b0086ca555a7abb5d37dd72e991f57f0b0cc0af428f1e` | APIMart task `task_01M7MHFXKM6BEA9N3GR2TFCZ75`; JSON receipt beside the PNG. |

`buyingGuideRelease.approval` remains `null`. A future human publication decision must match both the V2 source digest and the current image manifest digest, and record a rights review reference, a SHA-256 digest of its restricted rights evidence, and a visual review reference. These fields are gates, not claims that reviews have already been completed. The raw files and this ledger establish byte identity and derivation only; they do not establish usage rights or safe geometry.

## Hero candidates not selected

Three original APIMart MJ outputs and their task receipts are retained in `docs/previews/wp-seo-02/mj-source/`: `task_01M7MH9RTQMX3ED3WQQD7SDA61`, `task_01M7MHKS12E5ARXBJW1PX2ZH7T` and `task_01M7MHTNX1TNABRXH9VM9V99NH`. The first two make the slide too small to work as an article cover; the third depicts a slide-like form that appears to finish on the terrace. None was copied to `public/images/guides/` or passed off as a validated pool installation. A stronger APIMart MJ hero remains an open visual task. The existing cover can be reviewed for publication separately; its earlier source record is in `docs/strategy-v2-image-refresh.md`.

## Exact prompts and reproduction

`scripts/seo/generate-guide-mj.py` contains the complete prompts and negative prompts for `hero`, `zones` and `material`. It submits one task at a time and stores each raw source and JSON receipt locally. The current hero prompt is a candidate for another review cycle, not an approved publication asset. Command:

```powershell
python scripts/seo/generate-guide-mj.py --asset hero
python scripts/seo/generate-guide-mj.py --asset zones
python scripts/seo/generate-guide-mj.py --asset material
```

The prompt parameters are structured APIMart MJ fields (`size`, `version`, `raw`, `stylize`, `negative_prompt`), following the current [Imagine API documentation](https://docs.apimart.ai/en/api-reference/images/midjourney/imagine). This avoids the unsupported `--style raw` combination in MJ 8.2. The images are original text-to-image outputs without copied reference images, third-party logos or product identifiers. Source URLs in receipts expire; keep the raw local files and job IDs. Optimized WebP derivatives were created with `sharp`, without retouching the conceptual content.

**Release review:** confirm APIMart/MJ usage rights for this account, review image similarity and any misleading visual geometry, and approve the exact source/digest before an indexable page uses the assets. The current preview is local only. Never derive material grade, water depth, user capacity, compliance, certification, safety or availability from these images.

## Visual revision after user feedback (2026-11-18)

The user found the first images weak and specifically objected to reusing the homepage cover. Chat rewrote the APIMart MJ prompts for a coherent architectural editorial set. Exact Chat prompts are preserved in `scripts/seo/guide-mj-v2-spec.json` and its shorter response to the first failed batch in `guide-mj-v3-spec.json`. Codex's narrower composition trials are preserved in `guide-mj-v4-spec.json` and `guide-mj-v5-hero-spec.json`. `generate-guide-mj.py` now uses `--spec-file` and task-specific output filenames; all previous sources remain untouched. Every generated task has a non-secret JSON receipt containing its exact request, task ID and UTC timestamp beside its original PNG.

Six long-prompt outputs were rejected because hero slides attached to buildings or ended ambiguously, axonometric zones became opaque building models, and metal details became unrecognizable macro shapes. The shorter Chat prompt produced a recognizable slide detail, but did not fix the hero or diagram. The later composition trials yielded the following **local draft selections**, not publication approvals:

| Placement | APIMart MJ task / original PNG SHA-256 | Served WebP / SHA-256 | Visual judgment |
| --- | --- | --- | --- |
| New cover | `task_01M7MQ746NXXK4P5EK62E2RBV2` / `8efe06d3ec973d0b902a8a8fb453fd8630e738da2b4e6e21ab47e85ee0965d49` | `public/images/guides/choose-a-pool-slide-hero-mj-v2.webp` / `f944102d333f5b6fc33cb995b477f08a4b9df3cf3d05dbcc62df0dddbf340a2b` · 1456×816 · 302,720 bytes | Unoccupied private pool, prominent standalone slide and water exit; clearly different from homepage. Upper access is partly obscured, so this remains a **provisional concept**, not evidence of a workable installation. |
| Selection areas | `task_01M7MQ746MTNE6RP5EQXD9Z45V` / `5b6f4a46d6e1c000a2f88f1a1d305cd3ccecfabe12a434afa345c82193a139d9` | `public/images/guides/choose-a-pool-slide-zones-mj-v2.webp` / `45c77c597f134dbcc4d7b72fca426ee008a31b38f289182e9085208a988047d8` · 1232×928 · 17,550 bytes | Clean top-down MJ concept. Five numbered **HTML editorial markers** and a responsive legend make the site questions readable; marker positions are discussion cues, not measured zones or service routing. |
| Material appearance | `task_01M7MQ7473RPGD1X0EZ2Q8CKHC` / `7611e2a20db76e43aa477aa8e743bacbd37e24a89db8d1ff71ebab69db6a29d2` | `public/images/guides/choose-a-pool-slide-material-mj-v2.webp` / `b38678022c35be3fff6e2e850fb82d5db264d3ee012efa199d9ac46e0dfa9f71` · 1232×928 · 71,602 bytes | Clearly shows a U-shaped channel and brushed-metal appearance. It is a cropped **concept detail**; no alloy, fabrication or performance claim follows from it. |

The source PNG paths for these three selections are recorded in `scripts/seo/guide-image-sources.json` and locked with their WebP derivatives by `src/content/seo/guide-image-manifest.generated.ts`. Current manifest SHA-256: `09a297108709265921391001a9170519928dd3d4c9843ae529e92ee8c09aa1aa`; the prior manifest digest is no longer current. The old homepage cover and v1 support WebPs remain as history and are no longer referenced by the article. A final, simpler pair of hero trials (`task_01M7MQQS6G13MWHQHSG4AGFGQH` and `task_01M7MQQS6H70A7J5Z4F6ENBE6D`) showed clearer access but looked more like basic pool equipment than the required premium villa integration; they were not integrated.

Preview screenshots from this revision are in `docs/previews/wp-seo-02/visual-v2/`, separate from older screenshots. Local page labels all three assets `AI concept visualization`. None is a manufactured AQUASEE product photograph, a technical design, a certified model, or a saleable SKU. The exact selected visual set still needs user/Chat aesthetic review, APIMart/MJ rights and similarity review, and professional geometry/context judgment before a human publication decision.

## User-selected material replacement and release decision (2026-11-18)

The site owner selected the silver channel close-up in the conversation attachment and asked to replace only the material detail. Its bytes match APIMart MJ task `task_01M7MQ2AAZDR6BH4KKS36R3DJM` original PNG (SHA-256 `07f54563d770405ee75fe6f3c4a83a3dbd1e3dd9ba875cff3a66f889b82da8c7`). The served derivative is `public/images/guides/choose-a-pool-slide-material-mj-v3.webp` (1232×928; SHA-256 `4fac64f540d7e75ffa2301271e78089d47df380d6ac8670d128067cfc57b0f`). Cover and zones remain exactly the v2 images in the table above. The current three-image manifest is `a840da77a91d92f3e6a00daa6ca53d094d23057a229d8ff3c2db5d7c95641ca8`.

The owner confirmed manual image review and directed publication. The factual scope and remaining rights/legal limits are recorded in `docs/seo/wp-seo-02-release-decision.md`; prior draft-state notes above are historical. The image remains visibly labeled an AI concept visualization and conveys appearance only.
