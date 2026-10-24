import type { MetadataRoute } from 'next';
import { getDictionary } from '@/lib/dictionary';
import { PUBLISHED_LOCALES, alternatesFor, localePath, type Locale } from '@/lib/locale';

/**
 * The sitemap.
 *
 * Two things matter here beyond listing the URLs:
 *
 *  - `lastModified` is the date the content last changed, not the date of the
 *    build. Reporting the build time tells crawlers that every page on the
 *    site changed on every deploy, which is exactly the signal a crawler
 *    learns to ignore.
 *  - each entry carries its hreflang alternates, so the language versions are
 *    discovered as one set of pages rather than as separate sites.
 */
const SITE_UPDATED = '2026-10-24';

const STATIC_ROUTES = [
  { path: '/', priority: 1, changeFrequency: 'weekly' as const },
  { path: '/strategy', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/creative-design', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/supply-chain', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/projects', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/about', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/faq', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/insights', priority: 0.8, changeFrequency: 'weekly' as const },
  { path: '/contact', priority: 0.9, changeFrequency: 'monthly' as const },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = 'https://www.aquasee.art';
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of PUBLISHED_LOCALES) {
    const dict = await getDictionary(locale);
    const articles = dict.insights ?? [];

    for (const route of STATIC_ROUTES) {
      entries.push({
        url: `${base}${localePath(locale as Locale, route.path)}`,
        lastModified: new Date(SITE_UPDATED),
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: { languages: toAbsolute(alternatesFor(route.path)) },
      });
    }

    for (const article of articles) {
      entries.push({
        url: `${base}${localePath(locale as Locale, `/insights/${article.slug}`)}`,
        lastModified: new Date(article.updatedAt),
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: { languages: toAbsolute(alternatesFor(`/insights/${article.slug}`)) },
      });
    }
  }

  return entries;
}

function toAbsolute(map: Record<string, string>): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [tag, path] of Object.entries(map)) out[tag] = `https://www.aquasee.art${path}`;
  return out;
}