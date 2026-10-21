import type { MetadataRoute } from 'next';
import { site } from '@/content/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, '');
  const routes = [
    { path: '/', priority: 1, changeFrequency: 'monthly' as const },
    { path: '/strategy', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/creative-design', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/supply-chain', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/projects', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/contact', priority: 0.9, changeFrequency: 'monthly' as const },
  ];

  const lastModified = new Date();

  return routes.map((route) => ({
    url: `${base}${route.path === '/' ? '' : route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
