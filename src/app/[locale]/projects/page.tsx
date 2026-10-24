import type { Metadata } from 'next';
import Image from 'next/image';
import { StudyVisual } from '@/components/art/StudyVisual';
import { HeroShell } from '@/components/site/HeroShell';
import { ActionLink } from '@/components/ui/Action';
import { DisclosureTag } from '@/components/ui/DisclosureTag';
import { ImageDisclosure } from '@/components/ui/ImageDisclosure';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { JsonLd } from '@/components/site/JsonLd';
import { getDictionary } from '@/lib/dictionary';
import { itemListLd } from '@/lib/jsonld';
import { pageMetadata } from '@/lib/metadata';

export async function generateMetadata({ params }: PageProps<'/[locale]/projects'>): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  return pageMetadata({
    locale: locale as never,
    path: '/projects',
    title: 'Projects & Capabilities',
    description:
      'Illustrative capability studies across resort, leisure, hospitality and installation work — showing how AQUASEE scopes, designs and delivers bespoke projects.',
  });
}

export default async function ProjectsPage({ params }: PageProps<'/[locale]/projects'>) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const capabilityStudies = dict.studies;
  const disclosureNote = dict.about.processNote;
  const audiences = dict.collaboration.audiences;
  const materials = dict.materials;
  const ui = dict.ui;
  return (
    <>
      {/* ---- Hero ---------------------------------------------------------- */}
      <HeroShell
        art="/images/aquasee-key-projects.webp"
        artAlt={ui.projects.artAlt}
        caption={ui.home.heroCaption}
        mobilePosition="72%"
        priority
      >
        <div className="order-1 px-[clamp(1.25rem,4vw,3.5rem)] pb-10 pt-[4.5rem] lg:col-span-6 lg:col-start-1 lg:row-start-1 lg:px-0 lg:pb-0 lg:pt-0">
          <p className="hero-enter hero-enter-1 flex items-center gap-3 font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-aqua">
            <span aria-hidden="true" className="h-px w-10 bg-aqua/70" />{ui.projects.eyebrow}</p>

          <h1 className="hero-enter hero-enter-2 mt-7 font-display text-[length:var(--text-cap)] font-normal leading-[1.03] tracking-[-0.025em] text-on-dark-strong">{ui.projects.title}</h1>

          <p className="hero-enter hero-enter-3 mt-7 max-w-xl text-[1.0625rem] leading-relaxed text-on-dark sm:text-lg">{ui.projects.lede}</p>

          <div className="hero-enter hero-enter-4 mt-9">
            <ActionLink href="/contact" size="lg">{ui.global.startProject}</ActionLink>
          </div>
        </div>
      </HeroShell>

      {/* ---- Project material ---------------------------------------------- */}
      <section className="bg-paper pb-16 sm:pb-20 lg:pb-24">
        <div className="shell">
          <Reveal>
            <p className="eyebrow text-accent">{ui.projects.materialsEyebrow}</p>
            <h2 className="mt-5 max-w-3xl text-title">{ui.projects.materialsTitle}</h2>
            <p className="mt-5 max-w-3xl text-[0.9375rem] leading-relaxed text-body">
              {ui.projects.materialsIntro}
            </p>
          </Reveal>

          <div className="mt-12 grid gap-10 md:grid-cols-2 lg:gap-12">
            {materials.map((material, i) => (
              <Reveal key={material.slug} delay={i * 60}>
                <figure>
                  <div className="relative aspect-[16/10] overflow-hidden bg-ink">
                    <Image
                      src={material.image.src}
                      alt={material.image.alt}
                      fill
                      sizes="(min-width: 1024px) 46vw, 100vw"
                      className="object-cover"
                    />
                    <span className="absolute left-5 top-5 rounded-full border border-white/20 bg-ink/70 px-3 py-1 font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-on-dark backdrop-blur-sm">
                      {material.stage}
                    </span>
                  </div>
                  <p className="mt-4 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-accent">
                    {material.discipline}
                  </p>
                  <h3 className="mt-2 text-[1.25rem] leading-snug text-ink">{material.title}</h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-body">
                    {material.description}
                  </p>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Disclosure ---------------------------------------------------- */}
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
                <p className="text-[0.9375rem] font-medium text-ink">{ui.projects.aboutVisuals}</p>
                <p className="mt-2 max-w-4xl text-[0.9375rem] leading-relaxed text-body">
                  {disclosureNote}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---- Index ---------------------------------------------------------- */}
      <section className="bg-paper pt-16 sm:pt-20">
        <div className="shell">
          <Reveal>
            <ol className="grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
              {capabilityStudies.map((study, i) => (
                <li key={study.slug} className="bg-paper">
                  <a
                    href={`#${study.slug}`}
                    className="group flex items-baseline gap-4 p-5 transition-colors duration-300 hover:bg-accent-tint"
                  >
                    <span className="font-mono text-[0.625rem] tracking-[0.16em] text-accent">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[0.9375rem] leading-snug text-ink">{study.title}</span>
                  </a>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* ---- Studies -------------------------------------------------------- */}
      <section className="bg-paper py-16 sm:py-20 lg:py-24">
        <div className="shell">
          <div className="space-y-20 lg:space-y-28">
            {capabilityStudies.map((study, i) => {
              const flipped = i % 2 === 1;
              return (
                <article
                  key={study.slug}
                  id={study.slug}
                  className="grid scroll-mt-24 gap-10 lg:grid-cols-12 lg:gap-14"
                >
                  <Reveal
                    className={`lg:col-span-6 ${flipped ? 'lg:col-start-7' : 'lg:col-start-1'}`}
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-ink">
                      <StudyVisual
                        visual={study.visual}
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className="transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.03]"
                      />
                      <div className="absolute inset-x-5 bottom-5">
                        <ImageDisclosure>{study.disclosure}</ImageDisclosure>
                      </div>
                    </div>
                  </Reveal>

                  <Reveal
                    delay={100}
                    className={`lg:col-span-6 ${flipped ? 'lg:col-start-1 lg:row-start-1' : 'lg:col-start-7'}`}
                  >
                    <div className="flex items-baseline gap-4">
                      <span className="font-display text-[2.25rem] leading-none text-accent">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-muted">
                        {study.discipline}
                      </p>
                    </div>

                    <h2 className="mt-5 text-title">{study.title}</h2>
                    <p className="mt-3 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-muted">
                      {study.scale}
                    </p>
                    <p className="mt-6 text-[1.0625rem] leading-[1.7] text-body">{study.summary}</p>

                    <div className="mt-8 border-t border-line pt-6">
                      <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-muted">
                        Scope
                      </p>
                      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                        {study.scope.map((s) => (
                          <li
                            key={s}
                            className="flex gap-2.5 text-[0.9375rem] leading-relaxed text-ink"
                          >
                            <span
                              aria-hidden="true"
                              className="mt-[0.5rem] h-1 w-1 shrink-0 rounded-full bg-accent"
                            />
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
              );
            })}
          </div>
        </div>
      </section>

      {/* ---- Sectors -------------------------------------------------------- */}
      <section className="bg-sand py-20 sm:py-24 lg:py-28">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <SectionHeader
                eyebrow="Sectors"
                title="Who we work with."
                lede="We are set up for international projects where integrated creative, technical and manufacturing support is genuinely useful."
              />
              <ActionLink href="/contact" className="mt-9">{ui.global.startProject}</ActionLink>
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

      <JsonLd
        data={itemListLd(
          capabilityStudies.map((study) => ({
            name: study.title,
            url: `${dict.site.url}/projects#${study.slug}`,
          })),
          'Capability studies',
        )}
      />
    </>
  );
}



