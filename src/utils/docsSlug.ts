import { slug as githubSlug } from 'github-slugger';

// In content-layer collections the entry `id` *is* Starlight's routing slug
// (there is no top-level `slug`). The glob loader builds that id from the
// frontmatter `slug` when present, dropping the locale folder prefix for pages
// shipped untranslated from the CMS — these helpers restore it. `entry` is the
// file path relative to src/content/docs (e.g. `tr/foo.md`).

// Astro's default path-based id: github-slug each segment, join with `/`, strip a trailing `/index`. Mirrors `getContentEntryIdAndSlug`
export function slugFromPath(filePath: string): string {
  const withoutExt = filePath.replace(/\.[^/.]+$/, '');
  return withoutExt
    .split('/')
    .map(segment => githubSlug(segment))
    .join('/')
    .replace(/\/index$/, '');
}

// Base id, matching the glob loader's `generateIdDefault`: explicit frontmatter slug verbatim (leading slashes stripped), else derived from the path.
export function getBaseDocId(entry: string, frontmatterSlug?: unknown): string {
  return frontmatterSlug
    ? String(frontmatterSlug).replace(/^\/+/, '')
    : slugFromPath(entry);
}

// Re-applies the `<locale>/` prefix to a localized id when it's missing (the locale landing page, e.g. `tr`, is left untouched).
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
