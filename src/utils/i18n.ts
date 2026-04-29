import en from '../content/strings/en.json';
import de from '../content/strings/de.json';
import da from '../content/strings/da.json';
import fr from '../content/strings/fr.json';
import pt from '../content/strings/pt.json';
import es from '../content/strings/es.json';

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
