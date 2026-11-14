import { catalogReleaseManifest } from '../src/content/catalog-index.ts';
import { publishedProducts } from '../src/content/products.ts';

const products = publishedProducts();
if (!products.length) {
  console.error('No independently approved English product is available for catalogue index review.');
  process.exitCode = 1;
} else {
  const { manifest, manifestDigest } = catalogReleaseManifest();
  console.log(JSON.stringify({ manifest, manifestDigest }, null, 2));
}
