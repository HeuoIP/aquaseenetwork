import Link from 'next/link';
import { JsonLd } from '@/components/site/JsonLd';
import type { ProductScene } from '@/content/types';
import { catalogUi, sceneCopy } from '@/content/products';
import { breadcrumbLd, collectionPageLd } from '@/lib/jsonld';
import { localePath, type Locale } from '@/lib/locale';
import { SITE_ORIGIN } from '@/lib/metadata';

export function SpaceIndex({ locale, scenes }: { locale: Locale; scenes: ProductScene[] }) {
  const ui = catalogUi(locale)!;
  const path = '/products/by-space';
  return (
    <>
      <section className="bg-ink pb-20 pt-32 text-paper sm:pt-40"><div className="shell">
        <Link href={localePath(locale, '/products')} className="text-sm text-aqua hover:underline">← {ui.products}</Link>
        <h1 className="mt-6 font-display text-[clamp(2.8rem,6vw,5.5rem)] text-on-dark-strong">{ui.bySpace}</h1>
        <p className="mt-5 max-w-2xl text-lg text-on-dark">{ui.browseBySpaceDescription}</p>
      </div></section>
      <section className="bg-sand py-16 sm:py-24"><div className="shell grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {scenes.map((scene) => <Link key={scene.slug} href={localePath(locale, `/products/by-space/${scene.slug}`)} className="min-h-44 rounded-sm border border-line bg-paper p-7 hover:border-accent"><h2 className="font-display text-2xl text-ink">{sceneCopy(scene, locale)!.name}</h2><p className="mt-3 text-sm leading-relaxed text-body">{sceneCopy(scene, locale)!.summary}</p></Link>)}
      </div></section>
      <JsonLd data={collectionPageLd(ui.bySpace, ui.browseBySpaceDescription, locale, path)} />
      <JsonLd data={breadcrumbLd([
        { name: ui.products, url: `${SITE_ORIGIN}${localePath(locale, '/products')}` },
        { name: ui.bySpace, url: `${SITE_ORIGIN}${localePath(locale, path)}` },
      ])} />
    </>
  );
}
