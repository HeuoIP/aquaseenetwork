import Image from 'next/image';
import Link from 'next/link';
import { ImageDisclosure } from '@/components/ui/ImageDisclosure';
import { Reveal } from '@/components/ui/Reveal';
import type { ProductCategoryDefinition } from '@/content/types';
import { localePath, type Locale } from '@/lib/locale';

export function ProductFocus({
  categories,
  locale,
}: {
  categories: ProductCategoryDefinition[];
  locale: Locale;
}) {
  return (
    <section className="bg-sand py-20 sm:py-24 lg:py-32" id="products">
      <div className="shell">
        <Reveal>
          <p className="eyebrow text-accent">The collection</p>
          <div className="mt-5 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="max-w-2xl text-title">Water products with a point of view.</h2>
            <p className="max-w-md text-[1rem] leading-relaxed text-body">
              AQUASEE is building a focused collection for pools, resorts and compact leisure spaces. The first release is being verified against real supply, installation and market requirements.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {categories.map((category, index) => (
            <Reveal key={category.slug} delay={index * 80}>
              <Link
                href={localePath(locale, `/collections/${category.slug}`)}
                className="group flex h-full flex-col overflow-hidden rounded-sm border border-line bg-paper transition-colors duration-500 hover:bg-accent-tint"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-ink">
                  <Image
                    src={category.image.src}
                    alt={category.image.alt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                  />
                  <ImageDisclosure className="absolute bottom-3 left-3">AI concept visualisation</ImageDisclosure>
                  <span className="absolute left-5 top-5 rounded-full border border-white/20 bg-ink/70 px-3 py-1 font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-on-dark backdrop-blur-sm">
                    {category.slug === 'splash-play-facilities' ? 'Core design focus' : category.role === 'first-release' ? 'First release focus' : 'Coming next'}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-7 lg:p-8">
                  <h3 className="font-display text-[1.75rem] leading-tight text-ink">{category.name}</h3>
                  <p className="mt-3 max-w-lg text-[0.9375rem] leading-relaxed text-body">{category.summary}</p>
                  <p className="mt-5 border-t border-line pt-5 text-[0.8125rem] leading-relaxed text-muted">{category.scopeNote}</p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-7 text-[0.8125rem] font-medium text-accent">
                    Explore {category.name}
                    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                      <path d="M2 8h12M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
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
