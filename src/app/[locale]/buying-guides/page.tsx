import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { buyingGuides, guidePublishedAt, isBuyingGuidePublished } from '@/content/seo/buying-guides';
import { costGuide, costGuideAssets, costGuidePublishedAt, isCostGuidePublished } from '@/content/seo/cost-guide';
import { ImageDisclosure } from '@/components/ui/ImageDisclosure';
import { SITE_ORIGIN } from '@/lib/metadata';

const path = '/buying-guides';
const url = `${SITE_ORIGIN}${path}`;

export function generateStaticParams() { return [{ locale: 'en' }]; }

export async function generateMetadata({ params }: PageProps<'/[locale]/buying-guides'>): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== 'en') notFound();
  const published = buyingGuides.some(isBuyingGuidePublished);
  return {
    metadataBase: new URL(SITE_ORIGIN),
    title: { absolute: 'Buying Guides | AQUASEE' },
    description: 'Practical AQUASEE buying guides for choosing a residential pool slide and understanding its complete project cost.',
    alternates: { canonical: url, languages: published ? { en: url, 'x-default': url } : {} },
    robots: { index: published, follow: true },
    openGraph: { type: 'website', url, title: 'Buying Guides | AQUASEE', description: 'Practical guides for design-led pool and water-play decisions.', images: [{ url: `${SITE_ORIGIN}${buyingGuides[0].cover.src}`, width: 1672, height: 941, alt: buyingGuides[0].cover.alt }] },
  };
}

export default async function BuyingGuidesPage({ params }: PageProps<'/[locale]/buying-guides'>) {
  const { locale } = await params;
  if (locale !== 'en') notFound();
  const anyPublished = buyingGuides.some(isBuyingGuidePublished);
  const visibleGuides = [
    ...(anyPublished ? buyingGuides.filter(isBuyingGuidePublished) : buyingGuides),
    ...(isCostGuidePublished() ? [{ id: 'pool-slide-cost-v21', topic: 'Pool Slides', kind: 'Buying Guide', guide: costGuide, cover: costGuideAssets.cover }] as const : []),
  ];
  const topics = [...new Set(visibleGuides.map((article) => article.topic))];
  return <>
    <section className="bg-ink pt-[4.5rem] text-paper"><div className="shell py-16 sm:py-20 lg:py-24">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-aqua">Insights / Buying Guides</p>
      <h1 className="mt-6 max-w-4xl font-display text-[clamp(3rem,6vw,5.5rem)] leading-[1.02] text-on-dark-strong">Better questions before you choose.</h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-on-dark">Explore evidence-led buying guides for pools and water-play spaces. Each guide separates design ideas from the model and site documents needed for a decision.</p>
    </div></section>
    <section className="bg-paper py-16 sm:py-20 lg:py-24"><div className="shell space-y-16">
      {topics.map((topic) => <div key={topic}>
      <div className="mb-9 flex flex-wrap items-end justify-between gap-4 border-b border-line pb-6">
        <div><p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{topic}</p><h2 className="mt-3 text-title">Buying Guides</h2></div>
        {!anyPublished && <p className="max-w-md text-sm leading-relaxed text-body">This guide is in editorial review. More topics will appear only after their content is approved.</p>}
      </div>
      <div className="grid max-w-4xl gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        {visibleGuides.filter((article) => article.topic === topic).map((article) => {
          const publishedAt = article.id === 'pool-slide-cost-v21' ? costGuidePublishedAt() : guidePublishedAt(article);
          return <article key={article.id} className="group overflow-hidden border border-line bg-paper">
            <Link href={article.guide.path} className="block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
              <div className="relative aspect-[16/9] overflow-hidden bg-sand"><Image src={article.cover.src} alt={article.cover.alt} width={1672} height={941} sizes="(min-width: 768px) 50vw, 100vw" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" /><ImageDisclosure className="absolute bottom-3 left-3">AI concept visualization</ImageDisclosure></div>
              <div className="p-6 sm:p-8">
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">{article.topic} / {article.kind}</p>
                <h3 className="mt-4 font-display text-3xl leading-tight text-ink">{article.guide.title}</h3>
                <p className="mt-4 text-base leading-relaxed text-body">{article.guide.metaDescription}</p>
                <p className="mt-6 text-sm text-muted">{publishedAt ? <time dateTime={publishedAt}>Published {new Date(publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })}</time> : 'Publication pending · Editorial preview'}</p>
                <span className="mt-5 inline-block font-medium text-accent underline underline-offset-4">Read the guide →</span>
              </div>
            </Link>
          </article>;
        })}
      </div>
      </div>)}
    </div></section>
  </>;
}
