'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LOCALE_NAMES,
  PUBLISHED_LOCALES,
  localeFromPath,
  stripLocale,
  switchLocalePath,
  type Locale,
} from '@/lib/locale';
import type { UiStrings } from '@/content/types';

/**
 * The languages that actually publish a given page.
 *
 * Every standing page exists in every published language, so the whole list
 * is offered. A path that only some languages publish — the insight library,
 * while a language has not published it yet — is offered only to the
 * languages that have it. A link to a page that does not exist is a broken
 * link, and a broken link in the language switcher is the one that both a
 * crawler and a reader hit.
 *
 * The availability map is prepared on the server by `localeAvailability()`,
 * which reads the same rule as the hreflang map and the sitemap.
 */
export function localesForPath(
  path: string,
  active: string,
  availability: Record<string, string[]>,
): Locale[] {
  if (!path.startsWith('/insights')) return [...PUBLISHED_LOCALES];
  const published = availability[path] ?? [];
  const list = published.includes(active) ? published : [active, ...published];
  return list.filter((locale): locale is Locale =>
    (PUBLISHED_LOCALES as readonly string[]).includes(locale),
  );
}

/**
 * Language switcher.
 *
 * It keeps the reader on the same page and only swaps the language prefix, so
 * switching never lands on the homepage. Written for the client because the
 * current pathname is only known in the browser.
 */
export function LanguageSwitcher({
  current,
  ui,
  availability,
}: {
  current?: string;
  ui: UiStrings;
  /** Which language publishes which path, prepared on the server. */
  availability: Record<string, string[]>;
}) {
  const pathname = usePathname() || '/';
  const active = localeFromPath(pathname) ?? current ?? 'en';
  const locales = localesForPath(stripLocale(pathname), active, availability);

  if (PUBLISHED_LOCALES.length < 2) return null;

  return (
    <div className="flex items-center gap-1" role="group" aria-label={ui.global.language}>
      {locales.map((locale: Locale) => {
        const isActive = locale === active;
        return (
          <Link
            key={locale}
            href={switchLocalePath(pathname, locale)}
            hrefLang={locale}
            lang={locale}
            aria-current={isActive ? 'true' : undefined}
            className={[
              'whitespace-nowrap rounded-full px-2.5 py-1 text-[0.6875rem] font-medium transition-colors duration-300',
              isActive
                ? 'bg-accent-tint text-accent'
                : 'text-muted hover:text-ink',
            ].join(' ')}
          >
            {LOCALE_NAMES[locale]}
          </Link>
        );
      })}
    </div>
  );
}