import type { Metadata } from 'next';
import { Collaboration } from '@/components/home/Collaboration';
import { CtaBand } from '@/components/home/CtaBand';
import { Hero } from '@/components/home/Hero';
import { Intro } from '@/components/home/Intro';
import { Pillars } from '@/components/home/Pillars';
import { Process } from '@/components/home/Process';
import { ProductFocus } from '@/components/home/ProductFocus';
import { ProductPrinciples } from '@/components/home/ProductPrinciples';
import { getDictionary } from '@/lib/dictionary';
import { pageMetadata } from '@/lib/metadata';
import Link from 'next/link';
import Image from 'next/image';
import { ImageDisclosure } from '@/components/ui/ImageDisclosure';

export async function generateMetadata({ params }: PageProps<'/[locale]'>): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  return pageMetadata({
    locale: locale as never,
    path: '/',
    title: `${dict.site.name} — ${dict.site.tagline}`,
    description: dict.site.shortDescription,
  });
}

export default async function HomePage({ params }: PageProps<'/[locale]'>) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <>
      <Hero copy={dict.home.hero} ui={dict.ui} locale={locale as never} />
      <Intro
        copy={dict.home.intro}
        illustrationLabel={dict.locale === 'en' ? 'AI concept' : dict.ui.service.galleryIllustration}
        note={dict.ui.home.galleryNote}
      />
      {dict.locale === 'en' && dict.products ? (
        <>
          <ProductFocus categories={dict.products.categories} locale={dict.locale} />
          <section className="bg-paper py-16 lg:py-24"><div className="shell">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><p className="eyebrow text-accent">More to explore</p><h2 className="mt-4 text-title">Ideas across different settings.</h2></div><Link href="/concept-collection" className="font-medium text-accent underline underline-offset-4">Explore all concepts →</Link></div>
            <div className="mt-9 grid gap-4 md:grid-cols-3">
              {[
                { src: '/images/concepts/mj82-metal-slide-scene-v1.webp', alt: 'AI study of a metal slide at a landscaped pool.', label: 'Pool Slides', href: '/collections/pool-slides' },
                { src: '/images/concepts/mj82-play-shade-scene-v1.webp', alt: 'AI study of fabric sails over an outdoor play area.', label: 'Outdoor Shade', href: '/collections/pool-shade' },
                { src: '/images/concepts/splash-cloud-rain-v1.webp', alt: 'AI study of a cloud-shaped splash feature.', label: 'Splash Play', href: '/collections/splash-play-facilities' },
              ].map((study) => <Link href={study.href} key={study.src} className="group block"><div className="relative aspect-[4/3] overflow-hidden bg-sand"><Image src={study.src} alt={study.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" /><ImageDisclosure className="absolute bottom-3 left-3">AI concept visualisation</ImageDisclosure></div><p className="mt-3 font-display text-2xl text-ink">{study.label} →</p></Link>)}
            </div>
          </div></section>
          <ProductPrinciples />
          <section className="bg-ink py-16 text-paper lg:py-24"><div className="shell">
            <p className="eyebrow text-aqua">Choose your route</p>
            <h2 className="mt-5 max-w-3xl text-title text-on-dark-strong">Tell us what you are planning.</h2>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { href: '/inquiry/business', title: 'Commercial project', body: 'For hospitality, leisure and pool professionals.' },
                { href: '/inquiry/personal', title: 'Private pool', body: 'For homeowners and villa pools.' },
                { href: '/dealer-program', title: 'Dealer', body: 'Apply to discuss a sales relationship.' },
                { href: '/installation-partners', title: 'Installation partner', body: 'Introduce local installation capability.' },
              ].map((route) => <Link key={route.href} href={route.href} className="group border border-white/20 p-6 transition-colors hover:bg-white/10"><h3 className="font-display text-2xl text-on-dark-strong">{route.title}</h3><p className="mt-3 text-sm text-on-dark">{route.body}</p><span className="mt-6 block text-aqua">Explore →</span></Link>)}
            </div>
          </div></section>
        </>
      ) : (
        <>
          <Pillars services={dict.services} locale={locale as never} ui={dict.ui} />
          <Process
            steps={dict.process}
            copy={dict.home.process}
            illustrationLabel={dict.ui.service.galleryIllustration}
            note={dict.ui.home.galleryNote}
          />
          <Collaboration
            model={dict.collaboration.model}
            audiences={dict.collaboration.audiences}
            copy={dict.home.collaboration}
          />
        </>
      )}
      {dict.locale === 'en' ? <section className="bg-sand py-16"><div className="shell flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"><div><p className="eyebrow text-accent">Design exploration</p><h2 className="mt-3 text-title">See the Concept Collection.</h2><p className="mt-3 text-body">Clearly labelled studies, separate from products available to order.</p></div><Link className="bg-accent px-6 py-3 text-paper" href="/concept-collection">View concepts →</Link></div></section> : <CtaBand copy={dict.home.cta} email={dict.site.contact.email} />}
    </>
  );
}
