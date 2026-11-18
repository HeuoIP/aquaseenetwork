import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { GuideMarkdown } from '@/components/seo/GuideMarkdown';
import { JsonLd } from '@/components/site/JsonLd';
import { ImageDisclosure } from '@/components/ui/ImageDisclosure';
import { buyingGuides, guideBySlug, guidePublishedAt, isBuyingGuidePublished } from '@/content/seo/buying-guides';
import { guideHeadings, guideParts } from '@/lib/guide-markdown';
import { SITE_ORIGIN } from '@/lib/metadata';
import { breadcrumbLd } from '@/lib/jsonld';

export const dynamicParams = false;
export function generateStaticParams() { return buyingGuides.map((article) => ({ locale: 'en', slug: article.slug })); }

export async function generateMetadata({ params }: PageProps<'/[locale]/buying-guides/[slug]'>): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = locale === 'en' ? guideBySlug(slug) : undefined;
  if (!article) notFound();
  const published = isBuyingGuidePublished(article);
  const url = `${SITE_ORIGIN}${article.guide.path}`;
  return {
    metadataBase: new URL(SITE_ORIGIN),
    title: { absolute: article.guide.seoTitle },
    description: article.guide.metaDescription,
    alternates: { canonical: url, languages: published ? { en: url, 'x-default': url } : {} },
    robots: { index: published, follow: true },
    openGraph: {
      type: 'article', url, title: article.guide.seoTitle, description: article.guide.metaDescription,
      images: [{ url: `${SITE_ORIGIN}${article.cover.src}`, width: 1456, height: 816, alt: article.cover.alt }],
      ...(guidePublishedAt(article) ? { publishedTime: guidePublishedAt(article)! } : {}),
    },
    twitter: { card: 'summary_large_image', title: article.guide.seoTitle, description: article.guide.metaDescription, images: [`${SITE_ORIGIN}${article.cover.src}`] },
  };
}

export default async function BuyingGuidePage({ params }: PageProps<'/[locale]/buying-guides/[slug]'>) {
  const { locale, slug } = await params;
  const article = locale === 'en' ? guideBySlug(slug) : undefined;
  if (!article) notFound();
  const { introduction, sections } = guideParts(article.guide.bodyMarkdown);
  const headings = guideHeadings(sections);
  const visualSections = splitGuideVisualSections(sections);
  const publishedAt = guidePublishedAt(article);
  const url = `${SITE_ORIGIN}${article.guide.path}`;
  const breadcrumb = [
    { name: 'Home', url: SITE_ORIGIN },
    { name: 'Buying Guides', url: `${SITE_ORIGIN}/buying-guides` },
    { name: article.guide.title, url },
  ];
  const articleLd = {
    '@context': 'https://schema.org', '@type': 'Article', '@id': `${url}#article`,
    headline: article.guide.title, description: article.guide.metaDescription, mainEntityOfPage: url,
    inLanguage: 'en', image: `${SITE_ORIGIN}${article.cover.src}`,
    publisher: { '@type': 'Organization', name: 'AQUASEE', url: SITE_ORIGIN },
    ...(publishedAt ? { datePublished: publishedAt, dateModified: publishedAt } : {}),
  };
  return <>
    <section className="bg-ink pt-[4.5rem] text-paper"><div className="shell py-14 sm:py-20 lg:py-24">
      <nav aria-label="Breadcrumb" className="flex flex-wrap gap-x-2 gap-y-1 text-sm text-on-dark"><Link href="/" className="hover:text-paper">Home</Link><span aria-hidden="true">/</span><Link href="/buying-guides" className="hover:text-paper">Buying Guides</Link><span aria-hidden="true">/</span><span aria-current="page" className="text-paper">{article.guide.title}</span></nav>
      <p className="mt-12 font-mono text-xs uppercase tracking-[0.2em] text-aqua">{article.topic} / {article.kind}</p>
      <h1 className="mt-5 max-w-5xl font-display text-[clamp(2.8rem,6vw,5.25rem)] leading-[1.05] text-on-dark-strong">{article.guide.title}</h1>
      <div className="mt-8 max-w-3xl [&_p]:mb-5 [&_p]:text-lg [&_p]:leading-[1.75] [&_p]:text-on-dark"><GuideMarkdown markdown={introduction} /></div>
      <p className="mt-6 font-mono text-xs uppercase tracking-[0.12em] text-aqua">{publishedAt ? <time dateTime={publishedAt}>Published {new Date(publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })}</time> : 'Editorial preview · Publication pending'}</p>
    </div></section>
    <figure className="bg-sand"><div className="shell py-8 sm:py-10"><div className="relative overflow-hidden bg-ink"><Image src={article.cover.src} alt={article.cover.alt} width={1456} height={816} sizes="(min-width: 1280px) 1180px, 100vw" priority className="h-auto w-full" /><ImageDisclosure className="absolute bottom-4 left-4">AI concept visualization — not a product photograph</ImageDisclosure></div><figcaption className="mt-3 max-w-3xl text-sm leading-relaxed text-body">{article.cover.caption}</figcaption></div></figure>
    <section className="bg-paper py-12 sm:py-16 lg:py-20"><div className="shell grid gap-12 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-16">
      <aside className="lg:order-last"><nav aria-label="On this page" className="lg:sticky lg:top-24">
        <details className="rounded-sm border border-line bg-sand p-5 lg:hidden"><summary className="cursor-pointer font-medium text-ink">On this page</summary><GuideToc headings={headings} /></details>
        <div className="hidden border-l border-line pl-6 lg:block"><p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">On this page</p><GuideToc headings={headings} /></div>
      </nav></aside>
      <article className="min-w-0 max-w-[48rem]" aria-label={article.guide.title}>
        <GuideMarkdown markdown={visualSections.beforeSite} />
        <GuideMarkdown markdown={visualSections.site} />
        <figure className="my-12 border border-line bg-sand p-3 sm:p-4">
          <div className="relative overflow-hidden"><Image src={article.visuals.zones.src} alt={article.visuals.zones.alt} width={1232} height={928} sizes="(min-width: 1024px) 768px, 100vw" className="h-auto w-full" />
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">{guideZoneMarkers.map((zone) => <span key={zone.number} className="absolute flex size-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-paper bg-ink font-mono text-xs font-semibold text-paper shadow-lg sm:size-9 sm:text-sm" style={{ left: zone.left, top: zone.top }}>{zone.number}</span>)}</div>
            <ImageDisclosure className="absolute bottom-3 left-3">AI concept visualization</ImageDisclosure>
          </div>
          <figcaption className="px-2 pb-2 pt-5 text-sm leading-relaxed text-body"><strong className="text-ink">Five questions around the pool:</strong>
            <ol className="mt-3 grid gap-2 sm:grid-cols-2">{guideZoneMarkers.map((zone) => <li key={zone.number} className="flex gap-3"><span className="font-mono font-semibold text-accent">{zone.number}</span><span>{zone.label}</span></li>)}</ol>
            <p className="mt-3">{article.visuals.zones.caption}</p>
          </figcaption>
        </figure>
        <GuideMarkdown markdown={visualSections.material} />
        <figure className="my-12 border border-line bg-sand p-3 sm:p-4">
          <div className="relative overflow-hidden"><Image src={article.visuals.material.src} alt={article.visuals.material.alt} width={1232} height={928} sizes="(min-width: 1024px) 768px, 100vw" className="h-auto w-full" /><ImageDisclosure className="absolute bottom-3 left-3">AI concept visualization</ImageDisclosure></div>
          <figcaption className="px-2 pb-2 pt-5 text-sm leading-relaxed text-body">{article.visuals.material.caption}</figcaption>
        </figure>
        <GuideMarkdown markdown={visualSections.afterMaterial} />
      </article>
    </div></section>
    <section className="bg-sand py-14 sm:py-16"><div className="shell max-w-5xl"><p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">Keep exploring</p><h2 className="mt-4 text-title">From design idea to a documented decision.</h2><p className="mt-4 max-w-2xl leading-relaxed text-body">The Pool Slides overview shows concept directions. A personal inquiry can start a discussion about your own pool; product availability and site suitability still require confirmation.</p><div className="mt-7 flex flex-wrap gap-4"><Link className="bg-accent px-6 py-3 font-medium text-paper hover:bg-ink" href="/collections/pool-slides">Explore Pool Slides →</Link><Link className="border border-accent px-6 py-3 font-medium text-accent hover:bg-paper" href="/inquiry/personal">Private pool inquiry →</Link></div></div></section>
    <JsonLd data={articleLd} /><JsonLd data={breadcrumbLd(breadcrumb)} />
  </>;
}

const guideZoneMarkers = [
  { number: '01', left: '20%', top: '44%', label: 'Slide footprint beside the pool' },
  { number: '02', left: '14%', top: '60%', label: 'Approach and circulation' },
  { number: '03', left: '38%', top: '48%', label: 'Water landing area to review' },
  { number: '04', left: '28%', top: '58%', label: 'Structural support to verify' },
  { number: '05', left: '82%', top: '79%', label: 'Possible water-service route to discuss' },
] as const;

function GuideToc({ headings }: { headings: ReturnType<typeof guideHeadings> }) {
  return <ol className="mt-4 space-y-2 text-sm leading-relaxed">{headings.map((item) => <li key={item.id} className={item.level === 3 ? 'ml-4' : ''}><a href={`#${item.id}`} className="block rounded-sm py-1 text-body hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">{item.title}</a></li>)}</ol>;
}

function splitGuideVisualSections(markdown: string) {
  const site = markdown.indexOf('## Measure the site before selecting a model');
  const material = markdown.indexOf('## Ask what the materials and structure actually are');
  const afterMaterial = markdown.indexOf('## Treat safety and standards as model- and site-specific');
  if (site < 0 || material <= site || afterMaterial <= material) throw new Error('Guide visual section anchors are missing or out of order.');
  return {
    beforeSite: markdown.slice(0, site),
    site: markdown.slice(site, material),
    material: markdown.slice(material, afterMaterial),
    afterMaterial: markdown.slice(afterMaterial),
  };
}
