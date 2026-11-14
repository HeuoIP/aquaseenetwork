import Link from 'next/link';
import { JsonLd } from '@/components/site/JsonLd';
import { ProductCard } from '@/components/product/ProductCard';
import type { ProductRecord } from '@/content/types';
import { catalogUi } from '@/content/products';
import { breadcrumbLd, collectionPageLd, itemListLd } from '@/lib/jsonld';
import { SITE_ORIGIN } from '@/lib/metadata';
import { localePath, type Locale } from '@/lib/locale';

export function ProductCollection({
  locale, path, title, description, products, parent,
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  products: ProductRecord[];
  parent?: { name: string; path: string };
}) {
  const ui = catalogUi(locale)!;
  const crumbs = [
    { name: ui.products, url: `${SITE_ORIGIN}${localePath(locale, '/products')}` },
    ...(parent ? [{ name: parent.name, url: `${SITE_ORIGIN}${localePath(locale, parent.path)}` }] : []),
    { name: title, url: `${SITE_ORIGIN}${localePath(locale, path)}` },
  ];
  return (
    <>
      <section className="bg-ink pb-20 pt-32 text-paper sm:pt-40">
        <div className="shell">
          <Link href={localePath(locale, parent?.path ?? '/products')} className="text-sm text-aqua underline-offset-4 hover:underline">← {parent?.name ?? ui.products}</Link>
          <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.8rem,6vw,5.5rem)] leading-tight text-on-dark-strong">{title}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-on-dark">{description}</p>
        </div>
      </section>
      <section className="bg-sand py-16 sm:py-24">
        <div className="shell grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => <ProductCard key={product.id} product={product} locale={locale} />)}
        </div>
      </section>
      <JsonLd data={collectionPageLd(title, description, locale, path)} />
      <JsonLd data={itemListLd(products.map((product) => ({
        name: product.translations[locale]!.name,
        url: `${SITE_ORIGIN}${localePath(locale, `/products/${product.slug}`)}`,
      })), title)} />
      <JsonLd data={breadcrumbLd(crumbs)} />
    </>
  );
}
