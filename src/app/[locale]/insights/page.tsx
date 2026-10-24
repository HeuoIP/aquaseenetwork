import type { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd } from '@/components/site/JsonLd';
import { ActionLink } from '@/components/ui/Action';
import { Reveal } from '@/components/ui/Reveal';
import { getDictionary } from '@/lib/dictionary';
import { itemListLd } from '@/lib/jsonld';
import { localePath, type Locale } from '@/lib/locale';
import { pageMetadata } from '@/lib/metadata';

export async function generateMetadata({ params }: PageProps<'/[locale]/insights'>): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  return pageMetadata({
    locale: locale as never,
    path: '/insights',
    title: 'Insights',
    description:
      'Decision guides, specification notes and cost explainers for tourism, public-space and children’s play projects — written for the questions buyers ask before they choose a supplier.',
  });
}

export default async function InsightsIndexPage({ params }: PageProps<'/[locale]/insights'>) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const articles = dict.insights ?? [];
  const href = (path: string) => localePath(locale as Locale, path);

  return (
    <>
      <section className="bg-ink pt-[4.5rem] text-paper">
        <div className="shell">
          <div className="grid gap-10 py-16 sm:py-20 lg:grid-cols-12 lg:items-end lg:py-24">
            <div className="lg:col-span-7">
              <p className="hero-enter hero-enter-1 flex items-center gap-3 font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-aqua">
                <span aria-hidden="true" className="h-px w-10 bg-aqua/70" />
                Insights
              </p>
              <h1 className="hero-enter hero-enter-2 mt-7 font-display text-[length:var(--text-cap)] font-normal leading-[1.03] tracking-[-0.025em] text-on-dark-strong">
                The questions buyers ask, answered properly.
              </h1>
              <p className="hero-enter hero-enter-3 mt-7 max-w-xl text-[1.0625rem] leading-relaxed text-on-dark sm:text-lg">
                Guides on scoping, specification, cost, quality control and delivery — written for the
                decisions that come before choosing a supplier, and updated as standards change.
              </p>
            </div>
          </div>
        </div>
      </section>

      {articles.length === 0 ? (
        <section className="bg-paper py-20">
          <div className="shell">
            <p className="text-[1.0625rem] leading-relaxed text-body">
              The insight library is being written. The questions it will answer are already
              published on the FAQ page.
            </p>
            <ActionLink href="/faq" className="mt-8">
              Read the FAQ
            </ActionLink>
          </div>
        </section>
      ) : (
        <section className="bg-paper py-16 sm:py-20 lg:py-24">
          <div className="shell">
            <ol className="grid gap-px overflow-hidden rounded-sm border border-line bg-line lg:grid-cols-2">
              {articles.map((article, i) => (
                <li key={article.slug} className="bg-paper">
                  <Reveal delay={i * 60}>
                    <Link
                      href={href(`/insights/${article.slug}`)}
                      className="group flex h-full flex-col p-7 transition-colors duration-500 hover:bg-accent-tint lg:p-8"
                    >
                      <span className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-accent">
                        {article.pillar.replace('-', ' ')} · {article.vertical.replace('-', ' ')}
                      </span>
                      <h2 className="mt-4 text-[1.25rem] leading-snug text-ink">{article.title}</h2>
                      <p className="mt-3 text-[0.9375rem] leading-relaxed text-body">{article.excerpt}</p>
                      <span className="mt-auto pt-6 text-[0.8125rem] text-muted">
                        {article.readingMinutes} min read · updated {article.updatedAt}
                      </span>
                    </Link>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {articles.length > 0 ? (
        <JsonLd
          data={itemListLd(
            articles.map((article) => ({
              name: article.title,
              url: `${dict.site.url}${href(`/insights/${article.slug}`)}`,
            })),
            'Insights',
          )}
        />
      ) : null}
    </>
  );
}