import { HeroArt } from '@/components/art/HeroArt';
import { ActionLink } from '@/components/ui/Action';
import { site } from '@/content/site';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink pt-[4.5rem] text-paper">
      {/* Composition */}
      <div className="absolute inset-0 opacity-70" aria-hidden="true">
        <HeroArt />
      </div>
      <div
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,16,19,0.94)_0%,rgba(12,16,19,0.72)_45%,rgba(12,16,19,0.35)_100%)]"
        aria-hidden="true"
      />

      <div className="shell relative">
        <div className="flex min-h-[calc(100svh-4.5rem)] items-center py-20 sm:min-h-[80svh] lg:py-28">
          <div className="max-w-4xl">
            <p className="flex items-center gap-3 font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-aqua">
              <span aria-hidden="true" className="h-px w-10 bg-accent-2/70" />
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
    </section>
  );
}


