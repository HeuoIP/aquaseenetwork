import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { GuideMarkdown } from '@/components/seo/GuideMarkdown';
import { JsonLd } from '@/components/site/JsonLd';
import { climbingGuide as guide, climbingAssets as assets, climbingRelease, isClimbingGuidePublished } from '@/content/seo/climbing-guide';
import { guideHeadings, guideParts } from '@/lib/guide-markdown';
import { SITE_ORIGIN } from '@/lib/metadata';
import { breadcrumbLd } from '@/lib/jsonld';

export const dynamicParams = false;
export function generateStaticParams() { return [{ locale: 'en' }]; }
const url = `${SITE_ORIGIN}${guide.path}`;

export async function generateMetadata({ params }: PageProps<'/[locale]/buying-guides/playground-climbing-nets'>): Promise<Metadata> {
  if ((await params).locale !== 'en') notFound();
  return {
    metadataBase: new URL(SITE_ORIGIN),
    title: { absolute: guide.seoTitle }, description: guide.metaDescription,
    authors: [], keywords: [],
    alternates: { canonical: url, languages: isClimbingGuidePublished() ? { en: url, 'x-default': url } : {} },
    robots: { index: isClimbingGuidePublished(), follow: true },
    openGraph: { type: 'article', publishedTime: climbingRelease.publishedAt, url, title: guide.seoTitle, description: guide.metaDescription,
      images: [{ url: `${SITE_ORIGIN}${assets.cover.src}`, width: assets.cover.width, height: assets.cover.height, alt: assets.cover.alt }] },
    twitter: { card: 'summary_large_image', title: guide.seoTitle, description: guide.metaDescription, images: [`${SITE_ORIGIN}${assets.cover.src}`] },
  };
}

export default async function ClimbingGuidePage({ params }: PageProps<'/[locale]/buying-guides/playground-climbing-nets'>) {
  if ((await params).locale !== 'en') notFound();
  const { introduction, sections } = guideParts(guide.bodyMarkdown);
  const headings = guideHeadings(sections).filter((h) => h.level === 2);
  const parts = sections.split(/(?=^## )/m).filter(Boolean);
  const graph = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'WebPage', '@id': `${url}#webpage`, url, name: guide.title, description: guide.metaDescription, inLanguage: 'en', breadcrumb: { '@id': `${url}#breadcrumb` }, mainEntity: { '@id': `${url}#article` } },
    { '@type': 'Article', '@id': `${url}#article`, headline: guide.title, description: guide.metaDescription, mainEntityOfPage: { '@id': `${url}#webpage` }, inLanguage: 'en', image: `${SITE_ORIGIN}${assets.cover.src}`, publisher: { '@type': 'Organization', name: 'AQUASEE', url: SITE_ORIGIN }, citation: guide.citations, datePublished: climbingRelease.publishedAt, dateModified: climbingRelease.publishedAt },
    { ...breadcrumbLd([{ name: 'Home', url: SITE_ORIGIN }, { name: 'Buying Guides', url: `${SITE_ORIGIN}/buying-guides` }, { name: guide.title, url }]), '@id': `${url}#breadcrumb` },
  ] };
  return <>
    <section className="bg-ink pt-[4.5rem] text-paper"><div className="shell py-14 sm:py-20 lg:py-24">
      <nav aria-label="Breadcrumb" className="flex flex-wrap gap-x-2 gap-y-1 text-sm text-on-dark"><Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/buying-guides">Buying Guides</Link><span aria-hidden="true">/</span><span aria-current="page" className="text-paper">Climbing nets, misting and shade</span></nav>
      <p className="mt-12 font-mono text-xs uppercase tracking-[0.2em] text-aqua">Cool Playgrounds / Procurement Guide</p>
      <h1 className="mt-5 max-w-5xl font-display text-[clamp(2.7rem,5.5vw,5rem)] leading-[1.05] text-on-dark-strong">{guide.title}</h1>
      <div className="mt-8 max-w-3xl [&_p]:mb-5 [&_p]:text-lg [&_p]:leading-[1.75] [&_p]:text-on-dark [&_strong]:text-on-dark-strong"><GuideMarkdown markdown={introduction} /></div>
      <p className="mt-6 font-mono text-xs uppercase tracking-[0.12em] text-aqua"><time dateTime={climbingRelease.publishedAt}>Published {new Date(climbingRelease.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Shanghai' })}</time></p>
    </div></section>
    <GuideFigure asset={assets.cover} cover />
    <section className="bg-paper py-12 sm:py-16 lg:py-20"><div className="shell grid gap-12 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-16">
      <aside className="lg:order-last"><nav aria-label="On this page" className="lg:sticky lg:top-24"><p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">On this page</p><ol className="mt-4 space-y-2 text-sm">{headings.map((h) => <li key={h.id}><a className="block py-1 text-body hover:text-accent" href={`#${h.id}`}>{h.title}</a></li>)}</ol><Link href="/inquiry/business" className="mt-8 inline-block rounded-full bg-ink px-5 py-3 text-sm font-medium text-paper">Discuss your site brief →</Link></nav></aside>
      <article className="min-w-0 max-w-[48rem]" aria-label={guide.title}>{parts.map((part) => <div key={part.split('\n')[0]}>
        <GuideMarkdown markdown={part} />
        {part.startsWith('## Where should shade fall') && <GuideFigure asset={assets.rdStudy} />}
        {part.startsWith('## Where should misting sit') && <GuideFigure asset={assets.zones} />}
        {part.startsWith('## How should the quote separate') && <GuideFigure asset={assets.responsibilities} />}
      </div>)}</article>
    </div></section>
    <JsonLd data={graph} />
  </>;
}

type GuideAsset = { src: string; width: number; height: number; alt: string; caption: string; disclosure: string; textEquivalent: string };
function GuideFigure({ asset, cover = false }: { asset: GuideAsset; cover?: boolean }) {
  return <figure className={cover ? 'bg-sand' : 'my-12 border border-line bg-sand p-3 sm:p-4'}><div className={cover ? 'shell py-8 sm:py-10' : ''}>
    <Image src={asset.src} alt={asset.alt} width={asset.width} height={asset.height} priority={cover} sizes={cover ? '(min-width: 1280px) 1180px, 100vw' : '(min-width: 1024px) 768px, 100vw'} className="h-auto w-full" />
    <figcaption className="mt-3 text-sm leading-relaxed text-body"><strong className="block text-ink">{asset.disclosure}</strong>{asset.caption}
      {!cover && <><p className="mt-3">{asset.textEquivalent}</p><a href={asset.src} target="_blank" rel="noopener noreferrer" className="mt-2 block text-accent underline underline-offset-4">Open full-size image</a></>}
    </figcaption>
  </div></figure>;
}
