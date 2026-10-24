import { Reveal } from '@/components/ui/Reveal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import type { CollaborationItem, HomeContent } from '@/content/types';

export function Collaboration({
  model,
  audiences,
  copy,
}: {
  model: readonly CollaborationItem[];
  audiences: readonly string[];
  copy: HomeContent['collaboration'];
}) {
  return (
    <section className="bg-sand py-20 sm:py-24 lg:py-32" id="collaboration">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <SectionHeader eyebrow={copy.eyebrow} title={copy.title} lede={copy.lede} />
            </Reveal>

            <Reveal delay={120}>
              <div className="mt-10 rounded-sm border border-line bg-paper p-7">
                <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-accent">
                  {copy.audiencesLabel}
                </p>
                <ul className="mt-5 space-y-3">
                  {audiences.map((a) => (
                    <li key={a} className="flex gap-3 text-[0.9375rem] leading-relaxed text-ink">
                      <span
                        aria-hidden="true"
                        className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-accent"
                      />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <div className="grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2">
              {model.map((item, i) => (
                <Reveal key={item.title} delay={i * 80} className="bg-paper">
                  <div className="h-full p-7 lg:p-8">
                    <h3 className="text-[1.0625rem] leading-snug">{item.title}</h3>
                    <p className="mt-3 text-[0.9375rem] leading-relaxed text-body">
                      {item.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}