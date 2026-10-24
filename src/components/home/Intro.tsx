import { Reveal } from '@/components/ui/Reveal';
import type { HomeContent } from '@/content/types';

export function Intro({ copy }: { copy: HomeContent['intro'] }) {
  return (
    <section className="bg-paper py-20 sm:py-24 lg:py-32">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow text-accent">{copy.eyebrow}</p>
            <h2 className="mt-5 text-title">{copy.title}</h2>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-7">
            <div className="space-y-6 text-[1.0625rem] leading-[1.75] text-body">
              {copy.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4 border-t border-line pt-8">
              {copy.audiences.map((item) => (
                <p key={item} className="flex items-start gap-2.5 text-[0.875rem] text-ink">
                  <span
                    aria-hidden="true"
                    className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-accent"
                  />
                  {item}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}