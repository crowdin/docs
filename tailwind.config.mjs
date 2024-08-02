import colors from 'tailwindcss/colors';
import starlightPlugin from '@astrojs/starlight-tailwind';

// Generated color palettes
// https://starlight.astro.build/guides/css-and-tailwind/#color-theme-editor
const primary = {50: '#E8F5E9', 100: '#C8E6C9', 200: '#A5D6A7', 300: '#81C784', 400: '#66BB6A', 500: '#4CAF50', 600: '#43A047', 700: '#388E3C', 800: '#2E7D32', 900: '#1B5E20'};
const gray = { 100: '#f4f7f8', 200: '#e9eff2', 300: '#bcc3c7', 400: '#808e95', 500: '#4d5a61', 700: '#2e3a40', 800: '#1d292f', 900: '#14191c' };

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Your preferred accent color. Indigo is closest to Starlight’s defaults.
        accent: primary,
        // Your preferred gray scale. Zinc is closest to Starlight’s defaults.
        gray: gray,
      },
    },
  },
  plugins: [starlightPlugin()],
};
