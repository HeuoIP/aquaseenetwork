import Image from 'next/image';
import Link from 'next/link';
import { CapabilityHero } from '@/components/service/CapabilityHero';
import { ActionLink } from '@/components/ui/Action';
import { ImageDisclosure } from '@/components/ui/ImageDisclosure';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import type { ServiceDetail } from '@/content/services';

export function ServicePage({ service }: { service: ServiceDetail }) {
  return (
    <>
      <CapabilityHero service={service} />

      {/* ---- Overview ------------------------------------------------------ */}
      <section className="bg-paper pb-12 pt-20 sm:pb-16 sm:pt-24 lg:pb-20 lg:pt-28">
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

      {/* ---- Service illustration ------------------------------------------- */}
      <section className="bg-paper pb-20 sm:pb-24 lg:pb-28">
        <div className="shell">
          <Reveal>
            <figure className="relative aspect-[16/9] overflow-hidden bg-ink">
              <Image
                src={service.illustration.src}
                alt={service.illustration.alt}
                fill
                sizes="(min-width: 1320px) 1200px, 100vw"
                className="object-cover"
              />
              <figcaption className="absolute bottom-4 right-4">
                <ImageDisclosure>{service.illustration.caption}</ImageDisclosure>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* ---- AI (only where it genuinely applies) --------------------------- */}
      {service.aiUsage ? (
        <section className="bg-ink py-20 text-on-dark sm:py-24 lg:py-28">
          <div className="shell">
            <Reveal>
              <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-aqua">
                {service.aiUsage.title}
              </p>
              <h2 className="mt-5 max-w-3xl text-title text-on-dark-strong">
                Where AI earns its place in this work.
              </h2>
            </Reveal>

            <div className="mt-12 grid gap-px overflow-hidden rounded-sm border border-white/10 bg-white/10 md:grid-cols-3">
              {service.aiUsage.points.map((point, i) => (
                <Reveal key={point.title} delay={i * 80} className="bg-ink p-7 lg:p-8">
                  <span className="font-mono text-[0.625rem] tracking-[0.16em] text-aqua">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-4 text-[1.0625rem] leading-snug text-on-dark-strong">
                    {point.title}
                  </h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-on-dark/80">
                    {point.description}
                  </p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={120}>
              <p className="mt-9 max-w-3xl border-l-2 border-aqua pl-5 text-[0.9375rem] leading-relaxed text-on-dark/80">
                {service.aiUsage.note}
              </p>
            </Reveal>
          </div>
        </section>
      ) : null}

      {/* ---- Activities ---------------------------------------------------- */}
      <section
        id="activities"
        className="scroll-mt-24 bg-ink py-20 text-on-dark sm:py-24 lg:py-28"
      >
        <div className="shell">
          <Reveal>
            <SectionHeader
              tone="dark"
              eyebrow="What We Do"
              title="The specific activities that make up this part of the engagement."
              lede="Each one is a defined piece of work with a named output — not a phase of vague effort."
            />
          </Reveal>

          <ol className="mt-14 divide-y divide-white/10 border-y border-white/10">
            {service.capabilities.map((cap, i) => (
              <Reveal
                as="li"
                key={cap.title}
                delay={i * 60}
                className="grid gap-x-8 gap-y-2 py-7 sm:grid-cols-[3rem_1fr] lg:grid-cols-[3rem_15rem_1fr]"
              >
                <span className="font-display text-[1.625rem] leading-none text-aqua">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="text-[1.0625rem] leading-snug text-on-dark-strong">{cap.title}</h3>
                <p className="text-[0.9375rem] leading-relaxed text-on-dark/80">{cap.description}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ---- Deliverables & engagement -------------------------------------- */}
      <section className="bg-paper py-20 sm:py-24 lg:py-28">
        <div className="shell">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <p className="eyebrow text-accent">Deliverables</p>
              <h2 className="mt-5 text-title">What you receive.</h2>
              <ul className="mt-8 divide-y divide-line border-y border-line">
                {service.deliverables.map((d) => (
                  <li
                    key={d}
                    className="flex items-start gap-3 py-4 text-[0.9375rem] leading-relaxed text-ink"
                  >
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

            <Reveal delay={120} className="lg:col-span-7">
              <p className="eyebrow text-accent">Engagement</p>
              <h2 className="mt-5 text-title">How the work runs.</h2>
              <ol className="mt-8 divide-y divide-line border-y border-line">
                {service.engagement.map((phase, i) => (
                  <li key={phase.phase} className="flex gap-6 py-5">
                    <span className="font-display text-[1.375rem] leading-none text-accent">
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
        </div>
      </section>

      {/* ---- Fit & continue -------------------------------------------------- */}
      <section className="bg-sand py-20 sm:py-24 lg:py-28">
        <div className="shell">
          <div className="grid gap-px overflow-hidden rounded-sm border border-line bg-line md:grid-cols-2">
            <Reveal className="bg-ink p-8 text-on-dark lg:p-10">
              <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-aqua">
                This is a good fit if
              </p>
              <ul className="mt-7 space-y-3">
                {service.bestFor.map((b) => (
                  <li key={b} className="flex gap-3 text-[0.9375rem] leading-relaxed text-on-dark">
                    <span aria-hidden="true" className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-aqua" />
                    {b}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={120} className="bg-paper p-8 lg:p-10">
              <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-accent">
                Continue
              </p>
              <div className="mt-6 flex flex-col">
                {service.related.map((r) => (
                  <Link
                    key={r.href}
                    href={r.href}
                    className="group flex items-center justify-between border-b border-line py-3.5 text-[1.0625rem] text-ink transition-colors hover:text-accent"
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
                  className="group flex items-center justify-between border-b border-line py-3.5 text-[1.0625rem] text-ink transition-colors hover:text-accent"
                >
                  Projects &amp; Capabilities
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

              <ActionLink href="/contact" className="mt-9">
                Discuss your project
              </ActionLink>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
