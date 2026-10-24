import type { Metadata } from 'next';
import { LOCALE_TAGS, PUBLISHED_LOCALES, DEFAULT_LOCALE, localePath, type Locale } from '@/lib/locale';
import { getDictionary } from '@/lib/dictionary';
import type { Dictionary } from '@/content/types';
/** Canonical origin. Identical for every language. */
export const SITE_ORIGIN = 'https://www.aquasee.art';

/**
 * Does a path exist in a given language?
 *
 * The standing pages exist in every published language. The insight library
 * does not: a language that has not published an article yet must not have
 * its URL advertised for that article — a hreflang pointing at a page that
 * answers "not found" is worse than no hreflang at all.
 *
 * This is the single place where that rule is decided. The hreflang map, the
 * sitemap and the language switcher all read it, so the three cannot disagree
 * about which language publishes which path.
 */
export function pathExistsIn(dict: Dictionary, path: string): boolean {
  const articles = dict.insights ?? [];
  if (path === '/insights') return articles.length > 0;
  if (path.startsWith('/insights/')) {
    const slug = path.slice('/insights/'.length);
    return articles.some((article) => article.slug === slug);
  }
  return true;
}

/**
 * The paths whose availability differs between languages, and the languages
 * that publish them.
 *
 * The language switcher is a client component and cannot read the content
 * modules, so the server prepares the map and hands it over. Every path in
 * it is subject to the same rule as `pathExistsIn`, so a link is only ever
 * rendered for a language that actually publishes the page it points at.
 */
export async function localeAvailability(): Promise<Record<string, string[]>> {
  const out: Record<string, string[]> = {};
  for (const locale of PUBLISHED_LOCALES) {
    const dict = await getDictionary(locale);
    const articles = dict.insights ?? [];
    if (articles.length) out['/insights'] = [...(out['/insights'] ?? []), locale];
    for (const article of articles) {
      const key = `/insights/${article.slug}`;
      out[key] = [...(out[key] ?? []), locale];
    }
  }
  return out;
}

/**
 * The hreflang map for one logical path.
 *
 * Only languages that actually publish the path are advertised. The
 * `x-default` fallback always points at the English URL.
 */
export async function languageAlternates(path: string): Promise<Record<string, string>> {
  const out: Record<string, string> = {};
  for (const locale of PUBLISHED_LOCALES) {
    const dict = await getDictionary(locale);
    if (!pathExistsIn(dict, path)) continue;
    out[LOCALE_TAGS[locale]] = localePath(locale, path);
  }
  out['x-default'] = localePath(DEFAULT_LOCALE, path);
  return out;
}

/**
 * Page metadata with correct canonical URL and hreflang alternates.
 *
 * The canonical URL always points at the public address of the page in its own
 * language: English keeps the root path, other languages carry their prefix.
 */
export async function pageMetadata({
  locale,
  path,
  title,
  description,
  type = 'website',
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  type?: 'website' | 'article';
}): Promise<Metadata> {
  const canonical = `${SITE_ORIGIN}${localePath(locale, path)}`;
  const languages: Record<string, string> = {};
  for (const [tag, href] of Object.entries(await languageAlternates(path))) {
    languages[tag] = `${SITE_ORIGIN}${href}`;
  }

  return {
    title,
    description,
    alternates: { canonical, languages },
    openGraph: {
      type,
      siteName: 'AQUASEE',
      title,
      description,
      url: canonical,
      locale: LOCALE_TAGS[locale].replace('-', '_'),
      images: [
        {
          url: '/opengraph-image',
          width: 1200,
          height: 630,
          alt: 'AQUASEE — Strategy. Creative Design. Project Realization.',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}