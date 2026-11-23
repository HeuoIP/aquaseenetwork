import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { GuideMarkdown } from '@/components/seo/GuideMarkdown';
import { JsonLd } from '@/components/site/JsonLd';
import { ImageDisclosure } from '@/components/ui/ImageDisclosure';
import { shadeGuide, shadeGuideAssets, shadeGuideRelease, isShadeGuidePublished } from '@/content/seo/shade-guide';
import { guideHeadings, guideParts } from '@/lib/guide-markdown';
import { SITE_ORIGIN } from '@/lib/metadata';
import { breadcrumbLd } from '@/lib/jsonld';

export const dynamicParams = false;
export function generateStaticParams() { return [{ locale: 'en' }]; }
const url = `${SITE_ORIGIN}${shadeGuide.path}`;

export async function generateMetadata({ params }: PageProps<'/[locale]/buying-guides/pool-shade-installation'>): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== 'en') notFound();
  const published = isShadeGuidePublished();
  const cover = shadeGuideAssets.cover;
  return {
    metadataBase: new URL(SITE_ORIGIN), title: { absolute: shadeGuide.seoTitle }, description: shadeGuide.metaDescription,
    alternates: { canonical: url, languages: published ? { en: url, 'x-default': url } : {} },
    robots: { index: published, follow: true },
    openGraph: { type: 'article', url, title: shadeGuide.seoTitle, description: shadeGuide.metaDescription,
      images: [{ url: `${SITE_ORIGIN}${cover.src}`, width: cover.width, height: cover.height, alt: cover.alt }],
      ...(published ? { publishedTime: shadeGuideRelease.publishedAt } : {}) },
    twitter: { card: 'summary_large_image', title: shadeGuide.seoTitle, description: shadeGuide.metaDescription,
      images: [`${SITE_ORIGIN}${cover.src}`] },
  };
}

export default async function ShadeGuidePage({ params }: PageProps<'/[locale]/buying-guides/pool-shade-installation'>) {
  const { locale } = await params;
  if (locale !== 'en') notFound();
  const { introduction, sections } = guideParts(shadeGuide.bodyMarkdown);
  const headings = guideHeadings(sections);
  const published = isShadeGuidePublished();
  const parts = sections.split(/(?=^## )/m).filter(Boolean);
  const breadcrumb = [{ name: 'Home', url: SITE_ORIGIN }, { name: 'Buying Guides', url: `${SITE_ORIGIN}/buying-guides` }, { name: shadeGuide.title, url }];
  const graph = {
    '@context': 'https://schema.org', '@graph': [
      { '@type': 'WebPage', '@id': `${url}#webpage`, url, name: shadeGuide.title, description: shadeGuide.metaDescription,
        inLanguage: 'en', breadcrumb: { '@id': `${url}#breadcrumb` }, mainEntity: { '@id': `${url}#article` } },
      { '@type': 'Article', '@id': `${url}#article`, headline: shadeGuide.title, description: shadeGuide.metaDescription,
        mainEntityOfPage: { '@id': `${url}#webpage` }, inLanguage: 'en', image: `${SITE_ORIGIN}${shadeGuideAssets.cover.src}`,
        publisher: { '@type': 'Organization', name: 'AQUASEE', url: SITE_ORIGIN }, citation: shadeGuide.citations,
        ...(published ? { datePublished: shadeGuideRelease.publishedAt, dateModified: shadeGuideRelease.publishedAt } : {}) },
      { ...breadcrumbLd(breadcrumb), '@id': `${url}#breadcrumb` },
    ],
  };
  return <>
    <section className="bg-ink pt-[4.5rem] text-paper"><div className="shell py-14 sm:py-20 lg:py-24">
      <nav aria-label="Breadcrumb" className="flex flex-wrap gap-x-2 gap-y-1 text-sm text-on-dark"><Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/buying-guides">Buying Guides</Link><span aria-hidden="true">/</span><span aria-current="page" className="text-paper">{shadeGuide.title}</span></nav>
      <p className="mt-12 font-mono text-xs uppercase tracking-[0.2em] text-aqua">Pool Shade / Buying Guide</p>
      <h1 className="mt-5 max-w-5xl font-display text-[clamp(2.7rem,5.5vw,5rem)] leading-[1.05] text-on-dark-strong">{shadeGuide.title}</h1>
      <div className="mt-8 max-w-3xl [&_p]:mb-5 [&_p]:text-lg [&_p]:leading-[1.75] [&_p]:text-on-dark"><GuideMarkdown markdown={introduction} /></div>
      <p className="mt-6 font-mono text-xs uppercase tracking-[0.12em] text-aqua">{published ? <time dateTime={shadeGuideRelease.publishedAt}>Published {new Date(shadeGuideRelease.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Asia/Shanghai' })}</time> : 'Editorial preview · Publication pending'}</p>
    </div></section>
    <ShadeFigure asset={shadeGuideAssets.cover} cover />
    <section className="bg-paper py-12 sm:py-16 lg:py-20"><div className="shell grid gap-12 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-16">
      <aside className="lg:order-last"><nav aria-label="On this page" className="lg:sticky lg:top-24"><p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">On this page</p><ol className="mt-4 space-y-2 text-sm">{headings.filter((heading) => heading.level === 2).map((heading) => <li key={heading.id}><a className="block py-1 text-body hover:text-accent" href={`#${heading.id}`}>{heading.title}</a></li>)}</ol></nav></aside>
      <article className="min-w-0 max-w-[48rem]" aria-label={shadeGuide.title}>{parts.map((part) => <div key={part.split('\n')[0]}>
        <GuideMarkdown markdown={part} />
        {part.startsWith('## Where should the shade fall,') && <ShadeFigure asset={shadeGuideAssets.zones} />}
        {part.startsWith('## Can existing walls or posts') && <ShadeFigure asset={shadeGuideAssets.inputs} />}
      </div>)}</article>
    </div></section>
    <JsonLd data={graph} />
  </>;
}

type ShadeAsset = { src: string; alt: string; width: number; height: number; caption: string; disclosure: string };
function ShadeFigure({ asset, cover = false }: { asset: ShadeAsset; cover?: boolean }) {
  return <figure className={cover ? 'bg-sand' : 'my-12 border border-line bg-sand p-3 sm:p-4'}><div className={cover ? 'shell py-8 sm:py-10' : ''}>
    <div className="relative overflow-hidden"><Image src={asset.src} alt={asset.alt} width={asset.width} height={asset.height} priority={cover} sizes={cover ? '(min-width: 1280px) 1180px, 100vw' : '(min-width: 1024px) 768px, 100vw'} className="h-auto w-full" />
      {cover && <ImageDisclosure className="absolute bottom-4 left-4">{asset.disclosure}</ImageDisclosure>}
    </div>
    <figcaption className="mt-3 max-w-3xl text-sm leading-relaxed text-body">{!cover && <strong className="block text-ink">{asset.disclosure}</strong>}{asset.caption}{!cover && <a href={asset.src} target="_blank" rel="noopener noreferrer" className="mt-2 block text-accent underline underline-offset-4">Open full-size diagram</a>}</figcaption>
  </div></figure>;
}
