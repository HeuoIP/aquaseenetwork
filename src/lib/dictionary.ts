import type { Dictionary } from '@/content/types';
import { DEFAULT_LOCALE, isLocale, type Locale } from '@/lib/locale';

/**
 * Content access.
 *
 * Every language is a separate module so that a page only ever loads the
 * strings for the language it renders. The dictionary is assembled once per
 * request and passed down explicitly, which keeps every component free of
 * global state and keeps the languages independent.
 */
/**
 * Only languages whose content module exists are listed here. A language is
 * added together with its content and with its entry in PUBLISHED_LOCALES, so
 * a locale can never be reachable with English content behind it.
 */
const loaders: Partial<Record<Locale, () => Promise<Dictionary>>> = {
  en: () => import('@/content/en').then((m) => m.dictionary),
  zh: () => import('@/content/zh').then((m) => m.dictionary),
  ar: () => import('@/content/ar').then((m) => m.dictionary),
};

export async function getDictionary(locale: string): Promise<Dictionary> {
  const key: Locale = isLocale(locale) ? locale : DEFAULT_LOCALE;
  const loader = loaders[key] ?? loaders[DEFAULT_LOCALE];
  return loader!();
}