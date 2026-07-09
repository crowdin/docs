import { slug as githubSlug } from 'github-slugger';

import en from '../content/i18n/en.json';
import de from '../content/i18n/de.json';
import da from '../content/i18n/da.json';
import fr from '../content/i18n/fr.json';
import pt from '../content/i18n/pt-PT.json';
import es from '../content/i18n/es-ES.json';
import tr from '../content/i18n/tr-TR.json';
import zh from '../content/i18n/zh-CN.json';

export const englishOnlyPages: readonly string[] = [
  'terms',
  'privacy-policy',
  'security-policy',
  'sub-processors',
];

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

/*
  In content-layer collections the entry `id` *is* Starlight's routing slug (there is no top-level `slug`).
  The glob loader builds that id from the frontmatter `slug` when present, dropping the locale folder prefix for pages
  shipped untranslated from the CMS - these helpers restore it. `entry` is the file path relative to src/content/docs (e.g. `tr/foo.md`).
  Astro's default path-based id: github-slug each segment, join with `/`, strip a trailing `/index`. Mirrors `getContentEntryIdAndSlug`
*/
export function slugFromPath(filePath: string): string {
  const withoutExt = filePath.replace(/\.[^/.]+$/, '');
  return withoutExt
    .split('/')
    .map(segment => githubSlug(segment))
    .join('/')
    .replace(/\/index$/, '');
}

export function getBaseDocId(entry: string, frontmatterSlug?: unknown): string {
  return frontmatterSlug
    ? String(frontmatterSlug).replace(/^\/+/, '')
    : slugFromPath(entry);
}

export function localizeDocId(
  entry: string,
  id: string,
  localizedLocales: readonly string[],
): string {
  const localeSegment = entry.split('/')[0];

  if (
    localizedLocales.includes(localeSegment) &&
    id !== localeSegment &&
    !id.startsWith(`${localeSegment}/`)
  ) {
    return `${localeSegment}/${id}`;
  }

  return id;
}

// Whether a route id (e.g. `terms` or the `zh/terms` fallback) is an English-only page.
export function isEnglishOnlyPage(routeId: string): boolean {
  const [first, ...rest] = routeId.split('/');
  const base = first in starlightLocales ? rest.join('/') : routeId;
  return englishOnlyPages.includes(base);
}
