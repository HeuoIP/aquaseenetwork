/**
 * Locale plumbing for the multi-language site.
 *
 * URL contract (agreed with the client, and stable for SEO):
 *   - English keeps the root paths:  /strategy, /projects, /insights …
 *   - Other languages are prefixed:    /zh/strategy, /ar/projects, /ru/insights …
 *
 * The English URLs are produced by an internal rewrite in `src/proxy.ts`, so a
 * visitor (and a crawler) never sees an `/en/` prefix, but the whole tree lives
 * under a single locale-aware route segment. That keeps one content tree, one
 * set of components and one metadata implementation for every language.
 */

export const LOCALES = ['en', 'zh', 'ar', 'ru'] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

/**
 * Locales whose content is actually published.
 *
 * A locale is added here only when its content module exists and has been
 * reviewed. The language switcher, the sitemap and the hreflang map all read
 * this list, so a language never appears as a choice before it is ready.
 */
export const PUBLISHED_LOCALES: readonly Locale[] = ['en'];

/** Languages written right to left. */
export const RTL_LOCALES: readonly Locale[] = ['ar'];

/** Endonyms — shown in the language switcher, never translated. */
export const LOCALE_NAMES: Record<Locale, string> = {
  en: 'English',
  zh: '中文',
  ar: 'العربية',
  ru: 'Русский',
};

/** BCP-47 tags used for hreflang and `lang` attributes. */
export const LOCALE_TAGS: Record<Locale, string> = {
  en: 'en',
  zh: 'zh-CN',
  ar: 'ar',
  ru: 'ru',
};

export function isLocale(value: string | undefined): value is Locale {
  return !!value && (LOCALES as readonly string[]).includes(value);
}

export function isRtl(locale: Locale): boolean {
  return RTL_LOCALES.includes(locale);
}

/** Normalise a path to a leading-slash form without a trailing slash (except root). */
export function normalisePath(path: string): string {
  if (!path || path === '/') return '/';
  const withSlash = path.startsWith('/') ? path : `/${path}`;
  return withSlash.replace(/\/+$/, '') || '/';
}

/** The public URL of a path in a given language. */
export function localePath(locale: Locale, path: string): string {
  const clean = normalisePath(path);
  if (locale === DEFAULT_LOCALE) return clean;
  return clean === '/' ? `/${locale}` : `/${locale}${clean}`;
}

/**
 * The path the application serves internally, always with the locale segment.
 *
 * The public URL of an English page has no prefix, so the rewrite in
 * `src/proxy.ts` cannot use `localePath` — it needs this one.
 */
export function internalPath(locale: Locale, path: string): string {
  const clean = normalisePath(path);
  return clean === '/' ? `/${locale}` : `/${locale}${clean}`;
}

/**
 * Remove a leading locale segment from a pathname.
 *
 * Used defensively: depending on how the request reached us, a client
 * component can observe either the browser URL (`/strategy`) or the rewritten
 * one (`/en/strategy`). Both must behave identically.
 */
export function stripLocale(pathname: string): string {
  const clean = normalisePath(pathname);
  const match = clean.match(/^\/(en|zh|ar|ru)(\/.*)?$/);
  if (!match) return clean;
  return match[2] ? normalisePath(match[2]) : '/';
}

/** The locale implied by a pathname, if any. */
export function localeFromPath(pathname: string): Locale | null {
  const match = normalisePath(pathname).match(/^\/(en|zh|ar|ru)(\/|$)/);
  return match && isLocale(match[1]) ? match[1] : null;
}

/**
 * hreflang map for one logical path, including the `x-default` fallback that
 * points at the English root URL.
 */
export function alternatesFor(path: string): Record<string, string> {
  const out: Record<string, string> = {};
  // Only published languages are advertised. A hreflang pointing at a page
  // that does not exist yet is worse than no hreflang at all.
  for (const locale of PUBLISHED_LOCALES) out[LOCALE_TAGS[locale]] = localePath(locale, path);
  out['x-default'] = localePath(DEFAULT_LOCALE, path);
  return out;
}

/** Swap the current language of a path for another one, keeping the page. */
export function switchLocalePath(pathname: string, next: Locale): string {
  return localePath(next, stripLocale(pathname));
}

/**
 * Paths that must never be rewritten into the locale tree.
 *
 * Static assets, the API route, and the machine-facing endpoints (robots,
 * sitemap, llms.txt) have to stay exactly where crawlers expect them.
 */
const UNREWRITTEN_EXACT = new Set([
  '/robots.txt',
  '/sitemap.xml',
  '/llms.txt',
  '/llms-full.txt',
  '/icon',
  '/opengraph-image',
  '/favicon.ico',
]);

export function shouldRewrite(pathname: string): boolean {
  if (UNREWRITTEN_EXACT.has(pathname)) return false;
  if (pathname.startsWith('/_next/')) return false;
  if (pathname.startsWith('/api/')) return false;
  // Any path that looks like a file (has an extension) is an asset.
  if (/\.[a-z0-9]{2,5}$/i.test(pathname)) return false;
  // Already carries a language prefix.
  if (localeFromPath(pathname)) return false;
  return true;
}