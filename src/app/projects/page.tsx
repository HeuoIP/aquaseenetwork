import type { Metadata } from 'next';
import { StudyVisual } from '@/components/art/StudyVisual';
import { ActionLink } from '@/components/ui/Action';
import { DisclosureTag } from '@/components/ui/DisclosureTag';
import { ImageDisclosure } from '@/components/ui/ImageDisclosure';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { audiences } from '@/content/collaboration';
import { capabilityStudies, disclosureNote } from '@/content/projects';

export const metadata: Metadata = {
  title: 'Projects & Capabilities',
  description:
    'Illustrative capability studies across resort, leisure, hospitality and installation work — showing how AQUASEE scopes, designs and delivers bespoke projects.',
  alternates: { canonical: '/projects' },
  openGraph: {
    title: 'Projects & Capabilities — AQUASEE',
    description:
      'Illustrative capability studies across resort, leisure, hospitality and installation work.',
    url: '/projects',
  },
};

export default function ProjectsPage() {
  return (
    <>
      <section className="bg-ink pt-[4.5rem] text-paper">
        <div className="shell">
          <div className="max-w-3xl py-20 lg:py-28">
            <p className="flex items-center gap-3 font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-aqua">
              <span aria-hidden="true" className="h-px w-10 bg-aqua/70" />
              Projects & Capabilities
            </p>
            <h1 className="mt-8 font-display text-[length:var(--text-display)] font-normal leading-[1.04] tracking-[-0.025em] text-on-dark-strong">
              What we are set up to do.
            </h1>
            <p className="mt-7 max-w-xl text-[1.125rem] leading-relaxed text-on-dark">
              A set of illustrative studies describing the scope, method and outcome of typical
              AQUASEE engagements — for developers, hospitality groups, design practices and
              leisure developers.
            </p>
          </div>
        </div>
      </section>

      {/* Disclosure */}
      <section className="bg-accent-tint py-10">
        <div className="shell">
          <Reveal>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
              <span
                aria-hidden="true"
                className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-[0.75rem] font-medium text-white"
              >
                i
              </span>
              <div>
                <p className="text-[0.9375rem] font-medium text-ink">
                  About the visuals on this page
                </p>
                <p className="mt-2 max-w-4xl text-[0.9375rem] leading-relaxed text-body">
                  {disclosureNote} Every study is labelled on the image itself, and the workshop
                  image illustrates fabrication through a manufacturing partner rather than an
                  AQUASEE-owned facility.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Studies */}
      <section className="bg-paper py-20 sm:py-24 lg:py-28">
        <div className="shell">
          <div className="space-y-20 lg:space-y-28">
            {capabilityStudies.map((study, i) => (
              <article key={study.slug} className="grid gap-10 lg:grid-cols-12 lg:gap-14">
                <Reveal className={`lg:col-span-6 ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="relative aspect-[4/3] overflow-hidden bg-ink">
                    <StudyVisual
                      visual={study.visual}
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.03]"
                    />
                    <div className="absolute inset-x-4 bottom-4">
                      <ImageDisclosure>{study.disclosure}</ImageDisclosure>
                    </div>
                  </div>
                </Reveal>

                <Reveal delay={100} className={`lg:col-span-6 ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-accent">
                    {study.discipline} — {study.category}
                  </p>
                  <h2 className="mt-5 text-title">{study.title}</h2>
                  <p className="mt-4 text-[0.875rem] uppercase tracking-[0.08em] text-muted">
                    {study.scale}
                  </p>
                  <p className="mt-5 text-[1.0625rem] leading-[1.75] text-body">{study.summary}</p>

                  <div className="mt-8">
                    <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-muted">
                      Scope
                    </p>
                    <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                      {study.scope.map((s) => (
                        <li key={s} className="flex gap-2.5 text-[0.9375rem] leading-relaxed text-ink">
                          <span aria-hidden="true" className="mt-[0.5rem] h-1 w-1 shrink-0 rounded-full bg-accent" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 border-l-2 border-accent pl-5">
                    <p className="text-[0.9375rem] leading-relaxed text-body">{study.outcome}</p>
                  </div>

                  <DisclosureTag className="mt-7">{study.disclosure}</DisclosureTag>
                </Reveal>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Who we serve */}
      <section className="bg-sand py-20 sm:py-24 lg:py-28">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <SectionHeader
                eyebrow="Sectors"
                title="Who we work with."
                lede="We are set up for international projects where integrated creative, technical and manufacturing support is genuinely useful."
              />
              <ActionLink href="/contact" className="mt-9">
                Start a Project
              </ActionLink>
            </Reveal>

            <Reveal delay={120} className="lg:col-span-7">
              <ul className="grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2">
                {audiences.map((a, i) => (
                  <li key={a} className="bg-paper p-6">
                    <span className="font-mono text-[0.625rem] tracking-[0.16em] text-accent">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p className="mt-3 text-[0.9375rem] leading-snug text-ink">{a}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
