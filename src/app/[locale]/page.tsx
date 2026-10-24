import type { Metadata } from 'next';
import { Collaboration } from '@/components/home/Collaboration';
import { CtaBand } from '@/components/home/CtaBand';
import { Hero } from '@/components/home/Hero';
import { Intro } from '@/components/home/Intro';
import { Pillars } from '@/components/home/Pillars';
import { Process } from '@/components/home/Process';
import { getDictionary } from '@/lib/dictionary';
import { pageMetadata } from '@/lib/metadata';

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
      <Hero copy={dict.home.hero} ui={dict.ui} />
      <Intro copy={dict.home.intro} />
      <Pillars services={dict.services} locale={locale as never} ui={dict.ui} />
      <Process steps={dict.process} copy={dict.home.process} />
      <Collaboration
        model={dict.collaboration.model}
        audiences={dict.collaboration.audiences}
        copy={dict.home.collaboration}
      />
      <CtaBand copy={dict.home.cta} email={dict.site.contact.email} />
    </>
  );
}