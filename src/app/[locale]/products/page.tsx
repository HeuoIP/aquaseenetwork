import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ProductCard } from '@/components/product/ProductCard';
import { JsonLd } from '@/components/site/JsonLd';
import { ActionLink } from '@/components/ui/Action';
import { ImageDisclosure } from '@/components/ui/ImageDisclosure';
import { Reveal } from '@/components/ui/Reveal';
import { pageMetadata } from '@/lib/metadata';
import { catalogUi, categoryCopy, productCatalog, publishedCategories, publishedProducts, publishedScenes, sceneCopy } from '@/content/products';
import { collectionPageLd } from '@/lib/jsonld';
import { isLocale, localePath, PUBLISHED_LOCALES } from '@/lib/locale';
import { getDictionary } from '@/lib/dictionary';

export const dynamicParams = false;

export async function generateStaticParams() {
  const locales = [];
  for (const locale of PUBLISHED_LOCALES) {
    if ((await getDictionary(locale)).products && catalogUi(locale)) locales.push({ locale });
  }
  return locales;
}

export async function generateMetadata({ params }: PageProps<'/[locale]/products'>): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale) || !(await getDictionary(locale)).products || !catalogUi(locale)) notFound();
  const ui = catalogUi(locale)!;
  return pageMetadata({
    locale,
    path: '/products',
    title: ui.products,
    description: ui.landingIntro,
  });
}

export default async function ProductsPage({ params }: PageProps<'/[locale]/products'>) {
  const { locale } = await params;
  if (!isLocale(locale) || !(await getDictionary(locale)).products || !catalogUi(locale)) notFound();
  const ui = catalogUi(locale)!;
  const categories = publishedCategories(locale);
  const scenes = publishedScenes(locale);
  const products = publishedProducts(productCatalog, locale);
  return (
    <>
      <section className="relative isolate overflow-hidden bg-ink py-32 text-paper sm:py-40">
        <div className="shell relative z-10">
          <Reveal>
            <p className="eyebrow text-aqua">{ui.products}</p>
            <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.8rem,7vw,6.5rem)] leading-[0.96] tracking-[-0.035em] text-on-dark-strong">
              {ui.landingTitle}
            </h1>
            <p className="mt-8 max-w-2xl text-[1.08rem] leading-relaxed text-on-dark">
              {ui.landingIntro}
            </p>
          </Reveal>
        </div>
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_75%_35%,rgba(47,138,129,0.35),transparent_42%),linear-gradient(120deg,#0c1013_20%,#10262b_100%)]" />
      </section>

      <section className="bg-paper py-20 sm:py-24 lg:py-32">
        <div className="shell">
          <Reveal>
            <div className="flex flex-col gap-6 border-b border-line pb-10 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="eyebrow text-accent">{ui.byType}</p>
                <h2 className="mt-5 text-title">{ui.categoryStructure}</h2>
              </div>
              <p className="max-w-md text-[0.9375rem] leading-relaxed text-body">
                {ui.publicationNote}
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {productCatalog.categories.filter((category) => categoryCopy(category, locale)).map((category, index) => (
              <Reveal key={category.slug} delay={index * 70}>
                <article className="flex h-full flex-col rounded-sm border border-line bg-sand p-7 lg:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <p className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-accent">
                      {category.role === 'first-release' ? ui.firstReleaseFocus : ui.secondLayer}
                    </p>
                    <span className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-muted">{String(index + 1).padStart(2, '0')}</span>
                  </div>
                  <div className="relative mt-6 aspect-[16/9] overflow-hidden bg-ink">
                    <Image src={category.image.src} alt={category.image.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
                    <ImageDisclosure className="absolute bottom-2.5 left-2.5">AI concept visualisation</ImageDisclosure>
                  </div>
                  <h3 className="mt-6 font-display text-[1.9rem] leading-tight text-ink">{categoryCopy(category, locale)!.name}</h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-body">{categoryCopy(category, locale)!.summary}</p>
                  <p className="mt-6 border-t border-line pt-5 text-[0.8125rem] leading-relaxed text-muted">{categoryCopy(category, locale)!.scopeNote}</p>
                  <Link href={localePath(locale, `/collections/${category.slug}`)} className="mt-6 inline-block text-sm font-medium text-accent underline-offset-4 hover:underline">Explore category guide →</Link>
                  {categories.some((item) => item.slug === category.slug) ? (
                    <Link href={localePath(locale, `/products/${category.slug}`)} className="mt-6 inline-block text-sm font-medium text-accent underline-offset-4 hover:underline">{ui.viewPublishedProducts} →</Link>
                  ) : null}
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-sand py-20 sm:py-24 lg:py-32">
        <div className="shell">
          <Reveal>
            <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-5">
                <p className="eyebrow text-accent">{ui.bySpace}</p>
                <h2 className="mt-5 text-title">{ui.startWithSpace}</h2>
              </div>
              <div className="lg:col-span-7">
                <div className="grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2">
                  {productCatalog.scenes.filter((scene) => sceneCopy(scene, locale)).map((scene) => (
                    <div key={scene.slug} className="bg-paper p-5">
                      <h3 className="font-display text-[1.2rem] text-ink">{sceneCopy(scene, locale)!.name}</h3>
                      <p className="mt-2 text-[0.8125rem] leading-relaxed text-body">{sceneCopy(scene, locale)!.summary}</p>
                      {scenes.some((item) => item.slug === scene.slug) ? (
                        <Link href={localePath(locale, `/products/by-space/${scene.slug}`)} className="mt-3 inline-block text-sm font-medium text-accent underline-offset-4 hover:underline">{ui.viewPublishedProducts} →</Link>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {products.length ? (
        <section className="bg-paper py-20 sm:py-24"><div className="shell">
          <h2 className="font-display text-3xl text-ink">{ui.publishedProducts}</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => <ProductCard key={product.id} product={product} locale={locale} />)}
          </div>
          {scenes.length ? <Link href={localePath(locale, '/products/by-space')} className="mt-8 inline-block text-sm font-medium text-accent underline-offset-4 hover:underline">{ui.bySpace} →</Link> : null}
        </div></section>
      ) : null}

      <section className="bg-accent-tint py-20 sm:py-24">
        <div className="shell">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <p className="eyebrow text-accent">{ui.releaseStatus}</p>
              <h2 className="mt-5 text-display">{ui.releaseStatusTitle}</h2>
              <p className="mt-5 max-w-2xl text-lede leading-relaxed text-body">
                {ui.releaseStatusBody}
              </p>
            </div>
            <div className="lg:col-span-5 lg:flex lg:justify-end">
              <ActionLink href="/contact" size="lg">{ui.startEnquiry}</ActionLink>
            </div>
          </div>
        </div>
      </section>
      {products.length ? <JsonLd data={collectionPageLd(ui.products, ui.landingIntro, locale, '/products')} /> : null}
    </>
  );
}
