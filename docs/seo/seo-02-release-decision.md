# SEO-02 English cost guide: release decision and evidence

**Decision date:** 2026-11-21, Asia/Shanghai
**Public path:** `/buying-guides/pool-slide-total-cost`
**Scope:** One English buying guide, five reviewed visuals, its Buying Guides card, sitemap and machine-readable guide links. No product SKU, price, Offer or installation service is published.

The site owner stated that the V2.1 content had passed review and explicitly authorized formal SEO/GEO publication. Before deployment, the owner asked to see the actual article images. The five proposed images were displayed in the same conversation; the owner explicitly approved using all five. This decision is the human content and visual approval for this release. It does not approve any depicted slide as an engineered or available AQUASEE product.

The public Markdown is copied from the reviewed V2.1 article. Only the status field and two editorial-facing phrases were polished for public display: the sources heading no longer says “for editorial review,” and the final “Publication boundary” label and “confirm at publication” wording are now a reader-facing scope note. No price, claim, source URL or FAQ answer was changed. The exact file SHA-256 is embedded in the generated content and the release gate.

## Price check before release

On 2026-11-21, the cited supplier pages were opened again. The checks found:

| Source | Observed result | Published interpretation |
|---|---|---|
| French AstralPool Straight 1.30 m retailer listing | HTTP 200; 1201 EUR including VAT; page image alt still says `Out of stock`. | Article retains €1,201 as a dated observed price and states that the item was out of stock at verification. Delivery and installation remain unspecified. |
| US S.R.Smith Cyclone taupe retailer listing | HTTP 200; $1,499.99 and separate $250 estimated freight shown. | $1,749.99 remains only the arithmetic sum before tax and site work. |
| UK Splinterworks Cyma manufacturer page | HTTP 200; UK selection shows prices from £55,950, including UK delivery and VAT, excluding installation. | Starting product price for that UK selection only. |
| UK Splinterworks Orchid manufacturer page | HTTP 200; page has a public UK price. | The article intentionally does not reproduce an Orchid number and directs the reader to request a current project quote. The conflicting historical observations remain in the private editorial record. |

The published article uses **18 November 2026** as the original observation date of its quoted amounts. The 21 November recheck did not justify changing those dated claims. Prices, inventory and terms may change after this release.

## Selected images

| Article use | Published file | Source and identity | Disclosure |
|---|---|---|---|
| Hero scene | `public/images/guides/pool-slide-cost-hero.webp` | APIMart Midjourney 8.2 task `task_01M7Z4C1GQK8WTCBFE12SFJS2W`; original `docs/previews/seo-02-cost/selected/hero-source.png`, SHA-256 `3e51eca8d9c8c11dc266ee10d520e0aafe8df177c93fbfeff1c641f215b5e846`. | AI concept visualization, not product photography. |
| Design directions | `public/images/guides/pool-slide-cost-design-directions.svg` | Original editorial vector diagram. | Comparison dimensions, not AQUASEE models or a price ladder. |
| Material detail | `public/images/guides/pool-slide-cost-material-detail.webp` | APIMart Midjourney 8.2 task `task_01M7Z3XAG5VZHHBF2RDAP1EF15`; original `docs/previews/seo-02-cost/selected/material-source.png`, SHA-256 `635845e98b1fda61612a7286a2953a2e3afad5b8f912aab7a2a54fab9e1612db`. | AI concept appearance; does not prove material grade or performance. |
| Project cost map | `public/images/guides/pool-slide-cost-project-cost-map.svg` | Original editorial vector diagram. | No invented amount or cost proportion. |
| Site review zones | `public/images/guides/pool-slide-cost-site-review-zones.svg` | Original editorial vector diagram. | Not to scale or an installation drawing. |

The five published files and their SHA-256 values are recorded in `src/content/seo/cost-guide-image-manifest.generated.ts`. Changing any file invalidates the image check and release approval binding. APIMart task IDs and original PNGs document generation provenance. The owner's review confirms visual selection; it is not an independent legal assessment of license scope or similarity. The page visibly labels the two AI visuals and limits the diagrams to editorial use.

## Release checks

- Approved English source and generated content match by SHA-256. The public article does not contain either disputed Orchid amount.
- Image manifest is checked against the five actual public file bytes.
- Local production build, typecheck, product gate, GEO structure check and browser checks at 1440, 390 and 320 pixels passed before the publication decision was applied. The draft was `noindex` and absent from sitemap during visual review.
- After publication approval is bound, rerun these checks. Confirm the live URL returns 200, is indexable with a self canonical, appears in sitemap and Buying Guides, emits Article and BreadcrumbList without Product/Offer, loads all five visuals, and preserves the price and stock qualifiers.

**Publishing operation:** The deployment is a separate workflow action after merge. Record its run and live results in the handoff. No Search Console indexing request is implied by publication.
