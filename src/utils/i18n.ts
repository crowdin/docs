import { sidebar as defaultSidebar } from '../content/sidebars/i18n/en';
import { sidebar as translatedSidebar } from '../content/sidebars/i18n/de-DE';

export type SidebarTranslationKey = keyof typeof defaultSidebar;
const deSidebar: Record<SidebarTranslationKey, string> = translatedSidebar;

export function sidebarLabel(key: SidebarTranslationKey) {
  return {
    label: defaultSidebar[key],
    translations: {
      'de-DE': deSidebar[key],
    },
  };
}
