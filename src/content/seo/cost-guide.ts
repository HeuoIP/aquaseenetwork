import { poolSlideCostV21 } from '@/content/en/pool-slide-cost-v21.generated';
import { costGuideImageManifest } from '@/content/seo/cost-guide-image-manifest.generated';

export const costGuideAssets = {
  cover: {
    src: '/images/guides/pool-slide-cost-hero.webp',
    alt: 'AI concept visualization of a sculptural pool slide beside a contemporary private villa pool.',
    caption: 'AI concept visualization only. The slide is not a manufactured, engineered or available AQUASEE model.',
    width: 1456,
    height: 816,
    ai: true,
  },
  design: {
    src: '/images/guides/pool-slide-cost-design-directions.svg',
    alt: 'Concept diagram comparing compact, curved and landscape-integrated pool slide design directions, not product models.',
    caption: 'Editorial comparison of design questions, not an AQUASEE product range or a ranking of market prices.',
    width: 1500,
    height: 680,
    ai: false,
  },
  material: {
    src: '/images/guides/pool-slide-cost-material-detail.webp',
    alt: 'AI concept close-up of a silver-colored pool slide surface; actual material and construction are unverified.',
    caption: 'AI concept visualization of a metallic appearance. It does not prove an alloy, finish, strength or corrosion performance.',
    width: 1232,
    height: 928,
    ai: true,
  },
  cost: {
    src: '/images/guides/pool-slide-cost-project-cost-map.svg',
    alt: 'Budget diagram separating product, freight and tax, foundations, water connection, labor, changes and upkeep.',
    caption: 'Editorial budget map. It does not assign prices, proportions or a complete project total.',
    width: 1500,
    height: 880,
    ai: false,
  },
  site: {
    src: '/images/guides/pool-slide-cost-site-review-zones.svg',
    alt: 'Concept site diagram marking deck, anchors, water connection, landing and access questions around a pool slide.',
    caption: 'Selection and budgeting diagram only, not to scale or an installation drawing. A qualified local team must assess the exact model and site.',
    width: 1500,
    height: 850,
    ai: false,
  },
} as const;

/** The public page stays noindex until its selected images are reviewed and this decision is recorded. */
export const costGuideRelease: { approval: null | {
  sourceSha256: string;
  imageManifestSha256: string;
  imageProvenanceRef: string;
  imageVisualReviewRef: string;
  approvedBy: string;
  approvedAt: string;
  decisionRef: string;
  publishedAt: string;
} } = { approval: {
  sourceSha256: 'dedc0ce9fa7cbc756b648ee63e03ac91967658214f4e011d1c113b08be3ddcb4',
  imageManifestSha256: 'b4ae09cc462e50997d1319f91491d2eff6e00cd48a9d2e0c712c658798054667',
  imageProvenanceRef: 'docs/seo/seo-02-release-decision.md',
  imageVisualReviewRef: 'Site-owner approval of five displayed images, AQUASEE SEO-02 conversation, 2026-11-21',
  approvedBy: 'AQUASEE site owner',
  approvedAt: '2026-11-21T13:33:00Z',
  decisionRef: 'docs/seo/seo-02-release-decision.md',
  publishedAt: '2026-11-21T13:34:00Z',
} };

export const costGuide = poolSlideCostV21;

export function isCostGuidePublished() {
  const approval = costGuideRelease.approval;
  return !!approval
    && approval.sourceSha256 === costGuide.sourceSha256
    && approval.imageManifestSha256 === costGuideImageManifest.imageManifestSha256
    && !!approval.imageProvenanceRef.trim()
    && !!approval.imageVisualReviewRef.trim()
    && !!approval.approvedBy.trim()
    && !!approval.decisionRef.trim()
    && Number.isFinite(Date.parse(approval.approvedAt))
    && Number.isFinite(Date.parse(approval.publishedAt))
    && Date.parse(approval.publishedAt) >= Date.parse(approval.approvedAt);
}

export function costGuidePublishedAt(): string | null {
  return isCostGuidePublished() ? costGuideRelease.approval!.publishedAt : null;
}
