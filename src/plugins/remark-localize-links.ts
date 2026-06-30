import { visit } from 'unist-util-visit';
import type { Root } from 'mdast';
import type { VFile } from 'vfile';
import { starlightLocales } from '../utils/i18n.ts';

const localizedLocales = Object.keys(starlightLocales).filter(locale => locale !== 'root');

// Redoc API reference pages aren't localized, so their links must stay un-prefixed.
const API_DOCS_PATH = /^\/developer\/(enterprise\/)?api\/v2(\/|$)/;

// Prefix the page locale onto an internal page link that lacks one. Leaves external,
// anchor, relative, already-prefixed, asset, and API-reference links untouched.
export function localizeLinkHref(
  href: string,
  locale: string,
  locales: readonly string[],
): string {
  // Root-relative only (skips external, `//`, anchors, mailto, relative).
  if (!href.startsWith('/') || href.startsWith('//')) {
    return href;
  }

  const splitAt = href.search(/[#?]/);
  const path = splitAt === -1 ? href : href.slice(0, splitAt);

  if (locales.includes(path.split('/')[1])) {
    return href; // already locale-prefixed
  }

  if (API_DOCS_PATH.test(path)) {
    return href;
  }

  // A file extension in the last segment means an asset, not a page.
  if ((path.split('/').pop() ?? '').includes('.')) {
    return href;
  }

  return `/${locale}${href}`;
}

const DOCS_ROOT = 'content/docs/';

// Locale folder of a source file (e.g. `tr`), or null for default-locale/English pages.
function pageLocale(file: VFile): string | null {
  const path = String(file.path ?? file.history.at(-1) ?? '').replaceAll('\\', '/');
  const index = path.indexOf(DOCS_ROOT);
  if (index === -1) {
    return null;
  }

  const segment = path.slice(index + DOCS_ROOT.length).split('/')[0];
  return localizedLocales.includes(segment) ? segment : null;
}

// Safety net: locale-prefix internal page links in localized content. Covers markdown
// `link` nodes and the `href` of any MDX JSX element (`<a>`, `<LinkCard>`, `<LinkButton>`).
export default function remarkLocalizeLinks() {
  return (tree: Root, file: VFile) => {
    const locale = pageLocale(file);
    if (!locale) {
      return;
    }

    visit(tree, 'link', node => {
      node.url = localizeLinkHref(node.url, locale, localizedLocales);
    });

    visit(tree, ['mdxJsxFlowElement', 'mdxJsxTextElement'], (node: any) => {
      for (const attr of node.attributes ?? []) {
        if (attr.type === 'mdxJsxAttribute' && attr.name === 'href' && typeof attr.value === 'string') {
          attr.value = localizeLinkHref(attr.value, locale, localizedLocales);
        }
      }
    });
  };
}
