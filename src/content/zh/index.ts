import type { Dictionary } from '@/content/types';
import { about } from './about';
import { collaborationModel, audiences } from './collaboration';
import { contact } from './contact';
import { faq } from './faq';
import { home } from './home';
import { processSteps } from './process';
import { capabilityStudies, disclosureNote } from './projects';
import { serviceDetails } from './services';
import { site } from './site';
import { ui } from './ui';

export const disclosure = disclosureNote;

/**
 * 中文内容。
 *
 * 洞察库尚未发布中文版，因此 `insights` 为 null，导航中也不出现“洞察”
 * 入口：语言切换器、站点地图与 hreflang 全部只跟随已发布的语言。
 */
export const dictionary: Dictionary = {
  locale: 'zh',
  ui,
  site,
  home,
  contact,
  services: serviceDetails,
  studies: capabilityStudies,
  process: processSteps,
  collaboration: { model: collaborationModel, audiences },
  about,
  faq,
  insights: null,
};