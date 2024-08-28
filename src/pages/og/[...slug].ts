/**
 * This file is a route that generates Open Graph images for documentation pages.
 * The OG images are generated at build tile using the Astro OG Canvas plugin.
 *
 * See https://hideoo.dev/notes/starlight-og-images
 */
import { getCollection } from 'astro:content';
import { OGImageRoute } from 'astro-og-canvas';

const entries = await getCollection('docs');
const pages = Object.fromEntries(entries.map(({ data, id }) => [id, { data }]));

export const { getStaticPaths, GET } = OGImageRoute({
    pages,
    param: 'slug',
    // See https://github.com/delucis/astro-og-canvas/tree/latest/packages/astro-og-canvas#image-options
    getImageOptions: (_path, page: (typeof pages)[number]) => {
        return {
            title: page.data.title,
            description: page.data.description,
            padding: 80,
            logo: {
                path: './src/assets/og/logo.png',
            },
            bgImage: {
                path: './src/assets/og/background.png',
            },
            font: {
                title: {
                    color: [24, 24, 27],
                    size: 40,
                },
                description: {
                    color: [67, 70, 73],
                    size: 20,
                },
            }
        }
    },
})
