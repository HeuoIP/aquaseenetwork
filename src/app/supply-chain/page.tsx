import type { Metadata } from 'next';
import { ServicePage } from '@/components/service/ServicePage';
import { getService } from '@/content/services';

const service = getService('supply-chain');

export const metadata: Metadata = {
  title: service.title,
  description: service.lede,
  alternates: { canonical: '/supply-chain' },
  openGraph: {
    title: service.title + ' — AQUASEE',
    description: service.lede,
    url: '/supply-chain',
  },
};

export default function Page() {
  return <ServicePage service={service} />;
}
