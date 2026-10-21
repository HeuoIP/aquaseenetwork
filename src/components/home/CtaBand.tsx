import { ActionLink } from '@/components/ui/Action';
import { site } from '@/content/site';

export function CtaBand() {
  return (
    <section className="bg-accent-tint py-20 sm:py-24" id="contact-cta">
      <div className="shell">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow text-accent">Start a Project</p>
            <h2 className="mt-5 text-display">
              Tell us what you are trying to build.
            </h2>
            <p className="mt-5 max-w-xl text-lede leading-relaxed text-body">
              Send a short brief — the stage you are at, the ambition, the constraints. We will
              come back with an honest read on what is realistic, what it needs and where we can
              help.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end">
            <ActionLink href="/contact" size="lg">
              Start a Project
            </ActionLink>
            <ActionLink href={`mailto:${site.contact.email}`} size="lg" variant="outline" arrow={false}>
              {site.contact.email}
            </ActionLink>
          </div>
        </div>
      </div>
    </section>
  );
}

