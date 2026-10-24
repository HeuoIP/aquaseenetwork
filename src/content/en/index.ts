import type { Dictionary } from '@/content/types';
import { about } from './about';
import { collaborationModel, audiences } from './collaboration';
import { contact } from './contact';
import { faq } from './faq';
import { home } from './home';
import { insights } from './insights';
import { processSteps } from './process';
import { capabilityStudies, disclosureNote } from './projects';
import { serviceDetails } from './services';
import { site } from './site';
import { ui } from './ui';

export const disclosure = disclosureNote;

export const dictionary: Dictionary = {
  locale: 'en',
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
  insights,
};