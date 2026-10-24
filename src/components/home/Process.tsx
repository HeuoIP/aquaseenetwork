import { Reveal } from '@/components/ui/Reveal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import type { HomeContent, ProcessStep } from '@/content/types';

export function Process({
  steps,
  copy,
}: {
  steps: ProcessStep[];
  copy: HomeContent['process'];
}) {
  return (
    <section className="bg-ink py-20 text-on-dark sm:py-24 lg:py-32" id="process">
      <div className="shell">
        <Reveal>
          <SectionHeader
            tone="dark"
            eyebrow={copy.eyebrow}
            title={copy.title}
            lede={copy.lede}
          />
        </Reveal>

        <ol className="mt-16 grid gap-px overflow-hidden rounded-sm border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, i) => (
            <Reveal key={step.index} delay={i * 80} as="li" className="bg-ink">
              <div className="group flex h-full flex-col p-8 transition-colors duration-500 hover:bg-ink-2 lg:p-9">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="font-display text-[2.25rem] leading-none text-aqua">
                    {step.index}
                  </span>
                  <span className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-on-dark/55">
                    {step.duration}
                  </span>
                </div>

                <h3 className="mt-6 font-display text-[1.375rem] text-on-dark-strong">{step.title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-on-dark/85">
                  {step.description}
                </p>

                <ul className="mt-7 space-y-2 border-t border-white/10 pt-5">
                  {step.deliverables.map((d) => (
                    <li
                      key={d}
                      className="flex gap-2.5 text-[0.8125rem] leading-relaxed text-on-dark/70"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-aqua"
                      />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal>
          <p className="mt-10 text-[0.8125rem] leading-relaxed text-on-dark/55">{copy.note}</p>
        </Reveal>
      </div>
    </section>
  );
}