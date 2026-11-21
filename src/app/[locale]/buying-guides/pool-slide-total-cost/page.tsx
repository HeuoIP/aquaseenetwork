import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { GuideMarkdown } from '@/components/seo/GuideMarkdown';
import { JsonLd } from '@/components/site/JsonLd';
import { ImageDisclosure } from '@/components/ui/ImageDisclosure';
import { costGuide, costGuideAssets, costGuidePublishedAt, isCostGuidePublished } from '@/content/seo/cost-guide';
import { guideHeadings, guideParts } from '@/lib/guide-markdown';
import { breadcrumbLd } from '@/lib/jsonld';
import { SITE_ORIGIN } from '@/lib/metadata';

export const dynamicParams = false;
export function generateStaticParams() { return [{ locale: 'en' }]; }

const url = `${SITE_ORIGIN}${costGuide.path}`;

export async function generateMetadata({ params }: PageProps<'/[locale]/buying-guides/pool-slide-total-cost'>): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== 'en') notFound();
  const published = isCostGuidePublished();
  const publishedAt = costGuidePublishedAt();
  return {
    metadataBase: new URL(SITE_ORIGIN),
    title: { absolute: costGuide.seoTitle },
    description: costGuide.metaDescription,
    alternates: { canonical: url, languages: published ? { en: url, 'x-default': url } : {} },
    robots: { index: published, follow: true },
    openGraph: {
      type: 'article', url, title: costGuide.seoTitle, description: costGuide.metaDescription,
      images: [{ url: `${SITE_ORIGIN}${costGuideAssets.cover.src}`, width: costGuideAssets.cover.width, height: costGuideAssets.cover.height, alt: costGuideAssets.cover.alt }],
      ...(publishedAt ? { publishedTime: publishedAt } : {}),
    },
    twitter: { card: 'summary_large_image', title: costGuide.seoTitle, description: costGuide.metaDescription, images: [`${SITE_ORIGIN}${costGuideAssets.cover.src}`] },
  };
}

export default async function PoolSlideCostPage({ params }: PageProps<'/[locale]/buying-guides/pool-slide-total-cost'>) {
  const { locale } = await params;
  if (locale !== 'en') notFound();
  const { introduction, sections } = guideParts(costGuide.bodyMarkdown);
  const parts = splitCostSections(sections);
  const headings = guideHeadings(sections);
  const publishedAt = costGuidePublishedAt();
  const articleLd = {
    '@context': 'https://schema.org', '@type': 'Article', '@id': `${url}#article`,
    headline: costGuide.title, description: costGuide.metaDescription, mainEntityOfPage: url,
    inLanguage: 'en', image: `${SITE_ORIGIN}${costGuideAssets.cover.src}`,
    publisher: { '@type': 'Organization', name: 'AQUASEE', url: SITE_ORIGIN },
    ...(publishedAt ? { datePublished: publishedAt, dateModified: publishedAt } : {}),
  };
  return <>
    <section className="bg-ink pt-[4.5rem] text-paper"><div className="shell py-14 sm:py-20 lg:py-24">
      <nav aria-label="Breadcrumb" className="flex flex-wrap gap-x-2 gap-y-1 text-sm text-on-dark"><Link href="/" className="hover:text-paper">Home</Link><span aria-hidden="true">/</span><Link href="/buying-guides" className="hover:text-paper">Buying Guides</Link><span aria-hidden="true">/</span><span aria-current="page" className="text-paper">{costGuide.title}</span></nav>
      <p className="mt-12 font-mono text-xs uppercase tracking-[0.2em] text-aqua">Pool Slides / Buying Guide</p>
      <h1 className="mt-5 max-w-5xl font-display text-[clamp(2.8rem,6vw,5.25rem)] leading-[1.05] text-on-dark-strong">{costGuide.title}</h1>
      <div className="mt-8 max-w-3xl [&_p]:mb-5 [&_p]:text-lg [&_p]:leading-[1.75] [&_p]:text-on-dark [&_strong]:text-on-dark-strong"><GuideMarkdown markdown={introduction} /></div>
      <p className="mt-6 font-mono text-xs uppercase tracking-[0.12em] text-aqua">{publishedAt ? <time dateTime={publishedAt}>Published {new Date(publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })}</time> : 'Editorial preview · Publication pending'}</p>
    </div></section>
    <figure className="bg-sand"><div className="shell py-8 sm:py-10"><div className="relative overflow-hidden bg-ink"><Image src={costGuideAssets.cover.src} alt={costGuideAssets.cover.alt} width={costGuideAssets.cover.width} height={costGuideAssets.cover.height} sizes="(min-width: 1280px) 1180px, 100vw" priority className="h-auto w-full" /><ImageDisclosure className="absolute bottom-4 left-4">AI concept visualization — not a product photograph</ImageDisclosure></div><figcaption className="mt-3 max-w-3xl text-sm leading-relaxed text-body">{costGuideAssets.cover.caption}</figcaption></div></figure>
    <section className="bg-paper py-12 sm:py-16 lg:py-20"><div className="shell grid gap-12 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-16">
      <aside className="lg:order-last"><nav aria-label="On this page" className="lg:sticky lg:top-24"><details className="rounded-sm border border-line bg-sand p-5 lg:hidden"><summary className="cursor-pointer font-medium text-ink">On this page</summary><CostToc headings={headings} /></details><div className="hidden border-l border-line pl-6 lg:block"><p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">On this page</p><CostToc headings={headings} /></div></nav></aside>
      <article className="min-w-0 max-w-[48rem]" aria-label={costGuide.title}>
        <GuideMarkdown markdown={parts.prices} />
        <GuideMarkdown markdown={parts.factors} />
        <CostFigure asset={costGuideAssets.design} />
        <CostFigure asset={costGuideAssets.material} />
        <GuideMarkdown markdown={parts.hiddenCosts} />
        <CostFigure asset={costGuideAssets.cost} />
        <GuideMarkdown markdown={parts.newVsExisting} />
        <CostFigure asset={costGuideAssets.site} />
        <GuideMarkdown markdown={parts.remainder} />
      </article>
    </div></section>
    <JsonLd data={articleLd} /><JsonLd data={breadcrumbLd([
      { name: 'Home', url: SITE_ORIGIN },
      { name: 'Buying Guides', url: `${SITE_ORIGIN}/buying-guides` },
      { name: costGuide.title, url },
    ])} />
  </>;
}

function CostFigure({ asset }: { asset: (typeof costGuideAssets)[keyof typeof costGuideAssets] }) {
  return <figure className="my-12 border border-line bg-sand p-3 sm:p-4">
    <div className="relative overflow-hidden"><Image src={asset.src} alt={asset.alt} width={asset.width} height={asset.height} sizes="(min-width: 1024px) 768px, 100vw" unoptimized={asset.src.endsWith('.svg')} className="h-auto w-full" />{asset.ai && <ImageDisclosure className="absolute bottom-3 left-3">AI concept visualization</ImageDisclosure>}</div>
    <figcaption className="px-2 pb-2 pt-5 text-sm leading-relaxed text-body">{asset.caption}</figcaption>
  </figure>;
}

function CostToc({ headings }: { headings: ReturnType<typeof guideHeadings> }) {
  return <ol className="mt-4 space-y-2 text-sm leading-relaxed">{headings.map((item) => <li key={item.id} className={item.level === 3 ? 'ml-4' : ''}><a href={`#${item.id}`} className="block rounded-sm py-1 text-body hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">{item.title}</a></li>)}</ol>;
}

function splitCostSections(markdown: string) {
  const anchors = [
    '## What determines the price of a pool slide?',
    '## The costs beyond the slide',
    '## New pool versus existing pool installation',
    '## Three illustrative supplier examples for budget planning',
  ];
  const positions = anchors.map((anchor) => markdown.indexOf(anchor));
  if (positions.some((position) => position < 0) || positions.some((position, index) => index > 0 && position <= positions[index - 1])) {
    throw new Error('SEO-02 visual anchors are missing or out of order.');
  }
  return {
    prices: markdown.slice(0, positions[0]),
    factors: markdown.slice(positions[0], positions[1]),
    hiddenCosts: markdown.slice(positions[1], positions[2]),
    newVsExisting: markdown.slice(positions[2], positions[3]),
    remainder: markdown.slice(positions[3]),
  };
}
