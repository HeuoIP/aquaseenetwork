import Link from 'next/link';
import { Art } from '@/components/art/Art';
import { DisclosureTag } from '@/components/ui/DisclosureTag';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { capabilityStudies, disclosureNote } from '@/content/projects';

export function WorkPreview() {
  const featured = capabilityStudies.filter((p) => p.featured).slice(0, 3);

  return (
    <section className="bg-paper py-20 sm:py-24 lg:py-32" id="work">
      <div className="shell">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <SectionHeader
              eyebrow="Selected Work"
              title="Capability studies."
              lede="AQUASEE has not published client project references. What follows are illustrative studies of the kind of work we take on."
            />
          </Reveal>
          <Reveal delay={120}>
            <Link
              href="/projects"
              className="group inline-flex shrink-0 items-center gap-2 text-[0.875rem] font-medium text-accent"
            >
              View all studies
              <svg
                width="15"
                height="15"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                <path
                  d="M2 8h12M9 3l5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {featured.map((study, i) => (
            <Reveal key={study.slug} delay={i * 110}>
              <article className="group flex h-full flex-col">
                <div className="relative aspect-[4/3] overflow-hidden bg-ink">
                  <Art
                    variant={study.art}
                    className="transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                  />
                  <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-ink/70 px-3 py-1 font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-on-dark backdrop-blur-sm">
                    {study.discipline}
                  </span>
                </div>

                <div className="flex flex-1 flex-col pt-6">
                  <h3 className="text-[1.25rem] leading-snug">{study.title}</h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-body">{study.summary}</p>
                  <DisclosureTag className="mt-5">{study.disclosure}</DisclosureTag>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-12 max-w-3xl border-t border-line pt-6 text-[0.8125rem] leading-relaxed text-muted">
            {disclosureNote}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
