# G4 pool shade guide — content and publication decision

Task: AQ03-G4-CONTENT-20261123. Edition: V1.2. Date: 23 November 2026, Asia/Shanghai.

## Authorization

Victor, the AQUASEE site owner and user in Nora's current chat, instructed: “你让公司共享专业能力中心的视觉与效果图设计师aria给你出几张图，配到你的文章里，就可以发布上线了。”

This supersedes the prior instruction to retain the submitted V1.1 package for review. The authorized next action is to commission Aria's illustrations, integrate them into this G4 article and publish after verification. The scope is the pool shade installation buying guide, related discovery links, metadata, sitemap and existing machine summaries. No product SKU, pricing, supply scope, form submission or infrastructure change is authorized by this article release.

## Version and editorial changes

The source of V1.2 is the reviewed V1.1 English article. Its seven core question sections, nine sourced purchasing questions and procurement tables are retained. Publication preparation removes the obsolete draft/pending-editorial text and the duplicated Markdown breadcrumb, as the page renders its own breadcrumb. The visible AI-assisted preparation and source-check date remain. Actual publication approval is Victor's current instruction. No separate Atlas or named professional engineering review is claimed.

The edition's publication time is recorded when the authorized edition and visual manifest are assembled. The later deployment completion time is recorded separately. Source bytes, final image bytes, dimensions and release metadata are bound in `docs/seo/g4-release.json` and checked by `scripts/seo/sync-shade-guide.mjs` on every build.

## Visual acceptance

Aria accepted the visual task in the existing SP02 chat and delivered one AI-generated cover and two original editorial diagrams. Nora opened all three compositions, reviewed their identity and article fit, and verified every entry in the supplied SHA256SUMS before accepting V1. The exact WebP derivatives are used without scene alteration.

- Cover: 1600 by 900, three-post triangular shade sail beside an unoccupied pool. Adjacent caption identifies it as an AI concept, not a built installation or specified product.
- Shade objectives: 1600 by 1000, buyer target areas and time/season inputs. Marked areas are priorities rather than computed shadows.
- Site inputs: 1600 by 1000, unconfirmed support positions and records to collect. No construction dimensions or approved connections are represented.

Source, production records, proposed alt/captions and Aria's handoff are copied to `docs/seo/content/g4/visuals/`. The original images and native vectors remain in Aria's designated output folder. The diagrams have an adjacent readable HTML caption and full-size image link. The cover is used for this article and its social metadata.

These are newly created assets under the user's commission. The cover uses the built-in image generation service with no reference photograph. Diagrams use original vector compositions without stock assets or embedded fonts. Use remains subject to the applicable service terms. No exclusive copyright, engineering verification or separate legal clearance certificate is claimed.

## Checks and publication boundaries

The V1.1 content-review self-score was 86/100. Integrating the accepted visual package and testing the actual application addresses the missing-visual and application-preview findings. Final verification results, PR, commit, deployment run, live Worker version and rollback evidence will be recorded in the release receipt.

Publication includes English only. Schema describes the article and visible breadcrumb. There is no fabricated personal author, professional qualification, offer, rating or FAQ rich-result claim. The page retains source citations, private/commercial inquiry routes and concept disclosures. Project-specific structural and legal conclusions remain subject to the selected system and local review.

## Recovery reference

Production baseline: `8fc8102357c176c3382004b1565766d72fb0c9ee` in `HeuoIP/aquaseenetwork`, branch main. Before this release, Worker `aquasee-website` served version `5be920b4-4979-4009-9e1a-a689a66c7058` at 100 percent under deployment `f6f87a11-4b7a-4f6b-bfce-4e41651cb176`.

Recovery can restore this content/code baseline through a reviewed revert and deployment, or use the previous Worker version where compatible. No database schema, binding, route, secret or external resource migration is included in this release. Verify active traffic and assets after any recovery action.
