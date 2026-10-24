import type { Metadata } from 'next';
import { Contours } from '@/components/art/Contours';
import { UnsubscribeForm } from '@/components/contact/UnsubscribeForm';
import { getDictionary } from '@/lib/dictionary';
import { pageMetadata } from '@/lib/metadata';

/**
 * Unsubscribe page.
 *
 * Reached from the link in every outreach email. The address is read from the
 * query string so the common case is a single click with no typing.
 */
export async function generateMetadata({ params }: PageProps<'/[locale]/unsubscribe'>): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const meta = pageMetadata({
    locale: locale as never,
    path: '/unsubscribe',
    title: 'Unsubscribe',
    description:
      'Stop receiving AQUASEE marketing email. One click records the request and removes your address from our outreach list.',
  });
  return { ...meta, robots: { index: false, follow: false } };
}

export default async function UnsubscribePage({ params, searchParams }: PageProps<'/[locale]/unsubscribe'>) {
  const { locale } = await params;
  const query = await searchParams;
  const dict = await getDictionary(locale);
  const email = typeof query.email === 'string' ? query.email : '';
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
                <span aria-hidden="true" className="h-px w-10 bg-aqua/70" />{ui.unsubscribe.eyebrow}</p>

              <h1 className="hero-enter hero-enter-2 mt-7 font-display text-[length:var(--text-cap)] font-normal leading-[1.03] tracking-[-0.025em] text-on-dark-strong">{ui.unsubscribe.title}</h1>

              <p className="hero-enter hero-enter-3 mt-7 max-w-xl text-[1.0625rem] leading-relaxed text-on-dark sm:text-lg">{ui.unsubscribe.lede}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Form ---------------------------------------------------------- */}
      <section className="bg-paper py-16 sm:py-20 lg:py-24">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7 xl:col-span-8">
              <p className="eyebrow text-accent">{ui.unsubscribe.requestEyebrow}</p>
              <h2 className="mt-5 text-title">{ui.unsubscribe.requestTitle}</h2>
              <p className="mt-4 max-w-xl text-[0.9375rem] leading-relaxed text-body">{ui.unsubscribe.requestLede}</p>

              <div className="mt-10">
                <UnsubscribeForm initialEmail={email} ui={ui} />
              </div>
            </div>

            <aside className="lg:col-span-5 xl:col-span-4">
              <div className="rounded-sm border border-line bg-sand p-7">
                <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-accent">{ui.unsubscribe.otherWaysEyebrow}</p>
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-body">{ui.unsubscribe.otherWays}</p>
                <p className="mt-5 border-t border-line pt-5 text-[0.8125rem] leading-relaxed text-muted">
                  <a
                    href={`mailto:${dict.site.contact.email}`}
                    className="text-ink underline underline-offset-4 transition-colors hover:text-accent"
                  >
                    {dict.site.contact.email}
                  </a>
                </p>
              </div>

              <div className="mt-6 rounded-sm border border-line bg-paper p-7">
                <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-accent">{ui.unsubscribe.notAffectEyebrow}</p>
                <p className="mt-4 text-[0.875rem] leading-relaxed text-body">{ui.unsubscribe.notAffect}</p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}