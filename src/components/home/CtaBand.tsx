import { ActionLink } from '@/components/ui/Action';
import type { HomeContent } from '@/content/types';

export function CtaBand({
  copy,
  email,
}: {
  copy: HomeContent['cta'];
  email: string;
}) {
  return (
    <section className="bg-accent-tint py-20 sm:py-24" id="contact-cta">
      <div className="shell">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow text-accent">{copy.eyebrow}</p>
            <h2 className="mt-5 text-display">{copy.title}</h2>
            <p className="mt-5 max-w-xl text-lede leading-relaxed text-body">{copy.body}</p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end">
            <ActionLink href="/contact" size="lg">
              {copy.primary}
            </ActionLink>
            <ActionLink href={`mailto:${email}`} size="lg" variant="outline" arrow={false}>
              {email}
            </ActionLink>
          </div>
        </div>
      </div>
    </section>
  );
}