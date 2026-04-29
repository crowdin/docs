import en from '../content/i18n/en.json';
import de from '../content/i18n/de.json';
import da from '../content/i18n/da.json';
import fr from '../content/i18n/fr.json';
import pt from '../content/i18n/pt.json';
import es from '../content/i18n/es.json';

export const starlightLocales = {
  root: { label: 'English',  lang: 'en' },
  'de': { label: 'Deutsch', lang: 'de' },
  'da': { label: 'Dansk', lang: 'da' },
  'fr': { label: 'Français', lang: 'fr' },
  'pt': { label: 'Português (Portugal)', lang: 'pt-PT' },
  'es': { label: 'Español', lang: 'es-ES' },
} as const;

export type SidebarTranslationKey = keyof typeof en.sidebar;

export function sidebarLabel(key: SidebarTranslationKey) {
  return {
    label: en.sidebar[key],
    translations: {
      'de': de.sidebar[key],
      'da': da.sidebar[key],
      'fr': fr.sidebar[key],
      'pt': pt.sidebar[key],
      'es': es.sidebar[key],
    },
  };
}
