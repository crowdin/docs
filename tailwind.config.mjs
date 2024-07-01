import colors from 'tailwindcss/colors';
import starlightPlugin from '@astrojs/starlight-tailwind';

// Generated color palettes
// https://starlight.astro.build/guides/css-and-tailwind/#color-theme-editor
const accent = { 200: '#b1d4b0', 600: '#008318', 900: '#0b3d0e', 950: '#0e2b0f' };
const gray = { 100: '#f4f7f3', 200: '#eaf0e8', 300: '#bdc4bb', 400: '#82907f', 500: '#4f5c4d', 700: '#303c2d', 800: '#1f2a1c', 900: '#151a13' };

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				// Your preferred accent color. Indigo is closest to Starlight’s defaults.
				accent: accent,
				// Your preferred gray scale. Zinc is closest to Starlight’s defaults.
				gray: gray,
			},
		},
	},
	plugins: [starlightPlugin()],
};
