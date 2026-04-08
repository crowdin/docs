import en from '../content/i18n/en.json';
import de from '../content/i18n/de.json';

export const starlightLocales = {
  root: {
    label: 'English',
    lang: 'en',
  },
  'de': {
    label: 'Deutsch',
    lang: 'de',
  },
} as const;

export type SidebarTranslationKey = keyof typeof en.sidebar;

export function sidebarLabel(key: SidebarTranslationKey) {
  return {
    label: en.sidebar[key],
    translations: {
      'de': de.sidebar[key],
    },
  };
}
