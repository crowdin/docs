# Translating Documentation

This guide defines translation rules for both humans and AI assistants.

## Core principles

1. Translate meaning, not word-by-word phrasing.
2. Preserve structure, formatting, and technical correctness.
3. Keep terminology consistent across pages.
4. Prefer clarity and natural phrasing in the target language.
5. Keep UI labels consistent with product UI translations.
6. Keep capitalization style consistent with source conventions.

## Never change these by accident

- Code blocks and inline code unless explicitly requested.
- Component names, tag names, props, attributes, imports, IDs, and file paths.
- Asset references such as image `src` values, `import` paths, and links to files (for example, `src="/assets/screenshot.png"` or `![alt](/img/diagram.png)`) — translate the `alt` text only, never the `src`/path.
- Placeholders/tokens such as `%s`, `%d`, `{count}`, `{name}`, `<0>...</0>`, `${value}`.

## Link localization rules

Localize internal links according to the site routing strategy.

- Translate visible link text.
- Internal links must point to the target locale version of the same page.
- If a page has a custom frontmatter `slug` - do not translate it, keep the slug as-is.
- Locale internal links must be root-absolute (`/<locale>/.../`), not relative (`<locale>/.../`).
- External links (`https://...`) usually stay unchanged unless a localized destination exists.
- Always localize anchors (`#...`) for translated headings.
- Build each anchor from the translated heading text (the same text used in the localized `## Heading`), using the docs slug format.
- Never copy source-language hashes when the heading was translated, because this can break localized navigation.

### Locale codes

Use the correct locale code for the `<locale>` prefix when localizing links. The supported codes are:

| Language | `<locale>` code |
| --- | --- |
| English | _(none — default, no prefix)_ |
| Deutsch | `de` |
| Dansk | `da` |
| Français | `fr` |
| Português (Portugal) | `pt` |
| Español | `es` |
| Türkçe | `tr` |
| 简体中文 | `zh` |

### Generic internal link pattern

- Source: `/path/to/page/`
- Localized: `/<locale>/path/to/page/`

### Example

- Source: `[Configuration File](/developer/configuration-file/)`
- Localized: `[...translated text...](/<locale>/developer/configuration-file/)`
- Source heading/link:
  - Heading: `## Slack Integration`
  - Link: `/account-notifications/#slack-integration`
- Localized heading/link:
  - Heading: `## <translated heading>`
  - Link: `/<locale>/account-notifications/#<translated-heading-slug>`
