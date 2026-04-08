import deDE from '../content/i18n/de-DE.json';
import en from '../content/i18n/en.json';

export type SidebarTranslationKey = keyof typeof en.sidebar;

export function sidebarLabel(key: SidebarTranslationKey) {
  return {
    label: en.sidebar[key],
    translations: {
      'de-DE': deDE.sidebar[key],
    },
  };
}
