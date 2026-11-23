import { productCategories } from '@/content/products';
import { collectionFor } from '@/content/commercial-collections';
import { costGuide, isCostGuidePublished } from '@/content/seo/cost-guide';
import { splashGuide, isSplashGuidePublished } from '@/content/seo/splash-guide';

import { shadeGuide, isShadeGuidePublished } from '@/content/seo/shade-guide';

export const dynamic = 'force-static';
export async function GET() {
  const root = 'https://www.aquasee.art';
  const lines = [
    '# AQUASEE — current commercial site',
    '',
    'AQUASEE is building a focused, design-led range for pools and compact leisure spaces. Pool Slides and Outdoor Shade are the initial focus. Compact Water Parks and Splash Play Facilities are developing categories.',
    '',
    'This content describes product categories and inquiry routes. It does not confirm any individual model for sale.',
    '',
  ];
  for (const category of productCategories) {
    const detail = collectionFor(category.slug)!;
    lines.push(`## ${category.name}`, '', `URL: ${root}/collections/${category.slug}`, '', detail.intro, '',
      `Scope: ${category.scopeNote}`, '',
      `Suitable settings: ${detail.suitableFor.join('; ')}.`,
      `Selection considerations: ${detail.considerations.join('; ')}.`, '');
  }
  if (isCostGuidePublished()) lines.push('## Buying guide: residential pool slide cost', '',
    `URL: ${root}${costGuide.path}`, '',
    'A public slide price is not a complete project price. The guide compares dated third-party examples in France, the US and the UK, noting differences in stock, VAT, freight and installation scope. The three suppliers are illustrative examples, not standard market tiers or AQUASEE products.', '',
    'A project budget also needs quotes for delivery, taxes, foundation and deck work, anchors, water connection, installation labor, pool changes and maintenance. No global average, standard installation fee or AQUASEE product price is claimed.', '');
  if (isSplashGuidePublished()) lines.push('## Buying guide: splash pad features for small resorts', '',
    `URL: ${root}${splashGuide.path}`, '',
    'A splash pad is a coordinated play area and water system; a feature is one element. Static spray, manual control, touch activation and programmed effects require different components and operating plans.', '',
    'The article explains site, water and supplier interfaces, public safety guidance scope and the information needed for an enquiry. Its third-party examples are not AQUASEE products or endorsements.', '');
  if (isShadeGuidePublished()) lines.push('## Buying guide: pool shade sail installation', '',
    `URL: ${root}${shadeGuide.path}`, '',
    'A procurement planning guide covering shade objectives, site inputs, support review, fabric requirements, quotation scope and installation responsibilities. Concept images illustrate planning questions. Product suitability and local requirements need project-specific confirmation.', '');
  lines.push('## Concept Collection', '',
    `URL: ${root}/concept-collection`, '',
    'The visuals are AI-assisted concept studies. They are not photographs of completed products or client installations. They have not been manufactured or engineering verified; safety, dimensions, materials, compliance, supply and installation are unconfirmed. They cannot be ordered.', '',
    '## Contact routes', '',
    `Commercial projects: ${root}/inquiry/business`,
    `Private pools: ${root}/inquiry/personal`,
    `Dealer applicants: ${root}/dealer-program`,
    `Installation partner applicants: ${root}/installation-partners`, '',
    'An inquiry or application is received for review only. It does not create a sale, dealer appointment or installation authorisation.', '',
    '## Release boundary', '',
    'There are no published AQUASEE SKUs at this stage. /products is available as a noindex pre-release catalogue foundation, and unapproved product detail pages return 404. No Product or Offer schema is emitted for a concept.', '',
    'English is the current commercial edition. Older service pages and other language editions remain accessible as historical material pending editorial review.', '');
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
