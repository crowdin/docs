import { describe, it, expect } from 'vitest';
import { slugFromPath, getBaseDocId, localizeDocId } from './docsSlug';

const LOCALES = ['de', 'da', 'fr', 'pt', 'es', 'tr'];

describe('slugFromPath', () => {
  it('strips the file extension', () => {
    expect(slugFromPath('getting-started.md')).toBe('getting-started');
    expect(slugFromPath('getting-started.mdx')).toBe('getting-started');
  });

  it('keeps nested path segments joined by "/"', () => {
    expect(slugFromPath('crowdin/billing/plans.mdx')).toBe('crowdin/billing/plans');
  });

  it('github-slugs each segment (lowercase, spaces to hyphens)', () => {
    expect(slugFromPath('Crowdin/Getting Started.md')).toBe('crowdin/getting-started');
  });

  it('strips a trailing "/index"', () => {
    expect(slugFromPath('crowdin/index.md')).toBe('crowdin');
    expect(slugFromPath('tr/crowdin/index.md')).toBe('tr/crowdin');
  });

  it('leaves a root-level "index" as-is (no leading slash to strip)', () => {
    expect(slugFromPath('index.md')).toBe('index');
  });
});

describe('getBaseDocId', () => {
  it('uses an explicit frontmatter slug verbatim', () => {
    expect(getBaseDocId('tr/foo.md', 'changing-subscription-plan')).toBe('changing-subscription-plan');
  });

  it('strips leading slashes from a frontmatter slug', () => {
    expect(getBaseDocId('tr/foo.md', '/foo/bar')).toBe('foo/bar');
    expect(getBaseDocId('tr/foo.md', '///foo')).toBe('foo');
  });

  it('derives the id from the path when no frontmatter slug is set', () => {
    expect(getBaseDocId('tr/crowdin/billing/plans.mdx')).toBe('tr/crowdin/billing/plans');
    expect(getBaseDocId('crowdin/index.md', undefined)).toBe('crowdin');
  });

  it('falls back to the path for an empty-string slug (matches the glob loader)', () => {
    expect(getBaseDocId('tr/foo.md', '')).toBe('tr/foo');
  });
});

describe('localizeDocId', () => {
  it('re-applies a missing locale prefix (the CMS / untranslated-slug case)', () => {
    expect(localizeDocId('tr/foo.md', 'changing-subscription-plan', LOCALES)).toBe(
      'tr/changing-subscription-plan',
    );
  });

  it('leaves an already-prefixed id untouched', () => {
    expect(localizeDocId('tr/foo.md', 'tr/changing-subscription-plan', LOCALES)).toBe(
      'tr/changing-subscription-plan',
    );
  });

  it('leaves a path-derived localized id untouched', () => {
    expect(localizeDocId('tr/crowdin/billing/plans.mdx', 'tr/crowdin/billing/plans', LOCALES)).toBe(
      'tr/crowdin/billing/plans',
    );
  });

  it('leaves the locale landing page (id === locale) untouched', () => {
    expect(localizeDocId('tr/index.md', 'tr', LOCALES)).toBe('tr');
  });

  it('does not prefix default-locale (root) pages', () => {
    expect(localizeDocId('crowdin/billing/plans.mdx', 'crowdin/billing/plans', LOCALES)).toBe(
      'crowdin/billing/plans',
    );
  });

  it('only acts on configured locale folders', () => {
    // A top segment that merely looks like a folder but isn't a locale.
    expect(localizeDocId('developer/api.md', 'developer/api', LOCALES)).toBe('developer/api');
  });

  it('avoids the id collision between a localized page and its default-locale counterpart', () => {
    // Both files carry the same untranslated frontmatter slug.
    const enId = localizeDocId('foo.md', getBaseDocId('foo.md', 'foo'), LOCALES);
    const trId = localizeDocId('tr/foo.md', getBaseDocId('tr/foo.md', 'foo'), LOCALES);

    expect(enId).toBe('foo');
    expect(trId).toBe('tr/foo');
    expect(enId).not.toBe(trId);
  });
});
