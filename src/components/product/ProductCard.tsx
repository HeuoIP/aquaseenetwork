import Image from 'next/image';
import Link from 'next/link';
import { ImageDisclosure } from '@/components/ui/ImageDisclosure';
import type { ProductRecord } from '@/content/types';
import { catalogUi, productTranslation } from '@/content/products';
import { localePath, type Locale } from '@/lib/locale';

export function ProductCard({ product, locale }: { product: ProductRecord; locale: Locale }) {
  const copy = productTranslation(product, locale);
  const ui = catalogUi(locale);
  if (!copy || !product.image || !ui) return null;
  return (
    <Link href={localePath(locale, `/products/${product.slug}`)} className="group block overflow-hidden rounded-sm border border-line bg-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
      <div className="relative aspect-[4/3] bg-sand">
        <Image src={product.image.src} alt={copy.imageAlt ?? product.image.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
        {product.image.kind === 'illustration' ? <ImageDisclosure className="absolute bottom-3 left-3">{ui.conceptVisualisation}</ImageDisclosure> : null}
      </div>
      <div className="p-6">
        <h3 className="font-display text-2xl text-ink">{copy.name}</h3>
        <p className="mt-3 text-sm leading-relaxed text-body">{copy.summary}</p>
        <span className="mt-5 inline-block text-sm font-medium text-accent">{ui.viewProduct} →</span>
      </div>
    </Link>
  );
}
