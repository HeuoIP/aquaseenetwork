import type { Metadata } from 'next';
import { Contours } from '@/components/art/Contours';
import { JsonLd } from '@/components/site/JsonLd';
import { ActionLink } from '@/components/ui/Action';
import { DefinitionList } from '@/components/ui/DefinitionList';
import { Reveal } from '@/components/ui/Reveal';
import { getDictionary } from '@/lib/dictionary';
import { pageMetadata } from '@/lib/metadata';

export async function generateMetadata({ params }: PageProps<'/[locale]/about'>): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  return pageMetadata({
    locale: locale as never,
    path: '/about',
    title: 'About AQUASEE',
    description: dict.about.definition,
  });
}

export default async function AboutPage({ params }: PageProps<'/[locale]/about'>) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const { about } = dict;
  const ui = dict.ui;

  return (
    <>
      {/* ---- Hero ---------------------------------------------------------- */}
      <section className="relative isolate overflow-hidden bg-ink pt-[4.5rem] text-paper">
        <Contours className="pointer-events-none absolute inset-y-0 right-0 hidden h-full w-[58%] lg:block" />

        <div className="shell relative">
          <div className="grid gap-10 py-16 sm:py-20 lg:grid-cols-12 lg:items-end lg:py-24">
            <div className="lg:col-span-7">
              <p className="hero-enter hero-enter-1 flex items-center gap-3 font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-aqua">
                <span aria-hidden="true" className="h-px w-10 bg-aqua/70" />
                {about.eyebrow}
              </p>

              <h1 className="hero-enter hero-enter-2 mt-7 font-display text-[length:var(--text-cap)] font-normal leading-[1.03] tracking-[-0.025em] text-on-dark-strong">
                {about.title}
              </h1>

              <p className="hero-enter hero-enter-3 mt-7 max-w-xl text-[1.0625rem] leading-relaxed text-on-dark sm:text-lg">
                {about.lede}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Definition ---------------------------------------------------- */}
      <section className="bg-paper py-16 sm:py-20 lg:py-24">
        <div className="shell">
          <Reveal>
            <p className="eyebrow text-accent">{ui.about.whatIs}</p>
            <p className="mt-6 max-w-4xl text-[1.375rem] leading-[1.55] tracking-[-0.01em] text-ink">
              {about.definition}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---- Facts --------------------------------------------------------- */}
      <section className="bg-paper pb-16 sm:pb-20 lg:pb-24">
        <div className="shell">
          <Reveal>
            <p className="eyebrow text-accent">{ui.about.facts}</p>
            <h2 className="mt-5 text-title">{ui.about.factsTitle}</h2>
          </Reveal>
          <div className="mt-10">
            <DefinitionList
              items={about.facts.map((fact) => ({ term: fact.label, definition: fact.value }))}
            />
          </div>
        </div>
      </section>

      {/* ---- Delivery models ----------------------------------------------- */}
      <section className="bg-sand py-16 sm:py-20 lg:py-24">
        <div className="shell">
          <Reveal>
            <p className="eyebrow text-accent">{ui.about.deliveryModels}</p>
            <h2 className="mt-5 max-w-3xl text-title">{ui.about.deliveryModelsTitle}</h2>
          </Reveal>

          <div className="mt-12 grid gap-px overflow-hidden rounded-sm border border-line bg-line lg:grid-cols-3">
            {about.deliveryModels.map((model, i) => (
              <Reveal key={model.name} delay={i * 80} className="bg-paper p-7 lg:p-8">
                <span className="font-mono text-[0.625rem] tracking-[0.16em] text-accent">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-4 text-[1.25rem] leading-snug text-ink">{model.name}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-body">{model.summary}</p>

                <dl className="mt-7 space-y-5 border-t border-line pt-6">
                  <div>
                    <dt className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-muted">{ui.about.yourRole}</dt>
                    <dd className="mt-2 text-[0.875rem] leading-relaxed text-ink">{model.clientRole}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-muted">{ui.about.bestFor}</dt>
                    <dd className="mt-2 text-[0.875rem] leading-relaxed text-ink">{model.bestFor}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-muted">{ui.about.tradeOff}</dt>
                    <dd className="mt-2 text-[0.875rem] leading-relaxed text-ink">{model.tradeOff}</dd>
                  </div>
                </dl>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Comparison ---------------------------------------------------- */}
      <section className="bg-paper py-16 sm:py-20 lg:py-24">
        <div className="shell">
          <Reveal>
            <p className="eyebrow text-accent">{ui.about.comparison}</p>
            <h2 className="mt-5 max-w-3xl text-title">{ui.about.comparisonTitle}</h2>
            <p className="mt-5 max-w-3xl text-[0.9375rem] leading-relaxed text-body">
              {about.comparison.intro}
            </p>
          </Reveal>

          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[54rem] border-collapse text-left text-[0.875rem] leading-relaxed">
              <caption className="sr-only">{about.comparison.intro}</caption>
              <thead>
                <tr className="border-y border-line">
                  <th scope="col" className="py-4 pr-6 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-muted">{ui.about.dimension}</th>
                  <th scope="col" className="py-4 pr-6 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-accent">
                    AQUASEE
                  </th>
                  <th scope="col" className="py-4 pr-6 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-muted">{ui.about.designStudio}</th>
                  <th scope="col" className="py-4 pr-6 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-muted">{ui.about.tradingPlatform}</th>
                  <th scope="col" className="py-4 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-muted">{ui.about.factory}</th>
                </tr>
              </thead>
              <tbody>
                {about.comparison.rows.map((row) => (
                  <tr key={row.dimension} className="border-b border-line align-top">
                    <th scope="row" className="py-5 pr-6 font-medium text-ink">
                      {row.dimension}
                    </th>
                    <td className="py-5 pr-6 text-ink">{row.aquasee}</td>
                    <td className="py-5 pr-6 text-body">{row.designStudio}</td>
                    <td className="py-5 pr-6 text-body">{row.tradingPlatform}</td>
                    <td className="py-5 text-body">{row.factory}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Reveal>
            <p className="mt-8 max-w-3xl text-[0.9375rem] leading-relaxed text-body">
              {about.comparison.note}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---- Cost drivers --------------------------------------------------- */}
      <section className="bg-sand py-16 sm:py-20 lg:py-24">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <p className="eyebrow text-accent">{ui.about.cost}</p>
              <h2 className="mt-5 text-title">{ui.about.costTitle}</h2>
              <p className="mt-5 text-[0.9375rem] leading-relaxed text-body">{ui.about.costNote}</p>
            </Reveal>
            <Reveal delay={100} className="lg:col-span-7">
              <ol className="divide-y divide-line border-y border-line">
                {about.costDrivers.map((driver, i) => (
                  <li key={driver} className="flex gap-6 py-4">
                    <span className="font-mono text-[0.75rem] tracking-[0.16em] text-accent">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[0.9375rem] leading-relaxed text-ink">{driver}</span>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---- Boundaries ----------------------------------------------------- */}
      <section className="bg-paper py-16 sm:py-20 lg:py-24">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <p className="eyebrow text-accent">{ui.about.boundaries}</p>
              <h2 className="mt-5 text-title">{ui.about.boundariesTitle}</h2>
            </Reveal>
            <Reveal delay={100} className="lg:col-span-7">
              <ul className="divide-y divide-line border-y border-line">
                {about.boundaries.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 py-4 text-[0.9375rem] leading-relaxed text-ink"
                  >
                    <span aria-hidden="true" className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-line-2" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---- Glossary ------------------------------------------------------- */}
      <section className="bg-paper pb-16 sm:pb-20 lg:pb-24">
        <div className="shell">
          <Reveal>
            <p className="eyebrow text-accent">{ui.about.glossary}</p>
            <h2 className="mt-5 max-w-3xl text-title">{ui.about.glossaryTitle}</h2>
          </Reveal>
          <div className="mt-10">
            <DefinitionList items={about.glossary} />
          </div>
        </div>
      </section>

      {/* ---- CTA ------------------------------------------------------------ */}
      <section className="bg-accent-tint py-16 sm:py-20">
        <div className="shell">
          <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-display">{ui.about.ctaTitle}</h2>
              <p className="mt-5 max-w-xl text-lede leading-relaxed text-body">
                {about.processNote}
              </p>
            </div>
            <ActionLink href="/contact" size="lg">{ui.global.startProject}</ActionLink>
          </div>
        </div>
      </section>

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          name: 'About AQUASEE',
          description: about.definition,
          url: `${dict.site.url}/about`,
          about: { '@id': `${dict.site.url}/#organization` },
        }}
      />
    </>
  );
}