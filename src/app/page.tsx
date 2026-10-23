import { Collaboration } from '@/components/home/Collaboration';
import { CtaBand } from '@/components/home/CtaBand';
import { Hero } from '@/components/home/Hero';
import { Intro } from '@/components/home/Intro';
import { Pillars } from '@/components/home/Pillars';
import { Process } from '@/components/home/Process';
import type { Metadata } from 'next';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: `${site.name} — ${site.tagline}`,
  description: site.shortDescription,
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <Pillars />
      <Process />
      <Collaboration />
      <CtaBand />
    </>
  );
}
