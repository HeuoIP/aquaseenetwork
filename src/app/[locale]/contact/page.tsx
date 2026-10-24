import type { Metadata } from 'next';
import { Contours } from '@/components/art/Contours';
import { InquiryForm } from '@/components/contact/InquiryForm';
import { ActionLink } from '@/components/ui/Action';
import { Reveal } from '@/components/ui/Reveal';
import { getDictionary } from '@/lib/dictionary';
import { pageMetadata } from '@/lib/metadata';

export async function generateMetadata({ params }: PageProps<'/[locale]/contact'>): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  return pageMetadata({
    locale: locale as never,
    path: '/contact',
    title: 'Contact',
    description:
      'Talk to AQUASEE about a project brief — strategy and consulting, creative design and R&D, or supply chain and delivery. Send an enquiry or reach us directly.',
  });
}

export default async function ContactPage({ params }: PageProps<'/[locale]/contact'>) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const copy = dict.contact;
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
                {copy.eyebrow}
              </p>

              <h1 className="hero-enter hero-enter-2 mt-7 font-display text-[length:var(--text-cap)] font-normal leading-[1.03] tracking-[-0.025em] text-on-dark-strong">
                {copy.title}
              </h1>

              <p className="hero-enter hero-enter-3 mt-7 max-w-xl text-[1.0625rem] leading-relaxed text-on-dark sm:text-lg">{copy.lede}</p>
            </div>

            <div className="hero-enter hero-enter-4 lg:col-span-5">
              <dl className="grid gap-px overflow-hidden rounded-sm border border-white/12 bg-white/12 sm:grid-cols-2 lg:grid-cols-1">
                <div className="bg-ink p-5">
                  <dt className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-aqua">
                    {copy.newProjectsLabel}
                  </dt>
                  <dd className="mt-2.5 text-[0.9375rem] leading-relaxed text-on-dark">
                    {copy.newProjectsBody}
                  </dd>
                </div>
                <div className="bg-ink p-5">
                  <dt className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-aqua">
                    {copy.otherLabel}
                  </dt>
                  <dd className="mt-2.5 text-[0.9375rem] leading-relaxed text-on-dark">
                    <a
                      href={`mailto:${dict.site.contact.email}`}
                      className="text-on-dark-strong underline underline-offset-4 transition-colors hover:text-aqua"
                    >
                      {dict.site.contact.email}
                    </a>
                    <span className="mt-1.5 block text-on-dark/70">{dict.site.contact.location}</span>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Form + details ------------------------------------------------- */}
      <section className="bg-paper py-16 sm:py-20 lg:py-24">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7 xl:col-span-8">
              <Reveal>
                <p className="eyebrow text-accent">{copy.briefEyebrow}</p>
                <h2 className="mt-5 text-title">{copy.briefTitle}</h2>
                <p className="mt-4 max-w-xl text-[0.9375rem] leading-relaxed text-body">
                  {copy.briefLede}
                </p>
              </Reveal>

              <div className="mt-10">
                <InquiryForm email={dict.site.contact.email} locale={locale as never} ui={ui} />
              </div>
            </div>

            <aside className="lg:col-span-5 xl:col-span-4">
              <Reveal delay={120}>
                <div className="rounded-sm border border-line bg-sand p-7">
                  <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-accent">{ui.contact.whatToInclude}</p>
                  <ul className="mt-5 space-y-3">
                    {copy.whatToInclude.map((item) => (
                      <li key={item} className="flex gap-3 text-[0.9375rem] leading-relaxed text-ink">
                        <span aria-hidden="true" className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 border-t border-line pt-5 text-[0.8125rem] leading-relaxed text-muted">{ui.contact.skipUnknown}</p>
                </div>
              </Reveal>

              <Reveal delay={180}>
                <div className="mt-6 rounded-sm border border-line bg-paper p-7">
                  <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-accent">{ui.contact.whatNext}</p>
                  <ol className="mt-5 space-y-4">
                    {ui.contact.nextSteps.map((item, i) => (
                      <li key={item} className="flex gap-3.5 text-[0.9375rem] leading-relaxed text-body">
                        <span className="mt-0.5 font-mono text-[0.625rem] tracking-[0.16em] text-accent">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        {item}
                      </li>
                    ))}
                  </ol>
                </div>
              </Reveal>

              <Reveal delay={240}>
                <div className="mt-6 rounded-sm border border-line bg-paper p-7">
                  <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-accent">{ui.contact.privacy}</p>
                  <p className="mt-4 text-[0.875rem] leading-relaxed text-body">{ui.contact.privacyBody}</p>
                </div>
              </Reveal>
            </aside>
          </div>
        </div>
      </section>

      {/* ---- Other enquiries ------------------------------------------------ */}
      <section className="bg-sand py-16 sm:py-20 lg:py-24">
        <div className="shell">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <Reveal className="lg:col-span-5">
              <p className="eyebrow text-accent">{ui.contact.otherEnquiries}</p>
              <h2 className="mt-5 text-title">{ui.contact.otherTitle}</h2>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-body">{ui.contact.otherBody}</p>
            </Reveal>

            <Reveal delay={120} className="lg:col-span-7">
              <div className="grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2">
                <div className="bg-paper p-7">
                  <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-accent">{ui.contact.email}</p>
                  <a
                    href={`mailto:${dict.site.contact.email}`}
                    className="mt-3 block text-[1.0625rem] text-ink underline underline-offset-4 transition-colors hover:text-accent"
                  >
                    {dict.site.contact.email}
                  </a>
                </div>
                <div className="bg-paper p-7">
                  <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-accent">{ui.contact.whereWeAre}</p>
                  <p className="mt-3 text-[1.0625rem] leading-snug text-ink">{dict.site.contact.location}</p>
                  {dict.site.contact.phone ? (
                    <a
                      href={`tel:${dict.site.contact.phone}`}
                      className="mt-2 block text-[0.9375rem] text-body underline underline-offset-4 hover:text-accent"
                    >
                      {dict.site.contact.phone}
                    </a>
                  ) : null}
                </div>
                <div className="bg-paper p-7 sm:col-span-2">
                  <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-accent">{ui.contact.howWeWork}</p>
                  <p className="mt-3 max-w-2xl text-[0.9375rem] leading-relaxed text-body">{ui.contact.howWeWorkBody}</p>
                  <ActionLink href="/projects" className="mt-6">{ui.contact.seeStudies}</ActionLink>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
