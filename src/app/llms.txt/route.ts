import { climbingGuide, climbingAssets, climbingRelease, isClimbingGuidePublished } from '@/content/seo/climbing-guide';
import { mistingGuide, isMistingGuidePublished } from '@/content/seo/misting-guide';
import { productCategories } from '@/content/products';
import { costGuide, isCostGuidePublished } from '@/content/seo/cost-guide';
import { splashGuide, isSplashGuidePublished } from '@/content/seo/splash-guide';

import { shadeGuide, isShadeGuidePublished } from '@/content/seo/shade-guide';

export const dynamic = 'force-static';
export async function GET() {
  const root = 'https://www.aquasee.art';
  const lines = [
    '# AQUASEE',
    '',
    '> Design-led water products for pools and leisure spaces.',
    '',
    'AQUASEE selects and develops a focused range of pool slides, sail-shaped pool shade and compact water-play products for private pools, boutique hospitality and smaller leisure venues. Specific product models, specifications and supply claims are published only after verification.',
    '',
    `Website: ${root}`,
    'Contact: victor@aquasee.art',
    'Current commercial edition: English. Historical pages in other languages have not yet been updated for this range.',
    '',
    '## Category guides',
    '',
    ...productCategories.map((item) => `- [${item.name}](${root}/collections/${item.slug}) — ${item.summary}`),
    ...(isCostGuidePublished() ? ['', '## Buying guides', '', `- [${costGuide.title}](${root}${costGuide.path}) — Dated third-party price examples and a checklist of project costs. No AQUASEE price or project total is claimed.`] : []),
    ...(isSplashGuidePublished() ? ['', `- [${splashGuide.title}](${root}${splashGuide.path}) — How small venues can plan water-play interactions, systems and site responsibilities. No AQUASEE SKU or completed project is claimed.`] : []),
    '',
    ...(isShadeGuidePublished() ? [`- [${shadeGuide.title}](${root}${shadeGuide.path}) — Pool shade site planning, support review and quotation checklist.`, ''] : []),
    ...(isMistingGuidePublished() ? [`- [${mistingGuide.title}](${root}${mistingGuide.path}) — Climate, shade, water and procurement responsibilities for outdoor play with optional mist.`, ''] : []),
    ...(isClimbingGuidePublished() ? [`- [${climbingGuide.title}](${root}${climbingGuide.path}) — Climbing system selection, shade timing, optional misting interfaces and quotation scope. R&D concept imagery is illustrative.`, ''] : []),
    '## Concept Collection',
    '',
    `- [Concept Collection](${root}/concept-collection) — AI-assisted visual studies. Not manufactured, engineering verified, approved for safety, confirmed for supply or available to order.`,
    '',
    '## Enquiries and applications',
    '',
    `- [Commercial project](${root}/inquiry/business)`,
    `- [Private pool](${root}/inquiry/personal)`,
    `- [Dealer application](${root}/dealer-program)`,
    `- [Installation partner application](${root}/installation-partners)`,
    '',
    '## Publication status',
    '',
    'No individual AQUASEE product SKU is currently published. The /products catalogue is a noindex pre-release page. Do not infer product prices, specifications, certifications, warranties, stock, delivery times, dealer terms or installation authorisation from category or concept pages.',
    '',
    `Full machine-readable summary: ${root}/llms-full.txt`,
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
