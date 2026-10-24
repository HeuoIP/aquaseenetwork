import type { Metadata } from 'next';
import { LOCALE_TAGS, alternatesFor, localePath, type Locale } from '@/lib/locale';
/** Canonical origin. Identical for every language. */
export const SITE_ORIGIN = 'https://www.aquasee.art';

/**
 * Page metadata with correct canonical URL and hreflang alternates.
 *
 * The canonical URL always points at the public address of the page in its own
 * language: English keeps the root path, other languages carry their prefix.
 */
export function pageMetadata({
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
}): Metadata {
  const canonical = `${SITE_ORIGIN}${localePath(locale, path)}`;
  const languages: Record<string, string> = {};
  for (const [tag, href] of Object.entries(alternatesFor(path))) {
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