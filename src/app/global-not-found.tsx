import Link from 'next/link';

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
            The address may have changed, or the page may never have existed. The homepage and the
            three capability pages are the quickest way back.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex h-11 items-center rounded-full bg-ink px-6 text-[0.9375rem] font-medium text-paper"
            >
              Homepage
            </Link>
            <Link
              href="/strategy"
              className="inline-flex h-11 items-center rounded-full border border-line-2 px-6 text-[0.9375rem] font-medium text-ink"
            >
              Strategy &amp; Consulting
            </Link>
            <Link
              href="/projects"
              className="inline-flex h-11 items-center rounded-full border border-line-2 px-6 text-[0.9375rem] font-medium text-ink"
            >
              Projects
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-11 items-center rounded-full border border-line-2 px-6 text-[0.9375rem] font-medium text-ink"
            >
              Contact
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}