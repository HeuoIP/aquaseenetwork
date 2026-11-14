import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { productCategories } from '@/content/products';
import { pageMetadata } from '@/lib/metadata';
import { ImageDisclosure } from '@/components/ui/ImageDisclosure';

const sceneStudies = [
  {
    title: 'Micro water-play setting',
    src: '/images/concepts/mj82-micro-park-scene-v1.webp',
    alt: 'AI concept study of a compact resort water-play setting with sculptural splash forms and a metal slide.',
    note: 'A broader site view for discussing a compact play setting. The elements are exploratory and do not represent a completed or engineered project.',
    href: '/collections/compact-water-parks',
  },
  {
    title: 'Outdoor play shade',
    src: '/images/concepts/mj82-play-shade-scene-v1.webp',
    alt: 'AI concept study of children playing beneath a large arrangement of warm-toned tensile fabric sails.',
    note: 'Explores how fabric shade can define a children’s play space. Coverage, anchoring and wind performance have not been checked.',
    href: '/collections/pool-shade',
  },
  {
    title: 'Sculptural splash play',
    src: '/images/concepts/splash-metal-scene-v1.webp',
    alt: 'AI concept study of children playing among metal water arches and rain curtains in an outdoor splash area.',
    note: 'Metal arches and rain curtains create a shared play setting. The forms, water flow and installation are still exploratory.',
    href: '/collections/splash-play-facilities',
  },
  {
    title: 'Metal pool slide',
    src: '/images/concepts/mj82-metal-slide-scene-v1.webp',
    alt: 'AI concept study of a curved metal slide leading into a pool in a landscaped setting.',
    note: 'Explores metal form and landscape integration. The depicted structure, access and landing area require separate engineering review.',
    href: '/collections/pool-slides',
  },
] as const;

export function generateStaticParams() { return [{ locale: 'en' }]; }

export async function generateMetadata({ params }: PageProps<'/[locale]/concept-collection'>): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== 'en') return { robots: { index: false } };
  return pageMetadata({ locale: 'en', path: '/concept-collection', title: 'Concept Collection | AQUASEE', description: 'Explore AQUASEE water-play visual directions. These concepts are unengineered, unverified and unavailable for purchase.' });
}
export default async function ConceptCollection({ params }: PageProps<'/[locale]/concept-collection'>) {
  const { locale } = await params;
  if (locale !== 'en') notFound();
  return <>
    <section className="bg-ink pt-[4.5rem] text-paper"><div className="shell py-16 lg:py-24">
      <p className="eyebrow text-aqua">AQUASEE / Design exploration</p>
      <h1 className="mt-6 max-w-4xl font-display text-[clamp(3rem,6vw,6rem)] leading-[1.03] text-on-dark-strong">Concept Collection</h1>
      <p className="mt-7 max-w-2xl text-lg leading-relaxed text-on-dark">Visual studies for smaller water-led spaces. These images express directions for discussion, not finished products or completed client projects.</p>
      <div className="mt-9 max-w-3xl border-l-2 border-aqua bg-white/5 p-6 text-sm leading-relaxed text-on-dark-strong">
        <strong>Concept status:</strong> AI-assisted visualisations. Not manufactured or engineering verified. Safety, dimensions, materials, local compliance, supply and installation have not been confirmed. These concepts cannot be ordered.
      </div>
    </div></section>
    <section className="bg-paper py-16 lg:py-24"><div className="shell grid gap-10 md:grid-cols-2">
      {productCategories.map((item) => <article key={item.slug} className="border border-line bg-paper">
        <div className="relative aspect-[16/10] bg-sand"><Image src={item.image.src} alt={item.image.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" /><ImageDisclosure className="absolute bottom-3 left-3">AI concept visualisation</ImageDisclosure></div>
        <div className="p-7"><p className="eyebrow text-accent">Visual direction / {item.role === 'first-release' ? 'initial focus' : 'exploration'}</p>
          <h2 className="mt-3 font-display text-3xl">{item.name}</h2><p className="mt-4 text-body">{item.summary}</p>
          <p className="mt-4 text-sm text-muted">Design study only. No model, specification or supply claim is made by this image.</p>
          <Link className="mt-5 inline-block text-accent underline underline-offset-4" href={`/collections/${item.slug}`}>Read category guide →</Link>
        </div>
      </article>)}
    </div></section>
    <section className="bg-sand py-16 lg:py-24"><div className="shell">
      <p className="eyebrow text-accent">Further visual exploration</p>
      <h2 className="mt-4 max-w-3xl text-title">Other ways these spaces could feel.</h2>
      <p className="mt-5 max-w-3xl leading-relaxed text-body">These additional AI studies explore setting, material and play from different viewpoints. They are not product photographs, construction proposals or evidence of completed work.</p>
      <div className="mt-12 grid gap-10 md:grid-cols-2">
        {sceneStudies.map((study) => <article key={study.src} className="border border-line bg-paper">
          <div className="relative aspect-[16/10] overflow-hidden bg-ink">
            <Image src={study.src} alt={study.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
            <ImageDisclosure className="absolute bottom-3 left-3">AI concept visualisation</ImageDisclosure>
          </div>
          <div className="p-7">
            <h3 className="font-display text-3xl text-ink">{study.title}</h3>
            <p className="mt-4 text-body">{study.note}</p>
            <Link className="mt-5 inline-block text-accent underline underline-offset-4" href={study.href}>Read category guide →</Link>
          </div>
        </article>)}
      </div>
    </div></section>
  </>;
}
