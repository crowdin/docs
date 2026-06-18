import { describe, it, expect } from 'vitest';
import remarkLocalizeLinks, { localizeLinkHref } from './remark-localize-links';

const LOCALES = ['de', 'da', 'fr', 'pt', 'es', 'tr', 'zh'];

// Run the plugin's transformer against a hand-built mdast tree and a fake VFile.
function run(tree: any, path: string) {
  const transformer = remarkLocalizeLinks();
  transformer(tree, { path } as any);
  return tree;
}

function tree(...children: any[]) {
  return { type: 'root', children };
}

const link = (url: string) => ({ type: 'link', url, children: [] });
const image = (url: string) => ({ type: 'image', url });
const anchor = (href: string) => jsxEl('mdxJsxTextElement', 'a', href);
const jsxEl = (type: string, name: string, href: string) => ({
  type,
  name,
  attributes: [{ type: 'mdxJsxAttribute', name: 'href', value: href }],
  children: [],
});

const DOCS = '/repo/src/content/docs';

describe('remark-localize-links', () => {
  it('prefixes a markdown link in a localized page', () => {
    const t = run(tree(link('/screenshots/')), `${DOCS}/tr/foo.md`);
    expect(t.children[0].url).toBe('/tr/screenshots/');
  });

  it('prefixes a raw <a href> (mdx jsx) in a localized page', () => {
    const t = run(tree(anchor('/github-integration/')), `${DOCS}/tr/foo.mdx`);
    expect(t.children[0].attributes[0].value).toBe('/tr/github-integration/');
  });

  it('prefixes the href of components like LinkCard / LinkButton', () => {
    const card = run(tree(jsxEl('mdxJsxFlowElement', 'LinkCard', '/github-integration/')), `${DOCS}/tr/foo.mdx`);
    expect(card.children[0].attributes[0].value).toBe('/tr/github-integration/');

    const button = run(tree(jsxEl('mdxJsxTextElement', 'LinkButton', '/screenshots/')), `${DOCS}/tr/foo.mdx`);
    expect(button.children[0].attributes[0].value).toBe('/tr/screenshots/');
  });

  it('leaves links in default-locale (English) pages untouched', () => {
    const t = run(tree(link('/screenshots/')), `${DOCS}/foo.md`);
    expect(t.children[0].url).toBe('/screenshots/');
  });

  it('does not touch image sources', () => {
    const t = run(tree(image('/img/x.png')), `${DOCS}/tr/foo.md`);
    expect(t.children[0].url).toBe('/img/x.png');
  });

  it('leaves an already-prefixed link untouched', () => {
    const t = run(tree(link('/tr/screenshots/')), `${DOCS}/tr/foo.md`);
    expect(t.children[0].url).toBe('/tr/screenshots/');
  });

  it('ignores a non-string (expression) href attribute', () => {
    const node = {
      type: 'mdxJsxTextElement',
      name: 'a',
      attributes: [{ type: 'mdxJsxAttribute', name: 'href', value: { type: 'mdxJsxAttributeValueExpression' } }],
      children: [],
    };
    const t = run(tree(node), `${DOCS}/tr/foo.mdx`);
    expect(t.children[0].attributes[0].value).toEqual({ type: 'mdxJsxAttributeValueExpression' });
  });
});

describe('localizeLinkHref', () => {
  it('prefixes a root-relative page link that lacks a locale', () => {
    expect(localizeLinkHref('/screenshots/', 'tr', LOCALES)).toBe('/tr/screenshots/');
    expect(localizeLinkHref('/developer/language-codes/', 'de', LOCALES)).toBe(
      '/de/developer/language-codes/',
    );
  });

  it('preserves a hash or query when prefixing', () => {
    expect(localizeLinkHref('/account-notifications/#slack', 'tr', LOCALES)).toBe(
      '/tr/account-notifications/#slack',
    );
    expect(localizeLinkHref('/search/?q=x', 'tr', LOCALES)).toBe('/tr/search/?q=x');
  });

  it('prefixes a page link without a trailing slash (no file extension)', () => {
    expect(localizeLinkHref('/inviting-people', 'tr', LOCALES)).toBe('/tr/inviting-people');
  });

  it('leaves an already locale-prefixed link untouched', () => {
    expect(localizeLinkHref('/tr/screenshots/', 'tr', LOCALES)).toBe('/tr/screenshots/');
    expect(localizeLinkHref('/de/foo/', 'tr', LOCALES)).toBe('/de/foo/');
  });

  it('leaves external, protocol-relative, anchor-only and relative links untouched', () => {
    expect(localizeLinkHref('https://crowdin.com/', 'tr', LOCALES)).toBe('https://crowdin.com/');
    expect(localizeLinkHref('//cdn.crowdin.com/x', 'tr', LOCALES)).toBe('//cdn.crowdin.com/x');
    expect(localizeLinkHref('#section', 'tr', LOCALES)).toBe('#section');
    expect(localizeLinkHref('mailto:a@b.com', 'tr', LOCALES)).toBe('mailto:a@b.com');
    expect(localizeLinkHref('../foo/', 'tr', LOCALES)).toBe('../foo/');
  });

  it('leaves asset links (file extension in the path) untouched', () => {
    expect(localizeLinkHref('/ips/ips.json', 'tr', LOCALES)).toBe('/ips/ips.json');
    expect(localizeLinkHref('/img/diagram.png', 'tr', LOCALES)).toBe('/img/diagram.png');
    expect(localizeLinkHref('/files/guide.pdf#page=2', 'tr', LOCALES)).toBe('/files/guide.pdf#page=2');
  });

  it('leaves API reference (redoc) links untouched', () => {
    expect(localizeLinkHref('/developer/api/v2/#operation/api.projects.get', 'tr', LOCALES)).toBe(
      '/developer/api/v2/#operation/api.projects.get',
    );
    expect(
      localizeLinkHref('/developer/enterprise/api/v2/string-based/#tag/Glossaries', 'tr', LOCALES),
    ).toBe('/developer/enterprise/api/v2/string-based/#tag/Glossaries');
  });
});
