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

- `MobileDesktopImage` - A component that displays an image for mobile and desktop. It's useful when you want to display different images for mobile and desktop.

  ```mdx
  import MobileDesktopImage from '~/components/MobileDesktopImage.astro';
  import mobileImage from "./_assets/mobile-profile-image.jpg";
  import desktopImage from "./_assets/desktop-profile-image.jpg";

  <MobileDesktopImage
      mobileImgUrl={mobileImage}
      desktopImgUrl={desktopImage}
      alt="Image alt text"
  />
  ```

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

Put screenshots in the `_assets` directory at the same level as your MDX file. You can then reference them in your MDX file like this:

```mdx
![Alt text](./_assets/screenshot.png)
```

This architecture allows you to keep your images close to the content they are associated with and makes it easier to manage them. Make sure to add descriptive alt text to your images to make them accessible.

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
