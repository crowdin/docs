import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import starlightUtils from '@lorenzo_lewis/starlight-utils';
import starlightLinksValidator from 'starlight-links-validator';
import starlightHeadingBadges from 'starlight-heading-badges';
import { rehypeHeadingIds } from '@astrojs/markdown-remark';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeExternalLinks from 'rehype-external-links';
import { remarkHeadingId } from 'remark-custom-heading-id';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import icon from 'astro-icon';

import crowdinSidebar from './src/content/sidebars/crowdin.ts';
import enterpriseSidebar from './src/content/sidebars/enterprise.ts';
import developerSidebar from './src/content/sidebars/developer.ts';

import customConsentScript from './src/scripts/custom-consent-mode.js?raw';
import postHogScript from './src/scripts/posthog.js?raw';
import gtmScript from './src/scripts/gtm.js?raw';

let site;

if (process.env.VERCEL_ENV === 'production' && process.env.VERCEL_PROJECT_PRODUCTION_URL) {
  site = `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
} else if (process.env.VERCEL_URL) {
  site = `https://${process.env.VERCEL_URL}`;
} else {
  site = 'https://support.crowdin.com';
}

// https://astro.build/config
const config = defineConfig({
  site: site,
  trailingSlash: 'always',
  integrations: [
    starlight({
      title: 'Crowdin Docs',
      logo: {
        replacesTitle: true,
        light: './src/assets/logo/dark.svg',
        dark: './src/assets/logo/light.svg',
      },
      sidebar: [
        {
          label: 'Crowdin Help',
          items: [...crowdinSidebar],
        },
        {
          label: 'Enterprise Help',
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
            { label: "Crowdin Help", link: "/introduction", attrs: { id: "crowdin-nav-button", class: "nav-link" } },
            { label: "Enterprise Help", link: "/enterprise/introduction", attrs: { id: "enterprise-nav-button", class: "nav-link" } },
            { label: "Developer Portal", link: "/developer/crowdin-apps-about", attrs: { id: "developer-nav-button", class: "nav-link" } },
            { label: "Store", link: "https://store.crowdin.com", attrs: { target: "_blank", class: "nav-link" } },
            { label: "Blog", link: "https://crowdin.com/blog", attrs: { target: "_blank", class: "nav-link" } },
            { label: "Community", link: "https://community.crowdin.com/", attrs: { target: "_blank", class: "nav-link" } },
          ],
        }
      ],
      head: [
        // Custom consent mode https://www.cookieyes.com/documentation/implementing-google-consent-mode-using-cookieyes/
        {
          tag: 'script',
          content: customConsentScript,
        },
        // PostHog
        {
          tag: 'script',
          content: process.env.VERCEL_ENV === 'production'
            ? postHogScript.replace('<POSTHOG_CLIENT_API_HOST>', process.env.POSTHOG_CLIENT_API_HOST).replace('<POSTHOG_PROJECT_API_KEY>', process.env.POSTHOG_PROJECT_API_KEY)
            : undefined,
        },
        // Google Tag Manager
        {
          tag: 'script',
          attrs: {
            src: process.env.GA_ID
              ? `https://gtm-sst.crowdin.com/gtm.js?id=${process.env.GA_ID}`
              : undefined,
            defer: true,
          },
        },
        {
          tag: 'script',
          content: process.env.GA_ID
            ? gtmScript.replace('<GTM-ID>', process.env.GA_ID)
            : undefined,
        },
        // CookieYes
        {
          tag: 'script',
          attrs: {
            id: 'cookieyes',
            src: process.env.COOKIEYES_ID
              ? `https://cdn-cookieyes.com/client_data/${process.env.COOKIEYES_ID}/script.js`
              : undefined,
            defer: true,
          }
        },
        // Add ICO favicon fallback for Safari.
        {
          tag: 'link',
          attrs: {
            rel: 'icon',
            href: '/favicon.ico',
            sizes: '32x32',
          },
        },
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
        SocialIcons: './src/components/SocialIcons.astro',
      },
      customCss: [
        './src/style/tailwind.css',
        './src/style/global.css',
        './src/style/using-logo.scss',
        './src/style/northern-lights.scss',
        '@fontsource-variable/plus-jakarta-sans',
      ],
      pagination: false,
      editLink: {
        baseUrl: 'https://github.com/crowdin/docs/edit/main',
      },
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
        starlightHeadingBadges(),
      ],
      social: {
        'x.com': 'https://x.com/crowdin',
        linkedin: 'https://www.linkedin.com/company/crowdin',
        youtube: 'https://youtube.com/@crowdin-localization',
        github: 'https://github.com/crowdin',
      }
    }),
    // https://docs.astro.build/en/guides/integrations-guide/sitemap/#configuration
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en-US',
        },
      },
      filter: (page) =>
        page !== `${site}/iframe/privacy-policy/` &&
        page !== `${site}/iframe/terms/`,
    }),
    tailwind({ applyBaseStyles: false }),
    icon({
      include: {
        mdi: ['*'],
        heroicons: ['arrows-up-down-solid'],
        'material-symbols': [
          'open-in-new',
          'table-chart',
          'terminal',
          'format-ink-highlighter',
          'file-copy',
          'cleaning-services',
          'create-new-folder-sharp',
          'folder-data-sharp'
        ],
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
