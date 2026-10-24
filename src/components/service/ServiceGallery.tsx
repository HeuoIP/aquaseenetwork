import Image from 'next/image';
import type { GalleryItem } from '@/content/types';

/**
 * The pictures inside a capability page.
 *
 * Each item sits in the flow of the page rather than in a gallery at the
 * bottom: the page reads as a paragraph, then the thing it describes, then
 * the next paragraph. The kind badge says whether the picture is our own
 * material or an illustration, because a rendering passed off as a built
 * project is the one thing this site must never do.
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
    <section className="bg-paper py-16 sm:py-20 lg:py-24">
      <div className="shell">
        <div className="grid gap-14 lg:gap-20">
          {items.map((item, i) => (
            <figure
              key={item.src}
              className="grid gap-6 lg:grid-cols-12 lg:items-center lg:gap-12"
            >
              <div
                className={`relative aspect-[16/10] overflow-hidden bg-ink lg:col-span-7 ${
                  i % 2 === 1 ? 'lg:order-2' : ''
                }`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="lg:col-span-5">
                <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-accent">
                  {item.kind === 'work' ? labels.work : labels.illustration}
                </p>
                <p className="mt-4 text-[1.0625rem] leading-relaxed text-body">
                  {item.caption}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
