# Contributing

## Components

Astro Starlight provides a set of components that you can use to build your documentation site. You can find the list of components in the [Starlight documentation](https://starlight.astro.build/guides/components/).

There are a couple of custom components in this project that you can use:

- `ReadMore` - A simple component that wraps content and displays a "book" icon to the left of the content. It allows you to provide some useful information that will catch the user's attention.

  ```mdx
  import ReadMore from '~/components/ReadMore.astro';

  <ReadMore>
    Read more about [Team Management](/team-management).
  </ReadMore>
  ```

- `QuestionAnswer` - A component that displays a question and answer pair. It's useful when you want to provide a question and answer in a single block. It's a wrapper around the `details` and `summary` HTML elements.

  ```mdx
  import QuestionAnswer from '~/components/QuestionAnswer.astro';

  <QuestionAnswer title="What is Astro?">
    Astro is a modern static site generator that allows you to build fast websites with less client-side JavaScript.
  </QuestionAnswer>
  ```

  It is closed by default, but you can open it by passing the `open` prop.

- `Include` - A component that allows you to include content from another file. It's useful when you want to reuse content across multiple pages.

  ```mdx
  import Include from '~/components/Include.astro';

  <Include file="file.mdx" />
  ```

- `KBD` - A component that displays a keyboard key. It's useful when you want to highlight a key that the user should press.

  ```mdx
  import KBD from '~/components/KBD.astro';

  Press <KBD>Ctrl</KBD> + <KBD>C</KBD> to copy the text.
  ```

- `HelpBanner` - A component that displays a banner with a title, description, and a button. The button text and link are customizable as well as the title and description.

- `Modal` - A simple modal component.

- `FormatsBanner` - A component that displays a banner with a number of formats supported by Crowdin and a link to the store. It's used to highlight the supported formats in the documentation.

- `RepoCard` - A component that displays a card with a repository details like stars and forks count.

## Icons

You can use Starlight's [`Icon`](https://starlight.astro.build/guides/components/#icon) component. It provides some basic set of icons.

```mdx
import { Icon } from '@astrojs/starlight/components';

<Icon name="approve-check" />
```

Also, you can use [Astro Icon](https://www.astroicon.dev/guides/components/) component. It supports Local Icons (`/src/icons/*.svg`) and various Icon Packs.

Installed Icon packs:

- `mdi` - [Material Design Icons](https://icones.js.org/collection/mdi)
- `material-symbols` - [Material Symbols](https://icones.js.org/collection/material-symbols) (available icons are explicitly configured in `astro.config.mjs`)
- `heroicons` - [Heroicons](https://icones.js.org/collection/heroicons) (available icons are explicitly configured in `astro.config.mjs`)

For example:

```mdx
import { Icon } from 'astro-icon/components';

<Icon name="mdi:cloud-download" />
```

Use the `inline-icon` class to display icons inline with text:

```mdx
<Icon name="mdi:cloud-download" class="inline-icon" />
```

It's always better to use these icons instead of local ones, as they already support dark mode and are accessible.

## Screenshots

Put screenshots in the `src/assets/screenshots` directory according to the document location. You can then reference them in your MDX file like this:

```mdx
import { Image } from 'astro:assets';
import uploadFiles from "!/crowdin/getting-started/upload_files.png";

<Image src={uploadFiles} alt="Upload Files" />
```

The `!` is an alias for the `src/assets/screenshots` directory.

This approach uses Astro's default `Image` component and takes advantage of its optimization and caching capabilities.

### Customizing screenshots

You can specify your own classes to customize the image.

Custom classes available:

- `no-shadow` - Removes the shadow and border from the image
- `crowdin-modal` - Sets bigger border radius for Crowdin modal screenshots
- `width-sm` - 384px
- `width-md` - 448px
- `width-lg` - 512px
- `width-xl` - 576px
- `width-2xl` - 672px

```mdx
<Image src={uploadFiles} alt="Upload Files" class="no-shadow width-2xl" />
```

By default, images take up the entire width of the content container. To make the image smaller, use the appropriate classes. Don't use the `width` attribute to resize images, as this will degrade quality. Instead, use the `width-*` classes.

## File-based/String-based content differentiation

To differentiate between file-based and string-based content, you can use the `Tabs` component with the `syncKey` prop. This prop allows you to switch between tabs and keep the selected tab in sync across multiple components.

```mdx
Some common content

import { Tabs, TabItem } from '@astrojs/starlight/components';

<Tabs syncKey="projectType">
  <TabItem label="File-based project">
    File-based specific content
  </TabItem>
  <TabItem label="String-based project">
    String-based specific content
  </TabItem>
</Tabs>

Common content
```

## Badges

You can use badges in the documentation in a several ways:

- [`Badge`](https://starlight.astro.build/guides/components/) component from Starlight to use in the markdown files.
- Sidebar item by specifying the `sidebar.badge` in the [document frontmatter](https://starlight.astro.build/reference/frontmatter/#sidebar).
- Add a badge to the heading in the markdown file: `### Example :badge[New]`. [More examples](https://starlight-heading-badges.vercel.app/usage/).

## API Documentation

The yml specification for the API documentation is located in the `src/assets/api` directory.

The API documentation is implemented using custom pages (`src/pages/developer/**`). These pages are not processed by Astro during the build process, so we need to manually move their dependencies (scripts, specifications, styles) to the `dist` directory. This is done in the `vite` configuration within the `astro.config.mjs` file.

Also, scss files should be compiled using the `npm run build:api` command, as Vite doesn't "see" them and won't bundle them automatically (due to the use of custom html pages).

You can use `npm run watch:api` to watch for changes in the API documentation during development.
