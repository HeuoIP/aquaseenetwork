import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CommercialInquiryForm } from '@/components/contact/CommercialInquiryForm';
import { pageMetadata } from '@/lib/metadata';
export function generateStaticParams() { return [{ locale: 'en' }]; }
export async function generateMetadata({ params }: PageProps<'/[locale]/dealer-program'>): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== 'en') return { robots: { index: false } };
  return pageMetadata({ locale: 'en', path: '/dealer-program', title: 'Dealer Application | AQUASEE', description: 'Apply to discuss a dealer relationship for design-led pool and water-play products. Every application is reviewed individually.' });
}
export default async function DealerPage({ params }: PageProps<'/[locale]/dealer-program'>) {
  if ((await params).locale !== 'en') notFound();
  return <><section className="bg-ink pt-[4.5rem] text-paper"><div className="shell py-16 lg:py-24"><p className="eyebrow text-aqua">Partnership / Sales</p><h1 className="mt-5 font-display text-[clamp(3rem,6vw,5rem)] text-on-dark-strong">Dealer Program</h1><p className="mt-5 max-w-2xl text-lg text-on-dark">We are interested in experienced local sales partners who understand pools, hospitality and their customers. Terms and territories are discussed only after review.</p></div></section><section className="bg-paper py-16 lg:py-24"><div className="shell max-w-4xl"><CommercialInquiryForm type="dealer_application" /></div></section></>;
}
