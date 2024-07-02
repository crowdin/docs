import colors from 'tailwindcss/colors';
import starlightPlugin from '@astrojs/starlight-tailwind';

// Generated color palettes
// https://starlight.astro.build/guides/css-and-tailwind/#color-theme-editor
const accent = { 200: '#9ddaab', 600: '#00823d', 900: '#003e1a', 950: '#002d11' };
const gray = { 100: '#f3f7f9', 200: '#e7eff4', 300: '#bac4c9', 400: '#7b8f99', 500: '#495b64', 700: '#2a3b43', 800: '#182931', 900: '#12191d' };

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
