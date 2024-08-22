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

- `FormatsBanner` - A component that displays a banner with a number of formats supported by Crowdin and a link to the store. It's used to highlight the supported formats in the documentation.

  ```mdx
  import FormatsBanner from '~/components/FormatsBanner.astro';

  <FormatsBanner />
  ```

- `Include` - A component that allows you to include content from another file. It's useful when you want to reuse content across multiple pages.

  ```mdx
  import Include from '~/components/Include.astro';

  <Include file="file.mdx" />
  ```

- `QuestionAnswer` - A component that displays a question and answer pair. It's useful when you want to provide a question and answer in a single block. It's a wrapper around the `details` and `summary` HTML elements.

  ```mdx
  import QuestionAnswer from '~/components/QuestionAnswer.astro';

  <QuestionAnswer title="What is Astro?">
    Astro is a modern static site generator that allows you to build fast websites with less client-side JavaScript.
  </QuestionAnswer>
  ```

  It is closed by default, but you can open it by passing the `open` prop.

## Icons

You can use Starlight's [`Icon`](https://starlight.astro.build/guides/components/#icon) component. It provides some basic set of icons.

```mdx
import { Icon } from '@astrojs/starlight/components';

<Icon name="approve-check" />
```

Also, you can use [Astro Icon](https://www.astroicon.dev/guides/components/) component. It supports Local Icons and various Icon Packs.

Installed Icon packs:

- `mdi` - [Material Design Icons](https://icones.js.org/collection/mdi)
- `material-symbols` - [Material Symbols](https://icones.js.org/collection/material-symbols)
- `heroicons` - [Heroicons](https://icones.js.org/collection/heroicons)

For example:

```mdx
import { Icon } from 'astro-icon/components';

<Icon name="mdi:cloud-download" />
```

Use the `inline-icon` class to display icons inline with text:

```mdx
<Icon name="mdi:cloud-download" class="inline-icon" />
```

It's always better to use these icons instead of local, as they are already support for dark mode and are accessible.

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

## API Documentation

The yml specification for the API documentation is located in the `src/assets/api` directory.

It is implemented using custom pages (`src/pages/**`). These pages are not processed by Astro during the build process, so we need to manually move their dependencies to the `dist` directory. This is done in the `vite` configuration within the `astro.config.mjs` file. Also, scss files should be compiled using the `npm run build-api-css` command, since Vite doesn't "see" them (due to the use of custom html pages).
