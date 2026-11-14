import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProductCollection } from '@/components/product/ProductCollection';
import { ProductDetail } from '@/components/product/ProductDetail';
import { SpaceIndex } from '@/components/product/SpaceIndex';
import { catalogUi, categoryCopy, productCatalog, productTranslation, productsByCategory, publishedCategories, publishedProducts, publishedScenes } from '@/content/products';
import { getDictionary } from '@/lib/dictionary';
import { isLocale, PUBLISHED_LOCALES, type Locale } from '@/lib/locale';
import { pageMetadata } from '@/lib/metadata';

export const dynamicParams = false;

export async function generateStaticParams() {
  const params: { locale: Locale; slug: string }[] = [];
  for (const locale of PUBLISHED_LOCALES) {
    if (!(await getDictionary(locale)).products) continue;
    params.push(...publishedCategories(locale).map((category) => ({ locale, slug: category.slug })));
    if (publishedScenes(locale).length) params.push({ locale, slug: 'by-space' });
    params.push(...publishedProducts(productCatalog, locale).map((product) => ({ locale, slug: product.slug })));
  }
  return params;
}

async function resolve(locale: string, slug: string) {
  if (!isLocale(locale) || !(await getDictionary(locale)).products) notFound();
  if (slug === 'by-space') {
    const scenes = publishedScenes(locale);
    if (!scenes.length) notFound();
    return { kind: 'space-index', locale, scenes } as const;
  }
  const category = publishedCategories(locale).find((item) => item.slug === slug);
  if (category) return { kind: 'category', locale, category, products: productsByCategory(category.slug, locale) } as const;
  const product = publishedProducts(productCatalog, locale).find((item) => item.slug === slug);
  const copy = product && productTranslation(product, locale);
  if (!product || !copy) notFound();
  return { kind: 'product', locale, product, copy } as const;
}

export async function generateMetadata({ params }: PageProps<'/[locale]/products/[slug]'>): Promise<Metadata> {
  const { locale, slug } = await params;
  const result = await resolve(locale, slug);
  const ui = catalogUi(result.locale)!;
  return result.kind === 'space-index'
    ? pageMetadata({ locale: result.locale, path: '/products/by-space', title: ui.bySpace, description: ui.browseBySpaceDescription })
    : result.kind === 'category'
    ? pageMetadata({ locale: result.locale, path: `/products/${slug}`, title: categoryCopy(result.category, result.locale)!.name, description: categoryCopy(result.category, result.locale)!.summary })
    : pageMetadata({ locale: result.locale, path: `/products/${slug}`, title: result.copy.name, description: result.copy.summary });
}

export default async function ProductOrCategoryPage({ params }: PageProps<'/[locale]/products/[slug]'>) {
  const { locale, slug } = await params;
  const result = await resolve(locale, slug);
  if (result.kind === 'space-index') return <SpaceIndex locale={result.locale} scenes={result.scenes} />;
  if (result.kind === 'category') {
    const copy = categoryCopy(result.category, result.locale)!;
    return <ProductCollection locale={result.locale} path={`/products/${slug}`} title={copy.name} description={copy.summary} products={result.products} />;
  }
  const category = productCatalog.categories.find((item) => item.slug === result.product.category)!;
  const scenes = productCatalog.scenes.filter((scene) => result.product.scenes.includes(scene.slug));
  const related = publishedProducts(productCatalog, result.locale)
    .filter((item) => item.id !== result.product.id && (item.category === result.product.category || item.scenes.some((scene) => result.product.scenes.includes(scene))))
    .slice(0, 3);
  return <ProductDetail product={result.product} copy={result.copy} category={category} scenes={scenes} related={related} locale={result.locale} />;
}
