import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CommercialInquiryForm } from '@/components/contact/CommercialInquiryForm';
import { pageMetadata } from '@/lib/metadata';

type Props = PageProps<'/[locale]/inquiry/[kind]'>;
const kinds = { business: { type: 'b2b_project' as const, title: 'Commercial Project Inquiry', lede: 'For pool designers, hospitality teams and leisure venues.' }, personal: { type: 'b2c_product' as const, title: 'Private Pool Inquiry', lede: 'For private pool and villa owners.' } };
export function generateStaticParams() { return Object.keys(kinds).map((kind) => ({ locale: 'en', kind })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, kind } = await params;
  const item = locale === 'en' ? kinds[kind as keyof typeof kinds] : null;
  if (!item) return { robots: { index: false } };
  return pageMetadata({ locale: 'en', path: `/inquiry/${kind}`, title: `${item.title} | AQUASEE`, description: `${item.lede} Share your site and product interests with AQUASEE for review.` });
}
export default async function InquiryPage({ params }: Props) {
  const { locale, kind } = await params;
  const item = locale === 'en' ? kinds[kind as keyof typeof kinds] : null;
  if (!item) notFound();
  return <><section className="bg-ink pt-[4.5rem] text-paper"><div className="shell py-16 lg:py-24"><p className="eyebrow text-aqua">AQUASEE / Enquiry</p><h1 className="mt-5 font-display text-[clamp(3rem,6vw,5rem)] text-on-dark-strong">{item.title}</h1><p className="mt-5 text-lg text-on-dark">{item.lede}</p></div></section><section className="bg-paper py-16 lg:py-24"><div className="shell max-w-4xl"><CommercialInquiryForm type={item.type} /></div></section></>;
}
