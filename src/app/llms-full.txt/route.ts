import { productCategories } from '@/content/products';
import { collectionFor } from '@/content/commercial-collections';

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
