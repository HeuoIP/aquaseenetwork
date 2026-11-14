import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProductCollection } from '@/components/product/ProductCollection';
import { catalogUi, productCatalog, productsByScene, publishedScenes, sceneCopy } from '@/content/products';
import { getDictionary } from '@/lib/dictionary';
import { isLocale, PUBLISHED_LOCALES, type Locale } from '@/lib/locale';
import { pageMetadata } from '@/lib/metadata';

export const dynamicParams = false;

export async function generateStaticParams() {
  const params: { locale: Locale; scene: string }[] = [];
  for (const locale of PUBLISHED_LOCALES) {
    if (!(await getDictionary(locale)).products) continue;
    params.push(...publishedScenes(locale).map((scene) => ({ locale, scene: scene.slug })));
  }
  return params;
}

async function resolve(locale: string, slug: string) {
  if (!isLocale(locale) || !(await getDictionary(locale)).products) notFound();
  const scene = publishedScenes(locale).find((item) => item.slug === slug);
  if (!scene) notFound();
  return { locale, scene, products: productsByScene(scene.slug, locale, productCatalog) };
}

export async function generateMetadata({ params }: PageProps<'/[locale]/products/by-space/[scene]'>): Promise<Metadata> {
  const { locale, scene } = await params;
  const result = await resolve(locale, scene);
  const copy = sceneCopy(result.scene, result.locale)!;
  return pageMetadata({ locale: result.locale, path: `/products/by-space/${scene}`, title: copy.name, description: copy.summary });
}

export default async function ScenePage({ params }: PageProps<'/[locale]/products/by-space/[scene]'>) {
  const { locale, scene } = await params;
  const result = await resolve(locale, scene);
  const copy = sceneCopy(result.scene, result.locale)!;
  return <ProductCollection locale={result.locale} path={`/products/by-space/${scene}`} title={copy.name} description={copy.summary} products={result.products} parent={{ name: catalogUi(result.locale)!.bySpace, path: '/products/by-space' }} />;
}
