import assert from 'node:assert/strict';
import { build } from 'esbuild';

const built = await build({ entryPoints: ['src/content/seo/buying-guides.ts'], bundle: true, platform: 'node', format: 'esm', write: false, tsconfig: 'tsconfig.json' });
const source = built.outputFiles[0].text;
const module = await import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`);
const { buyingGuides, buyingGuideRelease, isBuyingGuidePublished, guidePublishedAt } = module;
const article = buyingGuides[0];
const actualApproval = buyingGuideRelease.approval;
assert.equal(isBuyingGuidePublished(article), true, 'approved guide is published');
assert.equal(guidePublishedAt(article), actualApproval.publishedAt, 'published guide has its release date');

const candidate = {
  guideId: article.id,
  sourceSha256: article.guide.sourceSha256,
  imageManifestSha256: article.imageManifestSha256,
  imageRightsReviewRef: 'TEST-RIGHTS-REVIEW',
  imageRightsEvidenceSha256: 'a'.repeat(64),
  imageVisualReviewRef: 'TEST-VISUAL-REVIEW',
  approvedBy: 'test-reviewer',
  approvedAt: '2026-11-17T08:00:00Z',
  decisionRef: 'TEST-ONLY',
  publishedAt: '2026-11-17T09:00:00Z',
};
buyingGuideRelease.approval = { ...candidate, sourceSha256: 'wrong-version' };
assert.equal(isBuyingGuidePublished(article), false, 'old or wrong V2 digest is rejected');
buyingGuideRelease.approval = { ...candidate, imageManifestSha256: 'wrong-images' };
assert.equal(isBuyingGuidePublished(article), false, 'replaced images invalidate publication approval');
buyingGuideRelease.approval = { ...candidate, imageRightsEvidenceSha256: '' };
assert.equal(isBuyingGuidePublished(article), false, 'missing rights evidence digest is rejected');
buyingGuideRelease.approval = { ...candidate, imageVisualReviewRef: '' };
assert.equal(isBuyingGuidePublished(article), false, 'missing visual review is rejected');
buyingGuideRelease.approval = { ...candidate, publishedAt: '2026-11-17T07:00:00Z' };
assert.equal(isBuyingGuidePublished(article), false, 'publication before approval is rejected');
buyingGuideRelease.approval = { ...candidate, approvedBy: '' };
assert.equal(isBuyingGuidePublished(article), false, 'missing human approver is rejected');
buyingGuideRelease.approval = candidate;
assert.equal(isBuyingGuidePublished(article), true, 'current V2 with human approval may publish');
assert.equal(guidePublishedAt(article), candidate.publishedAt, 'approved date becomes card/schema date');
buyingGuideRelease.approval = null;
assert.equal(isBuyingGuidePublished(article), false, 'withdrawn guide is not published');
buyingGuideRelease.approval = actualApproval;
console.log('Guide release gate: draft, text/image digest, rights/visual review, date and approver rejection passed; valid isolated fixture accepted.');
