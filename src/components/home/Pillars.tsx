import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { services } from '@/content/site';

export function Pillars() {
  return (
    <section className="bg-sand py-20 sm:py-24 lg:py-32" id="capabilities">
      <div className="shell">
        <Reveal>
          <SectionHeader
            eyebrow="Capabilities"
            title="Three pillars, one continuous process."
            lede="Most projects need all three. Separating them is what creates cost, delay and loss of intent — so we hold them together."
          />
        </Reveal>

        <div className="mt-14 grid gap-px overflow-hidden rounded-sm border border-line bg-line md:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.href} delay={i * 110} className="bg-paper">
              <Link
                href={service.href}
                className="group flex h-full flex-col p-8 transition-colors duration-500 hover:bg-accent-tint lg:p-10"
              >
                <p className="font-mono text-[0.6875rem] tracking-[0.2em] text-accent">
                  {service.index}
                </p>
                <h3 className="mt-6 text-[1.375rem] leading-snug">{service.title}</h3>
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-body">{service.lede}</p>

                <ul className="mt-7 space-y-2.5 border-t border-line pt-6">
                  {service.capabilities.slice(0, 4).map((cap) => (
                    <li key={cap} className="text-[0.875rem] leading-relaxed text-body">
                      {cap}
                    </li>
                  ))}
                </ul>

                <span className="mt-8 inline-flex items-center gap-2 text-[0.8125rem] font-medium text-accent">
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
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
