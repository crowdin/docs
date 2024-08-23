import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwind from '@astrojs/tailwind';
import starlightUtils from '@lorenzo_lewis/starlight-utils';
import starlightLinksValidator from 'starlight-links-validator';
import { rehypeHeadingIds } from '@astrojs/markdown-remark';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeExternalLinks from 'rehype-external-links';
import { remarkHeadingId } from 'remark-custom-heading-id';
import { viteStaticCopy } from 'vite-plugin-static-copy';
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
            { label: "Crowdin KB", link: "/introduction", attrs: { id: "crowdin-nav-button", class: "nav-link" } },
            { label: "Enterprise KB", link: "/enterprise/introduction", attrs: { id: "enterprise-nav-button", class: "nav-link" } },
            { label: "Developer Portal", link: "/developer/crowdin-apps-about", attrs: { id: "developer-nav-button", class: "nav-link" } },
            { label: "Store", link: "https://store.crowdin.com", attrs: { target: "_blank", class: "nav-link" } },
            { label: "Community", link: "https://community.crowdin.com/", attrs: { target: "_blank", class: "nav-link" } },
          ],
        }
      ],
      head: [
        {
          tag: 'script',
          attrs: {
            id: 'cookieyes',
            src: 'https://cdn-cookieyes.com/client_data/2dabfbbec8b71e267115f6a5/script.js',
            defer: true,
          }
        }
      ],
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 4,
      },
      components: {
        Head: './src/components/Head.astro',
        Footer: './src/components/Footer.astro',
        Hero: './src/components/Hero.astro',
        Search: './src/components/Search.astro',
        SearchBox: './src/components/SearchBox.astro',
      },
      customCss: [
        './src/style/tailwind.css',
        './src/style/global.css',
        './src/style/using-logo.scss',
        './src/style/northern-lights.scss',
        '@fontsource-variable/plus-jakarta-sans',
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
        starlightLinksValidator({
          exclude: [
            '/developer/api/v2/**',
            '/developer/api/v2/string-based/**',
            '/developer/enterprise/api/v2/**',
            '/developer/enterprise/api/v2/string-based/**',
          ],
        }),
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
    remarkPlugins: [
      remarkHeadingId, // Support custom heading IDs.
    ],
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
  vite: {
    plugins: [
      viteStaticCopy({
        targets: [
          {
            src: 'src/scripts',
            dest: 'src'
          },
          {
            src: 'node_modules/redoc/bundles/redoc.standalone.js',
            dest: 'node_modules/redoc/bundles'
          },
          {
            src: 'src/assets/api',
            dest: 'src/assets'
          }
        ]
      })
    ]
  }
});

export default config;
