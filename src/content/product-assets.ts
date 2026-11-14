import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { resolve, sep } from 'node:path';
import type { ProductRecord } from './types.ts';

/** Build-time check of the exact public image bytes; never resolve arbitrary paths. */
export function verifyProductImageBytes(product: ProductRecord, publicRoot: string): boolean {
  const image = product.image;
  if (!image?.approved || !/^\/images\/[a-zA-Z0-9/_-]+\.(?:webp|png|jpe?g|avif)$/.test(image.src)
    || !/^[a-f0-9]{64}$/.test(image.sha256)) return false;
  const root = resolve(publicRoot);
  const path = resolve(root, image.src.slice(1));
  if (!path.startsWith(`${root}${sep}`)) return false;
  try {
    return createHash('sha256').update(readFileSync(path)).digest('hex') === image.sha256;
  } catch {
    return false;
  }
}
