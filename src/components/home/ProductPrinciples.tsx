import { Reveal } from '@/components/ui/Reveal';

const principles = [
  {
    title: 'Fit before finish',
    body: 'A product earns its place when the dimensions, use and setting work together. The visual direction comes after that first check.',
  },
  {
    title: 'Standardise what matters',
    body: 'Clear interfaces and repeatable product logic make it easier to compare options, plan installation and maintain the result.',
  },
  {
    title: 'Say what needs checking',
    body: 'Site conditions, local requirements and supply boundaries are part of the decision. They stay visible before a quote is accepted.',
  },
  {
    title: 'Prepare for the real place',
    body: 'Pool edge, access, drainage, shade, climate and maintenance shape the right product as much as the image does.',
  },
] as const;

export function ProductPrinciples() {
  return (
    <section className="bg-ink py-20 text-on-dark sm:py-24 lg:py-32" id="approach">
      <div className="shell">
        <Reveal>
          <p className="eyebrow text-aqua">How to choose</p>
          <h2 className="mt-5 max-w-3xl font-display text-[clamp(2rem,4.4vw,3.75rem)] leading-tight text-on-dark-strong">
            The product is only right when the place is right for it.
          </h2>
          <p className="mt-6 max-w-2xl text-[1.0625rem] leading-relaxed text-on-dark">
            AQUASEE keeps the collection focused so the important questions are easier to answer before a product is specified or quoted.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-px overflow-hidden rounded-sm border border-white/10 bg-white/10 sm:grid-cols-2">
          {principles.map((principle, index) => (
            <Reveal key={principle.title} delay={index * 70} className="bg-ink">
              <div className="h-full p-7 transition-colors duration-500 hover:bg-ink-2 lg:p-8">
                <span className="font-display text-[2rem] leading-none text-aqua">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="mt-6 font-display text-[1.35rem] text-on-dark-strong">{principle.title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-on-dark/80">{principle.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
