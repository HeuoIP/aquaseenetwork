import type { Metadata } from 'next';
import { JsonLd } from '@/components/site/JsonLd';
import { ActionLink } from '@/components/ui/Action';
import { FaqList } from '@/components/ui/FaqList';
import { Reveal } from '@/components/ui/Reveal';
import { getDictionary } from '@/lib/dictionary';
import { faqLd } from '@/lib/jsonld';
import { pageMetadata } from '@/lib/metadata';

const PILLARS = [
  { key: 'strategy', title: 'Strategy & Consulting' },
  { key: 'creative-design', title: 'Creative Design & R&D' },
  { key: 'supply-chain', title: 'Supply Chain & Delivery' },
] as const;

export async function generateMetadata({ params }: PageProps<'/[locale]/faq'>): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  return pageMetadata({
    locale: locale as never,
    path: '/faq',
    title: 'Questions we are asked',
    description:
      'Direct answers about what AQUASEE does, how a project runs, what it costs, and how delivery, quality control and IP work.',
  });
}

export default async function FaqPage({ params }: PageProps<'/[locale]/faq'>) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const ui = dict.ui;

  return (
    <>
      <section className="bg-ink pt-[4.5rem] text-paper">
        <div className="shell">
          <div className="grid gap-10 py-16 sm:py-20 lg:grid-cols-12 lg:items-end lg:py-24">
            <div className="lg:col-span-7">
              <p className="hero-enter hero-enter-1 flex items-center gap-3 font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-aqua">
                <span aria-hidden="true" className="h-px w-10 bg-aqua/70" />{ui.faq.eyebrow}</p>
              <h1 className="hero-enter hero-enter-2 mt-7 font-display text-[length:var(--text-cap)] font-normal leading-[1.03] tracking-[-0.025em] text-on-dark-strong">{ui.faq.title}</h1>
              <p className="hero-enter hero-enter-3 mt-7 max-w-xl text-[1.0625rem] leading-relaxed text-on-dark sm:text-lg">{ui.faq.lede}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper py-16 sm:py-20 lg:py-24">
        <div className="shell">
          <div className="space-y-16">
            {PILLARS.map((pillar) => {
              const items = dict.faq.filter((item) => item.pillar === pillar.key);
              if (!items.length) return null;
              return (
                <div key={pillar.key}>
                  <Reveal>
                    <p className="eyebrow text-accent">{ui.faq.pillars[pillar.key]}</p>
                    <h2 className="mt-5 text-title">{ui.faq.pillars[pillar.key]}</h2>
                  </Reveal>
                  <div className="mt-8">
                    <FaqList items={items} openFirst={false} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-accent-tint py-16 sm:py-20">
        <div className="shell">
          <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-display">{ui.faq.stillUnanswered}</h2>
              <p className="mt-5 max-w-xl text-lede leading-relaxed text-body">{ui.faq.askBody}</p>
            </div>
            <ActionLink href="/contact" size="lg">{ui.faq.askCta}</ActionLink>
          </div>
        </div>
      </section>

      <JsonLd data={faqLd(dict.faq)} />
    </>
  );
}