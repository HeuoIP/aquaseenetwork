'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LOCALE_NAMES,
  PUBLISHED_LOCALES,
  localeFromPath,
  switchLocalePath,
  type Locale,
} from '@/lib/locale';

/**
 * Language switcher.
 *
 * It keeps the reader on the same page and only swaps the language prefix, so
 * switching never lands on the homepage. Written for the client because the
 * current pathname is only known in the browser.
 */
export function LanguageSwitcher({ current }: { current?: string } = {}) {
  const pathname = usePathname() || '/';
  const active = localeFromPath(pathname) ?? current ?? 'en';

  if (PUBLISHED_LOCALES.length < 2) return null;

  return (
    <div className="flex items-center gap-1" role="group" aria-label="Language">
      {PUBLISHED_LOCALES.map((locale: Locale) => {
        const isActive = locale === active;
        return (
          <Link
            key={locale}
            href={switchLocalePath(pathname, locale)}
            hrefLang={locale}
            lang={locale}
            aria-current={isActive ? 'true' : undefined}
            className={[
              'rounded-full px-2.5 py-1 text-[0.6875rem] font-medium transition-colors duration-300',
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