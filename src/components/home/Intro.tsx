import Image from 'next/image';
import { ImageDisclosure } from '@/components/ui/ImageDisclosure';
import { Reveal } from '@/components/ui/Reveal';
import type { HomeContent } from '@/content/types';

export function Intro({
  copy,
  illustrationLabel,
  note,
}: {
  copy: HomeContent['intro'];
  /** What a rendering is called, so a picture is never passed off as work. */
  illustrationLabel: string;
  /** The line that says what the pictures below are. */
  note: string;
}) {
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

        {copy.strip?.length ? (
          <Reveal delay={180} className="mt-14 lg:mt-20">
            <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
              {copy.strip.map((item) => (
                <li key={item.src} className="relative aspect-[4/3] overflow-hidden bg-ink">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                  {item.kind === 'illustration' ? (
                    <ImageDisclosure className="absolute bottom-2.5 left-2.5">
                      {illustrationLabel}
                    </ImageDisclosure>
                  ) : null}
                </li>
              ))}
            </ul>
            <p className="mt-4 max-w-2xl text-[0.75rem] leading-relaxed text-muted">{note}</p>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}