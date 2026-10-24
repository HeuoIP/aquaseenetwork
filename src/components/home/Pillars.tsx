import Image from 'next/image';
import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import type { ServiceDetail } from '@/content/types';
import { localePath, type Locale } from '@/lib/locale';

/**
 * The homepage's single capability section. Reads from `serviceDetails` so the
 * cards and the capability pages can never drift apart.
 */
export function Pillars({ services, locale }: { services: ServiceDetail[]; locale: Locale }) {
  return (
    <section className="bg-sand py-20 sm:py-24 lg:py-32" id="capabilities">
      <div className="shell">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <SectionHeader
              eyebrow="Capabilities"
              title="Three pillars, one continuous process."
              lede="Most projects need all three. Separating them is what creates cost, delay and loss of intent — so we hold them together."
            />
          </Reveal>
          <Reveal delay={120}>
            <Link
              href={localePath(locale, '/projects')}
              className="group inline-flex shrink-0 items-center gap-2 text-[0.875rem] font-medium text-accent"
            >
              View capability studies
              <svg
                width="15"
                height="15"
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
          </Reveal>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.href} delay={i * 110}>
              <Link
                href={localePath(locale, service.href)}
                className="group flex h-full flex-col overflow-hidden rounded-sm border border-line bg-paper transition-colors duration-500 hover:bg-accent-tint"
              >
                <div className="relative aspect-[3/2] overflow-hidden bg-ink">
                  <Image
                    src={service.illustration.src}
                    alt={service.illustration.alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                  />
                  <span className="absolute left-5 top-5 rounded-full border border-white/20 bg-ink/70 px-3 py-1 font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-on-dark backdrop-blur-sm">
                    {service.eyebrow}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-7 lg:p-8">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-display text-[1.5rem] leading-none text-accent">
                      {service.index}
                    </span>
                    {service.aiTag ? (
                      <span className="rounded-full border border-accent/25 bg-accent-tint px-2.5 py-1 font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-accent">
                        {service.aiTag}
                      </span>
                    ) : null}
                  </div>

                  <h3 className="mt-4 text-[1.25rem] leading-snug">{service.title}</h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-body">{service.lede}</p>

                  <span className="mt-auto inline-flex items-center gap-2 pt-7 text-[0.8125rem] font-medium text-accent">
                    Explore {service.title}
                    <svg
                      width="15"
                      height="15"
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
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
