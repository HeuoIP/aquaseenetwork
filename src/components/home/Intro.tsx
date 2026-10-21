import { Reveal } from '@/components/ui/Reveal';
import { SectionHeader } from '@/components/ui/SectionHeader';

export function Intro() {
  return (
    <section className="bg-paper py-20 sm:py-24 lg:py-32">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow text-accent">Who We Are</p>
            <h2 className="mt-5 text-title">
              A single team spanning strategy, design and delivery.
            </h2>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-7">
            <div className="space-y-6 text-[1.0625rem] leading-[1.75] text-body">
              <p>
                AQUASEE helps developers, design firms and project teams turn ambitious ideas into
                achievable projects. We connect strategic planning, creative design, product
                development and coordinated delivery under one roof of responsibility.
              </p>
              <p>
                We are deliberately not a factory and we do not present ourselves as one. We work
                with external specialists and qualified manufacturing partners, selecting the right
                capability for each requirement and holding it to a single brief.
              </p>
              <p>
                What that produces is simple: fewer handoffs, fewer gaps between the drawing and
                the site, and a project that keeps its intent from first sketch to final handover.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4 border-t border-line pt-8">
              {[
                'Developers & destination projects',
                'Hospitality & tourism operators',
                'Landscape & design practices',
                'Themed leisure & installations',
              ].map((item) => (
                <p key={item} className="flex items-start gap-2.5 text-[0.875rem] text-ink">
                  <span aria-hidden="true" className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-accent" />
                  {item}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

