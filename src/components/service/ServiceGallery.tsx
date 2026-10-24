import Image from 'next/image';
import type { GalleryItem } from '@/content/types';

/**
 * Pictures inside a capability page.
 *
 * They are not captioned and they do not explain anything. The page reads as
 * a paragraph, then the thing it describes, then the next paragraph - the
 * pictures are the rhythm of the page, not a case study.
 *
 * One small marker is kept: a rendering is never allowed to pass for a
 * photograph of a finished job.
 */
export function ServiceGallery({
  items,
  labels,
}: {
  items: GalleryItem[];
  labels: { work: string; illustration: string };
}) {
  if (!items.length) return null;

  return (
    <section className="bg-paper py-12 sm:py-16 lg:py-20">
      <div className="shell">
        <div className="grid gap-8 lg:gap-12">
          {items.map((item) => (
            <figure key={item.src} className="relative aspect-[16/9] overflow-hidden bg-ink">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(min-width: 1024px) 80vw, 100vw"
                className="object-cover"
              />
              {item.kind === 'illustration' ? (
                <span className="absolute bottom-3 left-3 rounded-full border border-white/15 bg-ink/60 px-2.5 py-1 font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-on-dark/80 backdrop-blur-sm">
                  {labels.illustration}
                </span>
              ) : null}
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
