import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwind from '@astrojs/tailwind';
import starlightUtils from '@lorenzo_lewis/starlight-utils';
import starlightLinksValidator from 'starlight-links-validator';
import { rehypeHeadingIds } from '@astrojs/markdown-remark';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeExternalLinks from 'rehype-external-links';
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
            { label: "Crowdin KB", link: "/introduction", attrs: { id: "crowdin-nav-button" } },
            { label: "Enterprise KB", link: "/enterprise/introduction", attrs: { id: "enterprise-nav-button" } },
            { label: "Developer Portal", link: "/developer/introduction", attrs: { id: "developer-nav-button" } },
            { label: "Store", link: "https://store.crowdin.com", attrs: { target: '_blank' } },
            { label: "Community", link: "https://community.crowdin.com/", attrs: { target: '_blank' } },
          ],
        }
      ],
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 4,
      },
      components: {
        Head: './src/components/Head.astro',
      },
      customCss: [
        './src/tailwind.css',
        './src/global.css'
      ],
      pagination: false,
      plugins: [
        starlightUtils({
          multiSidebar: {
            switcherStyle: "hidden",
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
        mdi: ['*'],
        heroicons: ['*'],
        'material-symbols': ['*'],
      }
    })
  ],
  markdown: {
    rehypePlugins: [
      rehypeHeadingIds,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'wrap', // Wrap the heading text in a link.
        },
      ],
      [
        rehypeExternalLinks,
        {
          target: '_blank', // Open external links in a new tab.
        }
      ]
    ],
  },
});

export default config;