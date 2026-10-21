import type { Metadata } from 'next';
import { InquiryForm } from '@/components/contact/InquiryForm';
import { Reveal } from '@/components/ui/Reveal';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Start a Project',
  description:
    'Send AQUASEE a short project brief — the stage you are at, the ambition, the constraints and the timeline. We reply with an honest read on what is realistic.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Start a Project — AQUASEE',
    description:
      'Send a short project brief and we will come back with an honest read on what is realistic.',
    url: '/contact',
  },
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-ink pt-[4.5rem] text-paper">
        <div className="shell">
          <div className="max-w-3xl py-20 lg:py-28">
            <p className="flex items-center gap-3 font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-aqua">
              <span aria-hidden="true" className="h-px w-10 bg-accent-2/70" />
              Start a Project
            </p>
            <h1 className="mt-8 font-display text-[length:var(--text-display)] font-normal leading-[1.04] tracking-[-0.025em] text-on-dark-strong">
              Tell us what you are trying to build.
            </h1>
            <p className="mt-7 max-w-xl text-[1.125rem] leading-relaxed text-on-dark">
              The more concrete the brief, the more useful our reply. If you are still early, say
              that — an unfinished idea is a perfectly good place to start.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-paper py-16 sm:py-20 lg:py-24">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            <Reveal className="lg:col-span-7 xl:col-span-8">
              <InquiryForm />
            </Reveal>

            <Reveal delay={120} className="lg:col-span-5 xl:col-span-4">
              <div className="lg:sticky lg:top-28">
                <div className="rounded-sm border border-line bg-sand p-7">
                  <p className="eyebrow text-accent">Direct contact</p>
                  <ul className="mt-5 space-y-4 text-[0.9375rem]">
                    <li>
                      <span className="block font-mono text-[0.625rem] uppercase tracking-[0.18em] text-muted">
                        Email
                      </span>
                      <a
                        href={`mailto:${site.contact.email}`}
                        className="mt-1.5 block text-ink underline underline-offset-4 hover:text-accent"
                      >
                        {site.contact.email}
                      </a>
                    </li>
                    <li>
                      <span className="block font-mono text-[0.625rem] uppercase tracking-[0.18em] text-muted">
                        Location
                      </span>
                      <span className="mt-1.5 block text-ink">{site.contact.location}</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-6 rounded-sm border border-line bg-paper p-7">
                  <p className="eyebrow text-accent">What happens next</p>
                  <ol className="mt-5 space-y-4">
                    {[
                      'We read the brief and check it against the work we are set up to take on.',
                      'If it is a fit, one of our leads replies with questions, a first read and a proposed next step.',
                      'If it is not a fit, we say so plainly and, where we can, point you somewhere better.',
                    ].map((item, i) => (
                      <li key={i} className="flex gap-3.5 text-[0.9375rem] leading-relaxed text-body">
                        <span className="mt-0.5 font-mono text-[0.6875rem] text-accent">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        {item}
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="mt-6 rounded-sm border border-line bg-paper p-7">
                  <p className="eyebrow text-accent">Privacy</p>
                  <p className="mt-4 text-[0.875rem] leading-relaxed text-body">
                    The details you submit are used only to respond to your inquiry. We do not sell
                    or share contact details, and we do not add you to a marketing list. If you ask
                    us to delete your details, we will.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}


