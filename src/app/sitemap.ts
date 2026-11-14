import type { MetadataRoute } from 'next';
import { getDictionary } from '@/lib/dictionary';
import { PUBLISHED_LOCALES, localePath, type Locale } from '@/lib/locale';
import { languageAlternates, pathExistsIn } from '@/lib/metadata';
import { catalogUi, productCatalog, productsByCategory, productsByScene, publishedCategories, publishedProducts, publishedScenes } from '@/content/products';
import { canIndexProductCatalog } from '@/content/catalog-index';

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
const SITE_UPDATED = '2026-11-14';

const STATIC_ROUTES = [
  { path: '/', priority: 1, changeFrequency: 'weekly' as const },
  { path: '/collections/pool-slides', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/collections/pool-shade', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/collections/compact-water-parks', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/collections/splash-play-facilities', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/concept-collection', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/about', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/contact', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/inquiry/business', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/inquiry/personal', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/dealer-program', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/installation-partners', priority: 0.7, changeFrequency: 'monthly' as const },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = 'https://www.aquasee.art';
  const entries: MetadataRoute.Sitemap = [];
  const catalogIndexable = canIndexProductCatalog();

  for (const locale of PUBLISHED_LOCALES) {
    if (locale !== 'en') continue;
    const dict = await getDictionary(locale);

    for (const route of STATIC_ROUTES) {
      // A route this language does not publish — the insight library, until
      // it is translated — is not listed. The same rule decides the hreflang
      // alternates and the index directive on the page itself.
      if (!pathExistsIn(dict, route.path)) continue;
      entries.push({
        url: `${base}${localePath(locale as Locale, route.path)}`,
        lastModified: new Date(SITE_UPDATED),
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: { languages: toAbsolute(await languageAlternates(route.path)) },
      });
    }

    if (catalogIndexable && pathExistsIn(dict, '/products')) {
      entries.push({
        url: `${base}${localePath(locale, '/products')}`,
        lastModified: new Date(SITE_UPDATED),
        changeFrequency: 'weekly',
        priority: 1,
        alternates: { languages: toAbsolute(await languageAlternates('/products')) },
      });
    }

    if (catalogIndexable && dict.products && catalogUi(locale)) {
      const productRoutes = [
        ...publishedCategories(locale).map((category) => ({
          path: `/products/${category.slug}`,
          products: productsByCategory(category.slug, locale),
        })),
        ...publishedScenes(locale).map((scene) => ({
          path: `/products/by-space/${scene.slug}`,
          products: productsByScene(scene.slug, locale),
        })),
        ...publishedProducts(productCatalog, locale).map((product) => ({
          path: `/products/${product.slug}`,
          products: [product],
        })),
      ];
      if (publishedScenes(locale).length) {
        productRoutes.push({ path: '/products/by-space', products: publishedProducts(productCatalog, locale) });
      }
      for (const route of productRoutes) {
        entries.push({
          url: `${base}${localePath(locale, route.path)}`,
          lastModified: new Date(route.products.map((item) => item.updatedAt!).sort().at(-1)!),
          changeFrequency: 'monthly',
          priority: 0.8,
          alternates: { languages: toAbsolute(await languageAlternates(route.path)) },
        });
      }
    }

  }

  return entries;
}

function toAbsolute(map: Record<string, string>): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [tag, path] of Object.entries(map)) out[tag] = `https://www.aquasee.art${path}`;
  return out;
}
