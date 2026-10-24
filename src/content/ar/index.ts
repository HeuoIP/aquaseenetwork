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
 * المحتوى العربي.
 *
 * لا توجد مكتبة الرؤى بالعربية بعد، فتكون `insights` فارغة ولا يظهر مدخل
 * "رؤى" في التنقل. والرؤى تُنشر بلغتها فقط، ف نشر نموذج قبل ترجمته يعني
 * نشر صفحة لا يمكن قراءتها.
 */
export const dictionary: Dictionary = {
  locale: 'ar',
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