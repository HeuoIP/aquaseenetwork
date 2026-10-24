import type { SiteConfig } from '@/content/types';

/**
 * 品牌、导航与联系方式 —— 中文。
 *
 * 导航项与英文版一一对应。洞察库尚未发布中文版，因此导航中不出现
 * “洞察”入口：不发布，就不链接。
 */
export const site: SiteConfig = {
  name: 'AQUASEE',
  legalName: 'AQUASEE',
  domain: 'aquasee.art',
  canonicalHost: 'www.aquasee.art',
  url: 'https://www.aquasee.art',
  tagline: '前期策划 · 创意设计 · 项目落地',
  shortDescription:
    '一家总部位于中国、服务于海外项目服务型企业——为文旅、公共空间与儿童游乐项目提供前期策划咨询、创意设计与研发，以及结构化的供应链与交付。',
  contact: {
    email: 'victor@aquasee.art',
    location: '总部位于中国，与全球客户合作',
    phone: '',
  },
  social: [],
  nav: [
    { href: '/strategy', label: '前期策划咨询' },
    { href: '/creative-design', label: '创意设计与研发' },
    { href: '/supply-chain', label: '供应链与交付' },
    { href: '/projects', label: '项目与能力' },
    { href: '/about', label: '关于我们' },
    { href: '/faq', label: '常见问题' },
    { href: '/contact', label: '联系我们' },
  ],
  ctaLabel: '启动一个项目',
  marketsLine: '总部在中国，与亚洲、海湾、欧洲和非洲的客户合作。',
};