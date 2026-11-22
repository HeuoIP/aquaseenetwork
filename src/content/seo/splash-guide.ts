import { splashGuide } from '@/content/en/splash-pad-features.generated';
export { splashGuide };

export const splashGuideCover = {
  src: '/images/concepts/splash-play-facilities-v3.webp',
  alt: 'AI concept visualization of children playing under sculptural water sprays in a landscaped splash area.',
  width: 1232, height: 928,
  caption: 'AI concept visualization of a play setting, not an AQUASEE project photograph or a confirmed product.',
} as const;

/** Site-owner content and publication approval in the SEO-03 conversation, 2026-11-22. */
export const splashGuideRelease = {
  sourceSha256: '1cd08e9e78656519df3ed5588bcf7cc9340406fc3bca8b34471547f00c2008b3',
  coverSha256: 'ed1823d2f108f2131fcf71bd418285ed609b0de2b172b3938190f71b657277db',
  approvedBy: 'AQUASEE site owner',
  decisionRef: 'AQUASEE SEO-03 conversation, “可以了，发布吧”, 2026-11-22',
  publishedAt: '2026-11-22T07:01:37Z',
} as const;

export function isSplashGuidePublished() {
  return splashGuide.sourceSha256 === splashGuideRelease.sourceSha256
    && !!splashGuideRelease.coverSha256 && !!splashGuideRelease.approvedBy
    && !!splashGuideRelease.decisionRef && Number.isFinite(Date.parse(splashGuideRelease.publishedAt));
}
