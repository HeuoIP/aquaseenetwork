import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CommercialInquiryForm } from '@/components/contact/CommercialInquiryForm';
import { pageMetadata } from '@/lib/metadata';
export function generateStaticParams() { return [{ locale: 'en' }]; }
export async function generateMetadata({ params }: PageProps<'/[locale]/installation-partners'>): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== 'en') return { robots: { index: false } };
  return pageMetadata({ locale: 'en', path: '/installation-partners', title: 'Installation Partner Application | AQUASEE', description: 'Introduce your local pool, shade or water-play installation capability to AQUASEE for review.' });
}
export default async function InstallationPage({ params }: PageProps<'/[locale]/installation-partners'>) {
  if ((await params).locale !== 'en') notFound();
  return <><section className="bg-ink pt-[4.5rem] text-paper"><div className="shell py-16 lg:py-24"><p className="eyebrow text-aqua">Partnership / Local delivery</p><h1 className="mt-5 font-display text-[clamp(3rem,6vw,5rem)] text-on-dark-strong">Installation Partners</h1><p className="mt-5 max-w-2xl text-lg text-on-dark">Local installation capability matters. Tell us about your experience, qualifications, insurance and service area so we can assess fit for future projects.</p></div></section><section className="bg-paper py-16 lg:py-24"><div className="shell max-w-4xl"><CommercialInquiryForm type="installation_partner_application" /></div></section></>;
}
