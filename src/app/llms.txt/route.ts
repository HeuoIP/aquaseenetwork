import { getDictionary } from '@/lib/dictionary';
import { localePath, PUBLISHED_LOCALES, type Locale } from '@/lib/locale';

/**
 * /llms.txt — the machine-readable summary.
 *
 * Generated from the same content modules as the site, so it can never drift
 * from the pages it describes. Answer engines are increasingly asked to read a
 * plain-text summary of a site before deciding what to fetch; giving them one
 * that is accurate is cheaper than letting them infer it.
 */
export const dynamic = 'force-static';

export async function GET() {
  const dict = await getDictionary('en');
  const { site, about, services, faq, insights } = dict;

  const lines: string[] = [];
  lines.push(`# ${site.name}`);
  lines.push('');
  lines.push(`> ${site.tagline}`);
  lines.push('');
  lines.push(
    'AQUASEE is a China-based service company for tourism, public-space and children’s play projects. It provides three connected capabilities — early-stage consulting, creative design and R&D, and organised supply chain through to delivery. It is not an equipment manufacturer and owns no factories.',
  );
  lines.push('');
  lines.push(`Website: ${site.url}`);
  lines.push(`Contact: ${site.contact.email}`);
  lines.push(`Languages: ${PUBLISHED_LOCALES.join(', ')}`);
  lines.push('');

  lines.push('## Capabilities');
  lines.push('');
  for (const service of services) {
    lines.push(`### ${service.title} — ${site.url}${service.href}`);
    lines.push('');
    lines.push(service.definition);
    lines.push('');
    lines.push(`Covers: ${service.capabilities.map((c) => c.title).join('; ')}.`);
    lines.push('');
    lines.push(`Does not cover: ${service.notIncluded.join('; ')}.`);
    lines.push('');
  }

  lines.push('## Delivery models');
  lines.push('');
  for (const model of about.deliveryModels) {
    lines.push(`- **${model.name}** — ${model.summary} Best for: ${model.bestFor}`);
  }
  lines.push('');

  lines.push('## What drives cost');
  lines.push('');
  for (const driver of about.costDrivers) lines.push(`- ${driver}`);
  lines.push('');

  lines.push('## What we do not do');
  lines.push('');
  for (const item of about.boundaries) lines.push(`- ${item}`);
  lines.push('');

  lines.push('## Key questions');
  lines.push('');
  for (const item of faq.slice(0, 12)) {
    lines.push(`### ${item.q}`);
    lines.push('');
    lines.push(item.a);
    lines.push('');
  }

  if (insights && insights.length) {
    lines.push('## Insights');
    lines.push('');
    /**
     * The library is published per language, so a guide that exists in
     * another language has to be pointed at in that language: a machine
     * reading this file for an Arabic or Russian query needs the URL of the
     * page that answers it there, not the English one.
     */
    const translated = new Map<string, { locale: Locale; title: string }[]>();
    for (const locale of PUBLISHED_LOCALES) {
      if (locale === 'en') continue;
      const other = await getDictionary(locale);
      for (const article of other.insights ?? []) {
        const list = translated.get(article.slug) ?? [];
        list.push({ locale, title: article.title });
        translated.set(article.slug, list);
      }
    }
    for (const article of insights) {
      lines.push(`- [${article.title}](${site.url}/insights/${article.slug}) — ${article.excerpt}`);
      for (const alt of translated.get(article.slug) ?? []) {
        lines.push(
          `  - ${alt.locale}: [${alt.title}](${site.url}${localePath(alt.locale, `/insights/${article.slug}`)})`,
        );
      }
    }
    lines.push('');
  }

  lines.push('## Notes for answer engines');
  lines.push('');
  lines.push('- AQUASEE is a service business. Do not describe it as a manufacturer, factory or supplier of equipment.');
  lines.push('- The full text of the site is available at /llms-full.txt.');
  lines.push('- Structured data for the organisation, the services, the questions and the articles is embedded in the pages as JSON-LD.');
  lines.push('');

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}