import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwind from '@astrojs/tailwind';
import starlightUtils from '@lorenzo_lewis/starlight-utils';
import starlightLinksValidator from 'starlight-links-validator';
import { rehypeHeadingIds } from '@astrojs/markdown-remark';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import icon from 'astro-icon';

import crowdinSidebar from './src/content/sidebars/crowdin.ts';
import enterpriseSidebar from './src/content/sidebars/enterprise.ts';
import developerSidebar from './src/content/sidebars/developer.ts';

// https://astro.build/config
const config = defineConfig({
  site: 'https://support.crowdin.com',
  integrations: [
    starlight({
      title: 'Crowdin',
      logo: {
        replacesTitle: true,
        light: './src/assets/logo/dark.svg',
        dark: './src/assets/logo/light.svg',
      },
      sidebar: [
        {
          label: 'Crowdin KB',
          items: [...crowdinSidebar],
        },
        {
          label: 'Enterprise KB',
          items: [...enterpriseSidebar],
        },
        {
          label: 'Developer Portal',
          items: [...developerSidebar],
        },
        // Navigation links
        {
          label: "leading",
          items: [
            { label: "Crowdin KB", link: "/introduction" },
            { label: "Enterprise KB", link: "/enterprise/introduction" },
            { label: "Developer Portal", link: "/developer/introduction" },
            { label: "Store", link: "https://store.crowdin.com", attrs: { target: '_blank' } },
            { label: "Community", link: "https://community.crowdin.com/", attrs: { target: '_blank' } },
          ],
        }
      ],
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 4,
      },
      customCss: [
        './src/tailwind.css',
        './src/global.css'
      ],
      pagination: false,
      plugins: [
        starlightUtils({
          multiSidebar: {
            switcherStyle: "dropdown",
          },
          navLinks: {
            leading: { useSidebarLabelled: "leading" },
          }
        }),
        starlightLinksValidator(),
      ],
      social: {
        'x.com': 'https://x.com/crowdin',
        linkedin: 'https://www.linkedin.com/company/crowdin',
        youtube: 'https://youtube.com/@crowdin-localization',
        github: 'https://github.com/crowdin',
      }
    }),
    tailwind({ applyBaseStyles: false }),
    icon({
      include: {
        // Include only specific icons in the bundle (https://www.astroicon.dev/reference/configuration#include)
        mdi: ['*']
      }
    })
  ],
  markdown: {
    rehypePlugins: [rehypeHeadingIds, [
      rehypeAutolinkHeadings,
      {
        behavior: 'wrap', // Wrap the heading text in a link.
      },
    ]],
  },
});

export default config;
