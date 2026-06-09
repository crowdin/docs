import en from '../content/i18n/en.json';
import de from '../content/i18n/de.json';
import da from '../content/i18n/da.json';
import fr from '../content/i18n/fr.json';
import pt from '../content/i18n/pt-PT.json';
import es from '../content/i18n/es-ES.json';
import tr from '../content/i18n/tr-TR.json';
import zh from '../content/i18n/zh-CN.json';

export const starlightLocales = {
  root: { label: 'English',  lang: 'en' },
  'de': { label: 'Deutsch', lang: 'de' },
  'da': { label: 'Dansk', lang: 'da' },
  'fr': { label: 'Français', lang: 'fr' },
  'pt': { label: 'Português (Portugal)', lang: 'pt-PT' },
  'es': { label: 'Español', lang: 'es-ES' },
  'tr': { label: 'Türkçe', lang: 'tr-TR' },
  'zh': { label: '简体中文', lang: 'zh-CN' },
} as const;

export type SidebarTranslationKey = keyof typeof en.sidebar;

export function sidebarLabel(key: SidebarTranslationKey) {
  return {
    label: en.sidebar[key],
    translations: {
      'de': de.sidebar[key],
      'da': da.sidebar[key],
      'fr': fr.sidebar[key],
      'pt-PT': pt.sidebar[key],
      'es-ES': es.sidebar[key],
      'tr-TR': tr.sidebar[key],
      'zh-CN': zh.sidebar[key],
    },
  };
}
