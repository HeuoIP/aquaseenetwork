import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { JsonLd } from '@/components/site/JsonLd';
import { ActionLink } from '@/components/ui/Action';
import { getDictionary } from '@/lib/dictionary';
import { articleLd, breadcrumbLd } from '@/lib/jsonld';
import { localePath, PUBLISHED_LOCALES, type Locale } from '@/lib/locale';
import { pageMetadata } from '@/lib/metadata';

/** Only the languages that actually publish the library get static pages. */
export async function generateStaticParams() {
  const entries: { locale: string; slug: string }[] = [];
  for (const locale of PUBLISHED_LOCALES) {
    const dict = await getDictionary(locale);
    for (const article of dict.insights ?? []) {
      entries.push({ locale, slug: article.slug });
    }
  }
  return entries;
}

export async function generateMetadata({ params }: PageProps<'/[locale]/insights/[slug]'>): Promise<Metadata> {
  const { locale, slug } = await params;
  const dict = await getDictionary(locale);
  const article = dict.insights?.find((item) => item.slug === slug);
  if (!article) {
    return pageMetadata({
      locale: locale as Locale,
      path: '/insights',
      title: 'Insights',
      description: 'Guides on scoping, specification, cost and delivery.',
    });
  }
  return pageMetadata({
    locale: locale as Locale,
    path: `/insights/${article.slug}`,
    title: article.title,
    description: article.excerpt,
    type: 'article',
  });
}

export default async function InsightArticlePage({ params }: PageProps<'/[locale]/insights/[slug]'>) {
  const { locale, slug } = await params;
  const dict = await getDictionary(locale);
  const articles = dict.insights ?? [];
  const article = articles.find((item) => item.slug === slug);
  if (!article) notFound();

  const href = (path: string) => localePath(locale as Locale, path);
  const related = article.related
    .map((relatedSlug) => articles.find((item) => item.slug === relatedSlug))
    .filter((item): item is (typeof articles)[number] => Boolean(item))
    .map((item) => ({ slug: item.slug, title: item.title }));

  return (
    <>
      <section className="bg-ink pt-[4.5rem] text-paper">
        <div className="shell">
          <div className="grid gap-10 py-16 sm:py-20 lg:grid-cols-12 lg:items-end lg:py-24">
            <div className="lg:col-span-8">
              <p className="hero-enter hero-enter-1 flex items-center gap-3 font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-aqua">
                <span aria-hidden="true" className="h-px w-10 bg-aqua/70" />
                {article.pillar.replace('-', ' ')} · {article.vertical.replace('-', ' ')}
              </p>
              <h1 className="hero-enter hero-enter-2 mt-7 font-display text-[length:var(--text-cap)] font-normal leading-[1.03] tracking-[-0.025em] text-on-dark-strong">
                {article.title}
              </h1>
              <p className="hero-enter hero-enter-3 mt-7 max-w-2xl text-[1.0625rem] leading-relaxed text-on-dark sm:text-lg">
                {article.excerpt}
              </p>
              <p className="hero-enter hero-enter-4 mt-6 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-on-dark/60">
                {article.readingMinutes} min read · updated {article.updatedAt}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper py-16 sm:py-20 lg:py-24">
        <div className="shell">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-8">
              <div className="space-y-14">
                {article.sections.map((section) => (
                  <section key={section.id} id={section.id} className="scroll-mt-24">
                    <h2 className="text-title">{section.heading}</h2>
                    <div className="mt-6 space-y-5 text-[1.0625rem] leading-[1.75] text-body">
                      {section.body.map((paragraph) => (
                        <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                      ))}
                    </div>

                    {section.list ? (
                      <ul className="mt-6 space-y-3">
                        {section.list.map((item) => (
                          <li key={item} className="flex gap-3 text-[1rem] leading-relaxed text-ink">
                            <span
                              aria-hidden="true"
                              className="mt-[0.6rem] h-1 w-1 shrink-0 rounded-full bg-accent"
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    ) : null}

                    {section.table ? (
                      <div className="mt-8 overflow-x-auto">
                        <table className="w-full min-w-[36rem] border-collapse text-left text-[0.875rem] leading-relaxed">
                          <caption className="mb-4 text-left font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted">
                            {section.table.caption}
                          </caption>
                          <thead>
                            <tr className="border-y border-line">
                              {section.table.headers.map((header) => (
                                <th
                                  key={header}
                                  scope="col"
                                  className="py-3 pr-6 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-muted"
                                >
                                  {header}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {section.table.rows.map((row) => (
                              <tr key={row[0]} className="border-b border-line align-top">
                                <th scope="row" className="py-4 pr-6 font-medium text-ink">
                                  {row[0]}
                                </th>
                                {row.slice(1).map((cell, i) => (
                                  <td key={i} className="py-4 pr-6 text-body">
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : null}

                    {section.callout ? (
                      <p className="mt-8 border-l-2 border-accent pl-5 text-[1rem] leading-[1.75] text-ink">
                        {section.callout}
                      </p>
                    ) : null}
                  </section>
                ))}
              </div>

              {article.sources.length > 0 ? (
                <section className="mt-16 border-t border-line pt-10">
                  <h2 className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-accent">
                    Sources
                  </h2>
                  <ul className="mt-5 space-y-3">
                    {article.sources.map((source) => (
                      <li key={source.url} className="text-[0.875rem] leading-relaxed text-body">
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="text-ink underline underline-offset-4 transition-colors hover:text-accent"
                        >
                          {source.label}
                        </a>
                        <span className="text-muted"> — consulted {source.accessed}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}
            </div>

            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-accent">
                  Key points
                </p>
                <ul className="mt-5 space-y-3">
                  {article.keyTakeaways.map((takeaway) => (
                    <li key={takeaway} className="flex gap-3 text-[0.9375rem] leading-relaxed text-ink">
                      <span
                        aria-hidden="true"
                        className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-accent"
                      />
                      {takeaway}
                    </li>
                  ))}
                </ul>

                {related.length > 0 ? (
                  <>
                    <p className="mt-10 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-accent">
                      Related reading
                    </p>
                    <ul className="mt-4">
                      {related.map((item) => (
                        <li key={item.slug} className="border-b border-line">
                          <Link
                            href={href(`/insights/${item.slug}`)}
                            className="block py-3.5 text-[0.9375rem] leading-snug text-ink transition-colors hover:text-accent"
                          >
                            {item.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : null}

                <ActionLink href="/contact" className="mt-10">
                  Discuss your project
                </ActionLink>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <JsonLd data={articleLd(article, locale as Locale)} />
      <JsonLd
        data={breadcrumbLd([
          { name: 'Home', url: `${dict.site.url}${href('/')}` },
          { name: 'Insights', url: `${dict.site.url}${href('/insights')}` },
          { name: article.title, url: `${dict.site.url}${href(`/insights/${article.slug}`)}` },
        ])}
      />
    </>
  );
}