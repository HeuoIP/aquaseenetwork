import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { collectionFor, collectionSlugs } from '@/content/commercial-collections';
import { pageMetadata, SITE_ORIGIN } from '@/lib/metadata';
import { ImageDisclosure } from '@/components/ui/ImageDisclosure';

type Props = PageProps<'/[locale]/collections/[slug]'>;
export function generateStaticParams() {
  return collectionSlugs.map((slug) => ({ locale: 'en', slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const item = locale === 'en' ? collectionFor(slug) : null;
  if (!item) return { robots: { index: false } };
  return pageMetadata({
    locale: 'en', path: `/collections/${slug}`,
    title: `${item.category.name} | AQUASEE`,
    description: `${item.category.summary} Explore intended settings, selection considerations and concept directions with AQUASEE.`,
  });
}
export default async function CollectionPage({ params }: Props) {
  const { locale, slug } = await params;
  const item = locale === 'en' ? collectionFor(slug) : null;
  if (!item) notFound();
  const path = `/collections/${slug}`;
  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'CollectionPage',
    name: `${item.category.name} | AQUASEE`, url: `${SITE_ORIGIN}${path}`,
    description: item.intro,
    isPartOf: { '@type': 'WebSite', name: 'AQUASEE', url: SITE_ORIGIN },
  };
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
    <section className="bg-ink pt-[4.5rem] text-paper">
      <div className="shell grid gap-10 py-14 lg:grid-cols-2 lg:items-center lg:py-24">
        <div>
          <p className="eyebrow text-aqua">{item.eyebrow} / {item.category.name}</p>
          <h1 className="mt-6 max-w-2xl font-display text-[clamp(3rem,6vw,6rem)] leading-[1.02] text-on-dark-strong">{item.headline}</h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-on-dark">{item.intro}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link className="inline-block bg-aqua px-6 py-3 font-medium text-ink" href="/inquiry/business">Discuss a project →</Link>
            <Link className="inline-block border border-white/40 px-6 py-3 text-paper" href="/inquiry/personal">For my pool</Link>
          </div>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden bg-accent">
          <Image src={item.category.image.src} alt={item.category.image.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" priority />
          <ImageDisclosure className="absolute bottom-4 left-4">AI concept visualisation — not a product photograph</ImageDisclosure>
        </div>
      </div>
    </section>
    {item.gallery.length ? <section className="bg-sand py-16 lg:py-20"><div className="shell">
      <p className="eyebrow text-accent">More views of the direction</p>
      <h2 className="mt-4 text-title">Play, form and setting together.</h2>
      <p className="mt-4 max-w-2xl text-body">These AI scene studies show possible visual directions. They do not represent engineered products or completed sites.</p>
      <div className="mt-9 grid gap-5 md:grid-cols-2">
        {item.gallery.map((study) => <figure key={study.src} className="overflow-hidden bg-paper">
          <div className="relative aspect-[16/10] overflow-hidden bg-ink">
            <Image src={study.src} alt={study.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
            <ImageDisclosure className="absolute bottom-3 left-3">AI concept visualisation</ImageDisclosure>
          </div>
          <figcaption className="p-5 text-sm leading-relaxed text-body">{study.caption}</figcaption>
        </figure>)}
      </div>
    </div></section> : null}
    <section className="bg-paper py-16 lg:py-24"><div className="shell grid gap-12 lg:grid-cols-2">
      <div><p className="eyebrow text-accent">Where it fits</p><h2 className="mt-5 text-title">Designed around the setting.</h2>
        <ul className="mt-7 space-y-4">{item.suitableFor.map((x) => <li className="border-b border-line pb-4 text-lg" key={x}>{x}</li>)}</ul></div>
      <div><p className="eyebrow text-accent">Before a recommendation</p><h2 className="mt-5 text-title">What we need to check.</h2>
        <ul className="mt-7 space-y-4">{item.considerations.map((x) => <li className="border-b border-line pb-4 text-lg" key={x}>{x}</li>)}</ul>
        <p className="mt-7 text-body">Specific models, specifications, availability, compliance and installation scope require confirmation before any offer.</p>
      </div>
    </div></section>
    <section className="bg-sand py-16"><div className="shell">
      <p className="eyebrow text-accent">Design exploration</p>
      <h2 className="mt-4 text-title">Explore the concept collection.</h2>
      <p className="mt-4 max-w-2xl text-body">Visual directions illustrate possible experiences. They are not engineered, approved or available to order.</p>
      <Link className="mt-7 inline-block font-medium text-accent underline underline-offset-4" href="/concept-collection">View concepts →</Link>
    </div></section>
  </>;
}
