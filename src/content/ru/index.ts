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
 * Русский контент.
 *
 * Библиотека разборов выходит на русском целиком, а не частями: на сегодня
 * опубликована одна статья, и за ней следуют переключатель языка, карта
 * сайта и hreflang.
 */
export const dictionary: Dictionary = {
  locale: 'ru',
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