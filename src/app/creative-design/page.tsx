import type { Metadata } from 'next';
import { ServicePage } from '@/components/service/ServicePage';
import { getService } from '@/content/services';

const service = getService('creative-design');

export const metadata: Metadata = {
  title: service.title,
  description: service.lede,
  alternates: { canonical: '/creative-design' },
  openGraph: {
    title: service.title + ' — AQUASEE',
    description: service.lede,
    url: '/creative-design',
  },
};

export default function Page() {
  return <ServicePage service={service} />;
}
