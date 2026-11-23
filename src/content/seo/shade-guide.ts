export { shadeGuide, shadeGuideAssets, shadeGuideRelease } from '@/content/en/pool-shade-guide.generated';
import { shadeGuide, shadeGuideRelease } from '@/content/en/pool-shade-guide.generated';

export function isShadeGuidePublished() {
  return shadeGuide.sourceSha256 === shadeGuideRelease.sourceSha256
    && !!shadeGuideRelease.assetsSha256 && !!shadeGuideRelease.approvedBy
    && !!shadeGuideRelease.decisionRef && Number.isFinite(Date.parse(shadeGuideRelease.publishedAt));
}
