import { getDictionary } from '@/lib/dictionary';
import { PUBLISHED_LOCALES } from '@/lib/locale';

/**
 * /llms-full.txt — the complete text of the site.
 *
 * The same content, flattened to plain markdown, so a retrieval system can
 * take the whole thing without parsing the site.
 */
export const dynamic = 'force-static';

export async function GET() {
  const dict = await getDictionary('en');
  const { site, about, services, process, collaboration, faq, insights, studies } = dict;

  const lines: string[] = [];
  lines.push(`# ${site.name} — full site text`);
  lines.push('');
  lines.push(`Canonical: ${site.url}`);
  lines.push('');

  lines.push('## Organisation');
  lines.push('');
  lines.push(about.definition);
  lines.push('');
  for (const fact of about.facts) lines.push(`- **${fact.label}** — ${fact.value}`);
  lines.push('');

  for (const service of services) {
    lines.push(`## ${service.title}`);
    lines.push('');
    lines.push(service.definition);
    lines.push('');
    lines.push(service.intro);
    lines.push('');
    for (const paragraph of service.paragraphs) {
      lines.push(paragraph);
      lines.push('');
    }
    lines.push('### Activities');
    lines.push('');
    for (const cap of service.capabilities) lines.push(`- **${cap.title}** — ${cap.description}`);
    lines.push('');
    lines.push('### Deliverables');
    lines.push('');
    for (const d of service.deliverables) lines.push(`- ${d}`);
    lines.push('');
    lines.push('### Not included');
    lines.push('');
    for (const d of service.notIncluded) lines.push(`- ${d}`);
    lines.push('');
    lines.push('### Cost drivers');
    lines.push('');
    for (const d of service.costDrivers) lines.push(`- ${d}`);
    lines.push('');
    lines.push('### Engagement');
    lines.push('');
    for (const phase of service.engagement) lines.push(`- **${phase.phase}** — ${phase.description}`);
    lines.push('');
    lines.push('### Questions');
    lines.push('');
    for (const item of service.faq) {
      lines.push(`**${item.q}**`);
      lines.push('');
      lines.push(item.a);
      lines.push('');
    }
  }

  lines.push('## How we work');
  lines.push('');
  for (const step of process) {
    lines.push(`### ${step.index} ${step.title} (${step.duration})`);
    lines.push('');
    lines.push(step.description);
    lines.push('');
    for (const d of step.deliverables) lines.push(`- ${d}`);
    lines.push('');
  }

  lines.push('## Collaboration model');
  lines.push('');
  for (const item of collaboration.model) {
    lines.push(`- **${item.title}** — ${item.description}`);
  }
  lines.push('');

  lines.push('## Capability studies');
  lines.push('');
  for (const study of studies) {
    lines.push(`### ${study.title}`);
    lines.push('');
    lines.push(study.summary);
    lines.push('');
    lines.push(`Scope: ${study.scope.join('; ')}.`);
    lines.push('');
    lines.push(study.outcome);
    lines.push('');
    lines.push(`Note: ${study.disclosure}`);
    lines.push('');
  }

  lines.push('## Questions');
  lines.push('');
  for (const item of faq) {
    lines.push(`**${item.q}**`);
    lines.push('');
    lines.push(item.a);
    lines.push('');
  }

  if (insights && insights.length) {
    for (const article of insights) {
      lines.push(`## ${article.title}`);
      lines.push('');
      lines.push(article.excerpt);
      lines.push('');
      for (const section of article.sections) {
        lines.push(`### ${section.heading}`);
        lines.push('');
        for (const paragraph of section.body) {
          lines.push(paragraph);
          lines.push('');
        }
        if (section.list) {
          for (const item of section.list) lines.push(`- ${item}`);
          lines.push('');
        }
        if (section.table) {
          lines.push(`| ${section.table.headers.join(' | ')} |`);
          lines.push(`| ${section.table.headers.map(() => '---').join(' | ')} |`);
          for (const row of section.table.rows) lines.push(`| ${row.join(' | ')} |`);
          lines.push('');
        }
      }
      lines.push('### Sources');
      lines.push('');
      for (const source of article.sources) {
        lines.push(`- ${source.label} — ${source.url} (consulted ${source.accessed})`);
      }
      lines.push('');
    }
  }

  lines.push('## Languages');
  lines.push('');
  for (const locale of PUBLISHED_LOCALES) lines.push(`- ${locale} — ${site.url}`);
  lines.push('');

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}