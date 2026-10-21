import Link from 'next/link';
import { ActionLink } from '@/components/ui/Action';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import type { ServiceDetail } from '@/content/services';

export function ServicePage({ service }: { service: ServiceDetail }) {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink pt-[4.5rem] text-paper">
        <div
          aria-hidden="true"
          className="absolute inset-y-0 right-0 hidden w-1/2 opacity-[0.18] lg:block"
        >
          <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
            <rect width="800" height="600" fill="#0c1013" />
            {[0, 1, 2, 3, 4].map((i) => (
              <path
                key={i}
                d={`M0 ${140 + i * 96} C 220 ${100 + i * 96}, 430 ${200 + i * 90}, 800 ${130 + i * 96} L 800 ${182 + i * 96} C 430 ${252 + i * 90}, 220 ${152 + i * 96}, 0 ${192 + i * 96} Z`}
                fill={i % 2 === 0 ? '#2f8a81' : '#e9e5dc'}
                opacity={i % 2 === 0 ? 0.5 : 0.16}
              />
            ))}
          </svg>
        </div>

        <div className="shell relative">
          <div className="max-w-3xl py-20 lg:py-28">
            <p className="flex items-center gap-3 font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-aqua">
              <span aria-hidden="true" className="h-px w-10 bg-aqua/70" />
              Capability {service.index}
            </p>
            <h1 className="mt-8 font-display text-[length:var(--text-display)] font-normal leading-[1.04] tracking-[-0.025em] text-on-dark-strong">
              {service.title}
            </h1>
            <p className="mt-7 max-w-xl text-[1.125rem] leading-relaxed text-on-dark">
              {service.lede}
            </p>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-paper py-20 sm:py-24 lg:py-28">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-4">
              <p className="eyebrow text-accent">Overview</p>
              <p className="mt-6 text-[0.9375rem] leading-relaxed text-muted">{service.intro}</p>
            </Reveal>
            <Reveal delay={100} className="lg:col-span-8">
              <div className="space-y-6 text-[1.0625rem] leading-[1.75] text-body">
                {service.paragraphs.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="bg-sand py-20 sm:py-24 lg:py-28">
        <div className="shell">
          <Reveal>
            <SectionHeader
              eyebrow="What We Do"
              title={`${service.title}, in detail.`}
              lede="The specific activities that make up this part of the engagement."
            />
          </Reveal>

          <div className="mt-14 grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {service.capabilities.map((cap, i) => (
              <Reveal key={cap.title} delay={i * 60} className="bg-paper">
                <div className="h-full p-8">
                  <span className="font-mono text-[0.6875rem] tracking-[0.16em] text-accent">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-5 text-[1.125rem] leading-snug">{cap.title}</h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-body">{cap.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables + fit */}
      <section className="bg-paper py-20 sm:py-24 lg:py-28">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-6">
              <p className="eyebrow text-accent">Deliverables</p>
              <h2 className="mt-5 text-title">What you receive.</h2>
              <ul className="mt-8 divide-y divide-line border-y border-line">
                {service.deliverables.map((d) => (
                  <li key={d} className="flex items-start gap-3 py-4 text-[0.9375rem] leading-relaxed text-ink">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden="true"
                      className="mt-[0.3rem] shrink-0 text-accent"
                    >
                      <path
                        d="M3 8.5l3.2 3.2L13 4.8"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {d}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={120} className="lg:col-span-6">
              <p className="eyebrow text-accent">Engagement</p>
              <h2 className="mt-5 text-title">How the work runs.</h2>
              <ol className="mt-8 space-y-5">
                {service.engagement.map((phase, i) => (
                  <li key={phase.phase} className="flex gap-5 border-b border-line pb-5 last:border-0 last:pb-0">
                    <span className="mt-0.5 font-display text-[1.25rem] leading-none text-accent">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span>
                      <span className="block text-[1rem] font-medium text-ink">{phase.phase}</span>
                      <span className="mt-1.5 block text-[0.9375rem] leading-relaxed text-body">
                        {phase.description}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>

          <Reveal>
            <div className="mt-16 grid gap-px overflow-hidden rounded-sm border border-line bg-line md:grid-cols-2">
              <div className="bg-ink p-8 text-on-dark lg:p-10">
                <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-aqua">
                  This is a good fit if
                </p>
                <ul className="mt-6 space-y-3">
                  {service.bestFor.map((b) => (
                    <li key={b} className="flex gap-3 text-[0.9375rem] leading-relaxed text-on-dark">
                      <span aria-hidden="true" className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-aqua" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-paper p-8 lg:p-10">
                <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-accent">
                  Continue
                </p>
                <div className="mt-6 flex flex-col gap-3">
                  {service.related.map((r) => (
                    <Link
                      key={r.href}
                      href={r.href}
                      className="group flex items-center justify-between border-b border-line pb-3 text-[1.0625rem] text-ink transition-colors hover:text-accent"
                    >
                      {r.label}
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        aria-hidden="true"
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      >
                        <path
                          d="M2 8h12M9 3l5 5-5 5"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Link>
                  ))}
                  <Link
                    href="/projects"
                    className="group flex items-center justify-between border-b border-line pb-3 text-[1.0625rem] text-ink transition-colors hover:text-accent"
                  >
                    Projects & Capabilities
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      <path
                        d="M2 8h12M9 3l5 5-5 5"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                </div>

                <ActionLink href="/contact" className="mt-8">
                  Discuss your project
                </ActionLink>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}



