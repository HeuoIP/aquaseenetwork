import Image from 'next/image';
import Link from 'next/link';
import { ImageDisclosure } from '@/components/ui/ImageDisclosure';
import { JsonLd } from '@/components/site/JsonLd';
import { ProductCard } from '@/components/product/ProductCard';
import type { ProductCategoryDefinition, ProductRecord, ProductScene, ProductTranslation } from '@/content/types';
import { catalogUi, categoryCopy, sceneCopy, visibleProductSpecs } from '@/content/products';
import { breadcrumbLd, productLd } from '@/lib/jsonld';
import { localePath, type Locale } from '@/lib/locale';
import { SITE_ORIGIN } from '@/lib/metadata';

export function ProductDetail({
  product, copy, category, scenes, related, locale,
}: {
  product: ProductRecord;
  copy: ProductTranslation;
  category: ProductCategoryDefinition;
  scenes: ProductScene[];
  related: ProductRecord[];
  locale: Locale;
}) {
  const image = product.image!;
  const ui = catalogUi(locale)!;
  const categoryName = categoryCopy(category, locale)!.name;
  const confirmedSpecs = visibleProductSpecs(product, locale);
  const url = `${SITE_ORIGIN}${localePath(locale, `/products/${product.slug}`)}`;
  return (
    <>
      <section className="bg-ink pb-20 pt-32 text-paper sm:pt-40">
        <div className="shell">
          <Link href={localePath(locale, `/products/${category.slug}`)} className="text-sm text-aqua underline-offset-4 hover:underline">← {categoryName}</Link>
          <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.8rem,6vw,5.5rem)] leading-tight text-on-dark-strong">{copy.name}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-on-dark">{copy.summary}</p>
        </div>
      </section>
      <section className="bg-paper py-16 sm:py-24">
        <div className="shell grid gap-10 lg:grid-cols-2 lg:items-start">
          <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-sand">
            <Image src={image.src} alt={copy.imageAlt ?? image.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" priority />
            {image.kind === 'illustration' ? <ImageDisclosure className="absolute bottom-4 left-4">{ui.conceptVisualisation}</ImageDisclosure> : null}
          </div>
          <div>
            <h2 className="font-display text-3xl text-ink">{ui.aboutProduct}</h2>
            <p className="mt-5 text-base leading-relaxed text-body">{copy.description}</p>
            <h2 className="mt-10 font-display text-2xl text-ink">{ui.suitableSpaces}</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {scenes.map((scene) => (
                <li key={scene.slug}><Link href={localePath(locale, `/products/by-space/${scene.slug}`)} className="inline-block rounded-full border border-line px-4 py-2 text-sm text-accent hover:border-accent">{sceneCopy(scene, locale)!.name}</Link></li>
              ))}
            </ul>
            {confirmedSpecs.length ? (
              <>
                <h2 className="mt-10 font-display text-2xl text-ink">{ui.confirmedSpecifications}</h2>
                <dl className="mt-4 divide-y divide-line border-y border-line">
                  {confirmedSpecs.map((spec) => <div key={spec.label} className="grid gap-2 py-3 sm:grid-cols-2"><dt className="text-sm font-medium text-ink">{spec.label}</dt><dd className="text-sm text-body">{spec.value}</dd></div>)}
                </dl>
              </>
            ) : null}
            <p className="mt-9 text-sm leading-relaxed text-muted">{ui.suitabilityNote}</p>
            <Link href={localePath(locale, '/contact')} className="mt-6 inline-flex min-h-11 items-center rounded-full bg-accent px-6 text-sm font-medium text-white hover:bg-ink">{ui.startEnquiry}</Link>
          </div>
        </div>
      </section>
      {related.length ? (
        <section className="bg-sand py-16 sm:py-24">
          <div className="shell">
            <h2 className="font-display text-3xl text-ink">{ui.relatedProducts}</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {related.map((item) => <ProductCard key={item.id} product={item} locale={locale} />)}
            </div>
          </div>
        </section>
      ) : null}
      <JsonLd data={productLd(product, locale)} />
      <JsonLd data={breadcrumbLd([
        { name: ui.products, url: `${SITE_ORIGIN}${localePath(locale, '/products')}` },
        { name: categoryName, url: `${SITE_ORIGIN}${localePath(locale, `/products/${category.slug}`)}` },
        { name: copy.name, url },
      ])} />
    </>
  );
}
