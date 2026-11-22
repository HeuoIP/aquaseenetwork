import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { GuideMarkdown } from '@/components/seo/GuideMarkdown';
import { JsonLd } from '@/components/site/JsonLd';
import { ImageDisclosure } from '@/components/ui/ImageDisclosure';
import { splashGuide, splashGuideCover, splashGuideRelease, isSplashGuidePublished } from '@/content/seo/splash-guide';
import { guideHeadings, guideParts } from '@/lib/guide-markdown';
import { breadcrumbLd } from '@/lib/jsonld';
import { SITE_ORIGIN } from '@/lib/metadata';

export const dynamicParams = false;
export function generateStaticParams() { return [{ locale: 'en' }]; }
const url = `${SITE_ORIGIN}${splashGuide.path}`;

export async function generateMetadata({ params }: PageProps<'/[locale]/buying-guides/splash-pad-features-small-resorts'>): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== 'en') notFound();
  const published = isSplashGuidePublished();
  return {
    metadataBase: new URL(SITE_ORIGIN),
    title: { absolute: splashGuide.seoTitle },
    description: splashGuide.metaDescription,
    alternates: { canonical: url, languages: published ? { en: url, 'x-default': url } : {} },
    robots: { index: published, follow: true },
    openGraph: { type: 'article', url, title: splashGuide.seoTitle, description: splashGuide.metaDescription,
      images: [{ url: `${SITE_ORIGIN}${splashGuideCover.src}`, width: splashGuideCover.width, height: splashGuideCover.height, alt: splashGuideCover.alt }],
      ...(published ? { publishedTime: splashGuideRelease.publishedAt } : {}) },
    twitter: { card: 'summary_large_image', title: splashGuide.seoTitle, description: splashGuide.metaDescription, images: [`${SITE_ORIGIN}${splashGuideCover.src}`] },
  };
}

export default async function SplashGuidePage({ params }: PageProps<'/[locale]/buying-guides/splash-pad-features-small-resorts'>) {
  const { locale } = await params;
  if (locale !== 'en') notFound();
  const { introduction, sections } = guideParts(splashGuide.bodyMarkdown);
  const headings = guideHeadings(sections);
  const published = isSplashGuidePublished();
  const articleLd = { '@context': 'https://schema.org', '@type': 'Article', '@id': `${url}#article`,
    headline: splashGuide.title, description: splashGuide.metaDescription, mainEntityOfPage: url, inLanguage: 'en',
    image: `${SITE_ORIGIN}${splashGuideCover.src}`,
    publisher: { '@type': 'Organization', name: 'AQUASEE', url: SITE_ORIGIN },
    ...(published ? { datePublished: splashGuideRelease.publishedAt, dateModified: splashGuideRelease.publishedAt } : {}) };
  return <>
    <section className="bg-ink pt-[4.5rem] text-paper"><div className="shell py-14 sm:py-20 lg:py-24">
      <nav aria-label="Breadcrumb" className="flex flex-wrap gap-x-2 gap-y-1 text-sm text-on-dark"><Link href="/">Home</Link><span>/</span><Link href="/buying-guides">Buying Guides</Link><span>/</span><span aria-current="page" className="text-paper">{splashGuide.title}</span></nav>
      <p className="mt-12 font-mono text-xs uppercase tracking-[0.2em] text-aqua">Splash Play / Buying Guide</p>
      <h1 className="mt-5 max-w-5xl font-display text-[clamp(2.7rem,5.5vw,5rem)] leading-[1.05] text-on-dark-strong">{splashGuide.title}</h1>
      <div className="mt-8 max-w-3xl [&_p]:mb-5 [&_p]:text-lg [&_p]:leading-[1.75] [&_p]:text-on-dark [&_strong]:text-on-dark-strong"><GuideMarkdown markdown={introduction} /></div>
      <p className="mt-6 font-mono text-xs uppercase tracking-[0.12em] text-aqua"><time dateTime={splashGuideRelease.publishedAt}>Published 22 Nov 2026</time></p>
    </div></section>
    <figure className="bg-sand"><div className="shell py-8 sm:py-10"><div className="relative overflow-hidden bg-ink"><Image src={splashGuideCover.src} alt={splashGuideCover.alt} width={splashGuideCover.width} height={splashGuideCover.height} priority sizes="(min-width: 1280px) 1180px, 100vw" className="h-auto w-full" /><ImageDisclosure className="absolute bottom-4 left-4">AI concept visualization — not a project photograph</ImageDisclosure></div><figcaption className="mt-3 max-w-3xl text-sm text-body">{splashGuideCover.caption}</figcaption></div></figure>
    <section className="bg-paper py-12 sm:py-16 lg:py-20"><div className="shell grid gap-12 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-16">
      <aside className="lg:order-last"><nav aria-label="On this page" className="lg:sticky lg:top-24"><p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">On this page</p><ol className="mt-4 space-y-2 text-sm">{headings.filter((h) => h.level === 2).map((h) => <li key={h.id}><a className="block py-1 text-body hover:text-accent" href={`#${h.id}`}>{h.title}</a></li>)}</ol></nav></aside>
      <article className="min-w-0 max-w-[48rem]" aria-label={splashGuide.title}><GuideMarkdown markdown={sections} /></article>
    </div></section>
    <JsonLd data={articleLd} /><JsonLd data={breadcrumbLd([{ name: 'Home', url: SITE_ORIGIN }, { name: 'Buying Guides', url: `${SITE_ORIGIN}/buying-guides` }, { name: splashGuide.title, url }])} />
  </>;
}
