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
 */
export function pathExistsIn(dict: Dictionary, path: string): boolean {
  if (path.startsWith('/insights/')) {
    const slug = path.slice('/insights/'.length);
    return (dict.insights ?? []).some((article) => article.slug === slug);
  }
  return true;
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