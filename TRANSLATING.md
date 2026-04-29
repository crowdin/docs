# Translating Documentation

This guide defines translation rules for both humans and AI assistants. It is intentionally project-agnostic and can be reused in any docs codebase.

## Core principles

1. Translate meaning, not word-by-word phrasing.
2. Translate only user-facing content.
3. Preserve structure, formatting, and technical correctness.
4. Keep terminology consistent across pages.
5. Prefer clarity and natural phrasing in the target language.
6. Follow the product terminology glossary if one exists.
7. Keep UI labels consistent with product UI translations.
8. Keep capitalization style consistent with source conventions.

## Never change these by accident

- Code blocks and inline code unless explicitly requested.
- Component names, tag names, props, attributes, imports, IDs, and file paths.
- Placeholders/tokens such as `%s`, `%d`, `{count}`, `{name}`, `<0>...</0>`, `${value}`.

## Link localization rules

When translating, localize internal links according to the site routing strategy.

- Translate visible link text.
- Internal links should point to the target locale version of the same page.
- If a page has a custom frontmatter `slug`, localize that slug as well and include the locale prefix (for example, `/<locale>/...`).
- External links (`https://...`) usually stay unchanged unless a localized destination exists.
- Keep anchors (`#...`) unchanged.

### Generic internal link pattern

- Source: `/path/to/page/`
- Localized: `/<locale>/path/to/page/`

### Example

- Source: `[Configuration File](/developer/configuration-file/)`
- Localized: `[...translated text...](/<locale>/developer/configuration-file/)`

## Markdown/MDX translation rules

- Keep Markdown and MDX syntax valid.
- Do not break component usage in MDX.
- Translate plain text inside components only when safe and appropriate.
- Keep shortcodes/macros/directives and their parameters intact.
