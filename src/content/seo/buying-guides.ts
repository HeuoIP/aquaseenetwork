import { poolSlideGuideV2 } from '@/content/en/pool-slide-guide-v2.generated';
import { poolSlideGuideImages } from '@/content/seo/guide-image-manifest.generated';

export const buyingGuides = [
  {
    id: 'pool-slide-selection-v2',
    slug: 'choose-a-pool-slide',
    kind: 'Buying Guide',
    topic: 'Pool Slides',
    guide: poolSlideGuideV2,
    imageManifestSha256: poolSlideGuideImages.imageManifestSha256,
    cover: {
      ...poolSlideGuideImages.cover,
      alt: 'AI concept of an unoccupied private villa pool with a prominent silver-colored residential slide beside the water.',
      caption: 'AI concept visualization of a private pool setting. Slide access, geometry and site suitability require project-specific review. This is not an available or engineered AQUASEE model.',
    },
    visuals: {
      zones: {
        ...poolSlideGuideImages.zones,
        alt: 'Top-down AI concept illustration of a residential pool, surrounding terrace and small slide at the left edge.',
        caption: 'AI concept visualization with editorial discussion markers. Their positions do not show measured clearances, a service route, an installation drawing or a safety assessment.',
      },
      material: {
        ...poolSlideGuideImages.material,
        alt: 'AI concept detail of a curved silver-colored pool slide channel with a brushed-metal appearance.',
        caption: 'AI concept visualization of a metallic appearance only. It does not establish an actual alloy, finish, construction or performance.',
      },
    },
  },
] as const;

export type BuyingGuide = (typeof buyingGuides)[number];

/** Human publication decision, separate from the unmodified Work V2 draft. */
export const buyingGuideRelease: {
  approval: null | {
    guideId: string;
    sourceSha256: string;
    imageManifestSha256: string;
    imageRightsReviewRef: string;
    imageRightsEvidenceSha256: string;
    imageVisualReviewRef: string;
    approvedBy: string;
    approvedAt: string;
    decisionRef: string;
    publishedAt: string;
  };
} = { approval: {
  guideId: 'pool-slide-selection-v2',
  sourceSha256: '44e760edb41a356c07157a7fe928bea5e66e118cde266e23c64e3b26e29278fa',
  imageManifestSha256: 'a840da77a91d92f3e6a00daa6ca53d094d23057a229d8ff3c2db5d7c95641ca8',
  imageRightsReviewRef: 'docs/seo/wp-seo-02-release-decision.md',
  imageRightsEvidenceSha256: '6c85294aa056bf5ba461695628280f046f386343854bef9262d32556d9687ccf',
  imageVisualReviewRef: 'Site-owner image selection and manual review, AQUASEE WP-SEO-02 conversation, 2026-11-18',
  approvedBy: 'AQUASEE site owner',
  approvedAt: '2026-11-18T00:16:00Z',
  decisionRef: 'docs/seo/wp-seo-02-release-decision.md',
  publishedAt: '2026-11-18T00:16:00Z',
} };

export function isBuyingGuidePublished(article: BuyingGuide): boolean {
  const approval = buyingGuideRelease.approval;
  return !!approval
    && approval.guideId === article.id
    && approval.sourceSha256 === article.guide.sourceSha256
    && approval.imageManifestSha256 === article.imageManifestSha256
    && !!approval.imageRightsReviewRef.trim()
    && /^[a-f0-9]{64}$/i.test(approval.imageRightsEvidenceSha256)
    && !!approval.imageVisualReviewRef.trim()
    && !!approval.approvedBy.trim()
    && !!approval.decisionRef.trim()
    && Number.isFinite(Date.parse(approval.approvedAt))
    && Number.isFinite(Date.parse(approval.publishedAt))
    && Date.parse(approval.publishedAt) >= Date.parse(approval.approvedAt);
}

export function guideBySlug(slug: string): BuyingGuide | undefined {
  return buyingGuides.find((article) => article.slug === slug);
}

export function guidePublishedAt(article: BuyingGuide): string | null {
  return isBuyingGuidePublished(article) ? buyingGuideRelease.approval!.publishedAt : null;
}
