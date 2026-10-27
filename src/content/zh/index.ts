import type { Dictionary } from '@/content/types';
import { about } from './about';
import { collaborationModel, audiences } from './collaboration';
import { contact } from './contact';
import { faq } from './faq';
import { home } from './home';
import { insights } from './insights';
import { processSteps } from './process';
import { capabilityStudies, disclosureNote, materials } from './projects';
import { serviceDetails } from './services';
import { site } from './site';
import { ui } from './ui';

export const disclosure = disclosureNote;

/**
 * 中文内容。
 *
 * 洞察库以整语言发布，不做半成品：今天中文有一篇，语言切换器、站点地图
 * 与 hreflang 就只跟随这一篇真正存在的文章，其余文章留给以后补齐。
 */
export const dictionary: Dictionary = {
  locale: 'zh',
  ui,
  site,
  home,
  contact,
  services: serviceDetails,
  studies: capabilityStudies,
  materials,
  process: processSteps,
  collaboration: { model: collaborationModel, audiences },
  about,
  faq,
  insights,
};