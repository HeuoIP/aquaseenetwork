import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.aquasee.art'),
  title: 'Page not found — AQUASEE',
  description: 'The requested AQUASEE page could not be found.',
};

/**
 * The global 404.
 *
 * Next.js renders this outside the locale tree, so it must not depend on a
 * dictionary — it stays in English and links to the root paths, which are the
 * English pages.
 */
export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body className="min-h-screen bg-paper antialiased">
        <main className="shell flex min-h-screen flex-col justify-center py-32">
          <p className="eyebrow text-accent">404</p>
          <h1 className="mt-5 max-w-2xl text-display text-ink">
            That page is not here.
          </h1>
          <p className="mt-6 max-w-xl text-lede leading-relaxed text-body">
            The address may have changed, or the page may never have existed. Start with the homepage
            or explore the pool product categories.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex h-11 items-center rounded-full bg-ink px-6 text-[0.9375rem] font-medium text-paper"
            >
              Homepage
            </Link>
            <Link
              href="/collections/pool-slides"
              className="inline-flex h-11 items-center rounded-full border border-line-2 px-6 text-[0.9375rem] font-medium text-ink"
            >
              Pool Slides
            </Link>
            <Link
              href="/collections/pool-shade"
              className="inline-flex h-11 items-center rounded-full border border-line-2 px-6 text-[0.9375rem] font-medium text-ink"
            >
              Outdoor Shade
            </Link>
            <Link
              href="/concept-collection"
              className="inline-flex h-11 items-center rounded-full border border-line-2 px-6 text-[0.9375rem] font-medium text-ink"
            >
              Concepts
            </Link>
            <Link
              href="/inquiry/business"
              className="inline-flex h-11 items-center rounded-full border border-line-2 px-6 text-[0.9375rem] font-medium text-ink"
            >
              Enquire
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
