import Image from 'next/image';
import { ActionLink } from '@/components/ui/Action';
import { ImageDisclosure } from '@/components/ui/ImageDisclosure';
import { site } from '@/content/site';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink pt-[4.5rem] text-paper">
      {/* Composition */}

      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/images/resort-arrival.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[64%_center]"
        />
      </div>
      <div
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,16,19,0.96)_0%,rgba(12,16,19,0.84)_34%,rgba(12,16,19,0.46)_68%,rgba(12,16,19,0.26)_100%)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,16,19,0.6)_0%,rgba(12,16,19,0)_22%,rgba(12,16,19,0)_58%,rgba(12,16,19,0.82)_100%)]"
        aria-hidden="true"
      />

      <div className="shell relative">
        <div className="flex min-h-[calc(100svh-4.5rem)] items-center py-20 sm:min-h-[80svh] lg:py-28">
          <div className="max-w-4xl">
            <p className="flex items-center gap-3 font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-aqua">
              <span aria-hidden="true" className="h-px w-10 bg-aqua/70" />
              {site.name} — {site.tagline}
            </p>

            <h1 className="mt-8 font-display text-[length:var(--text-hero)] font-normal leading-[0.96] tracking-[-0.03em] text-on-dark-strong">
              From Ambitious Ideas
              <br />
              to Real-World{' '}
              <span className="display-italic text-aqua">Projects.</span>
            </h1>

            <p className="mt-8 max-w-xl text-[1.0625rem] leading-relaxed text-on-dark sm:text-lg">
              Strategic thinking, creative design, product development and coordinated delivery for
              distinctive spaces, experiences and bespoke installations.
            </p>

            <div className="mt-11 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ActionLink href="/strategy" size="lg" variant="light" arrow={false}>
                Explore Our Capabilities
              </ActionLink>
              <ActionLink
                href="/contact"
                size="lg"
                className="text-on-dark hover:text-on-dark-strong"
                arrow={false}
              >
                Start a Project
              </ActionLink>
            </div>

            <dl className="mt-16 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-7 border-t border-white/12 pt-9 sm:grid-cols-4">
              {[
                { k: 'Strategy', v: 'Brief to programme' },
                { k: 'Design', v: 'Concept to specification' },
                { k: 'Delivery', v: 'Source to site' },
                { k: 'Partners', v: 'Qualified network' },
              ].map((item) => (
                <div key={item.k}>
                  <dt className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-aqua">
                    {item.k}
                  </dt>
                  <dd className="mt-2 text-[0.875rem] leading-snug text-on-dark">{item.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Disclosure — the hero visual is a concept render, so the label has
          to be visible in the first screen, not buried at the end of the
          section. */}
      <div className="pointer-events-none absolute inset-x-0 top-[5.5rem]">
        <div className="shell flex justify-end">
          <ImageDisclosure>Concept render &mdash; not a completed project</ImageDisclosure>
        </div>
      </div>
    </section>
  );
}


