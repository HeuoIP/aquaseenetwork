import type { Metadata } from 'next';
import { ServicePage } from '@/components/service/ServicePage';
import { getService } from '@/content/services';

const service = getService('strategy');

export const metadata: Metadata = {
  title: service.title,
  description: service.lede,
  alternates: { canonical: '/strategy' },
  openGraph: {
    title: service.title + ' — AQUASEE',
    description: service.lede,
    url: '/strategy',
  },
};

export default function Page() {
  return <ServicePage service={service} />;
}
