import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwind from '@astrojs/tailwind';
import starlightUtils from '@lorenzo_lewis/starlight-utils';

// https://astro.build/config
export default defineConfig({
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
					label: 'Crowdin',
					autogenerate: { directory: 'crowdin' },
				},
				{
					label: 'Enterprise',
					autogenerate: { directory: 'enterprise' },
				},
				{
					label: 'Developer',
					autogenerate: { directory: 'developer' },
				},
				{
					label: "leading",
					items: [
						{ label: "Crowdin KB", link: "/crowdin" },
						{ label: "Enterprise KB", link: "/enterprise" },
						{ label: "Developer Portal", link: "/developer" },
					],
				}
			],
			customCss: ['./src/tailwind.css'],
			pagination: false,
			plugins: [
        starlightUtils({
          multiSidebar: {
            switcherStyle: "dropdown",
          },
					navLinks: {
						leading: { useSidebarLabelled: "leading" },
					}
        })
      ],
		}),
		tailwind({ applyBaseStyles: false }),
	],
});
