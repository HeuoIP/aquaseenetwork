# G4 V1.2 pre-publication acceptance

23 November 2026. Nora accepted Aria's V1 image package after opening all three final compositions and verifying the supplied SHA256 manifest. The three final WebP files and their alt/captions are bound in g4-release.json. Aria acknowledged Nora's acceptance in the SP02 chat.

## Content and visual scope

The publication source retains the reviewed procurement guide, seven core customer questions, nine sourced purchasing questions and three decision tables. The former draft status has been replaced with the truthful AI-assisted preparation and source-check note, under Victor's latest instruction to add Aria's illustrations and publish. There is no invented human author or expert review.

The cover is an AI concept illustration. The two diagrams are original editorial concepts, with labels and captions describing buyer objectives and unconfirmed site inputs. Each diagram has full-size access for mobile readers. No illustration is described as an AQUASEE installation, product specification or calculated shade result.

## Application checks completed

- npm run typecheck passed.
- npm run build:opennext passed, including Next.js production build, source/image synchronization, catalog source coverage and product gates.
- Built OG inspection passed for 70 HTML pages and 138 image tags on the canonical host.
- npm run geo:check passed for 68 pages, four languages and 17 sitemap entries.
- npm run products:check passed.
- npx wrangler deploy --dry-run passed.
- git diff --check passed. Staged article bytes match the release source digest under repository LF rules.

The Next.js build still prints the pre-existing metadataBase fallback warnings. Actual built image URL inspection and the new page's browser assertions both pass. No framework/configuration upgrade was performed in this article task.

## Real local Worker acceptance

Command: node scripts/seo/check-shade-guide-preview.mjs against http://127.0.0.1:8791 after the OpenNext build, served by wrangler dev --local.

The browser compared all 112 source text blocks and the ordered H1/H2/H3 sequence with the real application page. It checked title, description, canonical, index directive, en/x-default alternates, Article/WebPage/Breadcrumb schema, publication date, citations, three loaded images and their alt/captions. No author, FAQPage, Product, Offer or rating was emitted for this guide.

1440, 390 and 320px passed with zero horizontal page overflow and zero JavaScript errors. Lazy image loading is awaited before checking decode. Image HTTP responses matched all three approved SHA256 digests. Both full-size diagram links were present.

The content hub, shade collection, prior three guides, two inquiry pages, sitemap and both existing machine summaries returned 200. Hub, collection, sitemap and summaries include the new guide. Unpublished zh/ar/ru variants returned 404. No inquiry was submitted. Browser assertions and screenshots are in docs/previews/g4-worker/.

## Quality gate recheck

Official V1.0 self-review scores: strategic fit 10/10, search intent 9/10, original value/depth 13/15, facts/evidence 17/20, customer utility 14/15, SEO 9/10, GEO clarity 5/5, English editing 9/10, visuals 5/5. Total 91/100. Five veto checks have no matches.

The visual package and actual Worker browser checks address the former missing-image and isolated-preview limitations. Remaining limits are the absence of site-specific engineering review, independent human expert attribution and real search/conversion performance. The article makes no such claims. Rich Results Test and Search Console indexing inspection have not been recorded as completed.

## Release condition

Victor's latest instruction authorizes this content/visual integration and publication after verification. PR checks must pass before merge. The current production baseline and prior Worker version are recorded in g4-release-decision.md. Deployment completion and production checks will be recorded separately after they actually occur.
