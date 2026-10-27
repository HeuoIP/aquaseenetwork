import Image from 'next/image';
import { ImageDisclosure } from '@/components/ui/ImageDisclosure';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import type { HomeContent, ProcessStep } from '@/content/types';

export function Process({
  steps,
  copy,
  illustrationLabel,
  note,
}: {
  steps: ProcessStep[];
  copy: HomeContent['process'];
  /** What a rendering is called, so a picture is never passed off as work. */
  illustrationLabel: string;
  /** The line that says what the pictures are. */
  note: string;
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

                {step.image ? (
                  <figure className="relative mt-6 aspect-[16/10] overflow-hidden bg-ink-2">
                    <Image
                      src={step.image.src}
                      alt={step.image.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover"
                    />
                    {step.image.kind === 'illustration' ? (
                      <ImageDisclosure className="absolute bottom-2.5 left-2.5">
                        {illustrationLabel}
                      </ImageDisclosure>
                    ) : null}
                  </figure>
                ) : null}

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

        <Reveal>
          <p className="mt-3 text-[0.75rem] leading-relaxed text-on-dark/45">{note}</p>
        </Reveal>
      </div>
    </section>
  );
}