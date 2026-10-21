import type { Metadata } from 'next';
import { ActionLink } from '@/components/ui/Action';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="bg-paper pt-[4.5rem]">
      <div className="shell">
        <div className="flex min-h-[70svh] flex-col justify-center py-24">
          <p className="eyebrow text-accent">Error 404</p>
          <h1 className="mt-5 text-display">This page is not here.</h1>
          <p className="mt-5 max-w-lg text-lede leading-relaxed text-body">
            The address may have changed, or the page may have moved. The capabilities below cover
            most of what we do.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ActionLink href="/">Back to home</ActionLink>
            <ActionLink href="/contact" variant="outline">
              Start a Project
            </ActionLink>
          </div>
        </div>
      </div>
    </section>
  );
}


