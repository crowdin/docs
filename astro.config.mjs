import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwind from '@astrojs/tailwind';
import starlightUtils from '@lorenzo_lewis/starlight-utils';
import starlightLinksValidator from 'starlight-links-validator';
import { rehypeHeadingIds } from '@astrojs/markdown-remark';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

import crowdinSidebar from './src/content/sidebars/crowdin.ts';
import enterpriseSidebar from './src/content/sidebars/enterprise.ts';
import developerSidebar from './src/content/sidebars/developer.ts';

// https://astro.build/config
const config = defineConfig({
	integrations: [
		starlight({
			title: 'Crowdin',
			logo: {
				replacesTitle: true,
				light: './src/assets/logo/dark.svg',
				dark: './src/assets/logo/light.svg',
			},
			social: {
				github: 'https://github.com/withastro/starlight',
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
						{ label: "Crowdin KB", link: "/crowdin/introduction/" },
						{ label: "Enterprise KB", link: "/enterprise/introduction/" },
						{ label: "Developer Portal", link: "/developer/introduction/" },
					],
				}
			],
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
		}),
		tailwind({ applyBaseStyles: false }),
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
