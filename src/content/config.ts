import { defineCollection, z } from 'astro:content';
import { docsLoader, i18nLoader } from '@astrojs/starlight/loaders';
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({
      extend: z.object({
        hideHeader: z.boolean().optional(),
        metaRobots: z.string().optional(),
      }),
    }),
  }),
  i18n: defineCollection({
    loader: i18nLoader(),
    schema: i18nSchema({
      extend: z.object({
        sidebar: z.record(z.string(), z.string()).optional(),
        'copyContent': z.string().optional(),
        'editLink.loading': z.string().optional(),
        'editLink.copied': z.string().optional(),
        'editLink.error': z.string().optional(),
        'feedback.question': z.string().optional(),
        'feedback.placeholder': z.string().optional(),
        'feedback.submit': z.string().optional(),
        'feedback.success': z.string().optional(),
        'footer.status': z.string().optional(),
        'footer.terms': z.string().optional(),
        'footer.privacy': z.string().optional(),
        'footer.cookies': z.string().optional(),
        'footer.security': z.string().optional(),
        'footer.llms': z.string().optional(),
        'hero.crowdinHelp': z.string().optional(),
        'hero.enterpriseHelp': z.string().optional(),
        'hero.developerPortal': z.string().optional(),
        'languages.errorLoading': z.string().optional(),
        'formats.alt': z.string().optional(),
        'formats.supported': z.string().optional(),
        'formats.viewOnStore': z.string().optional(),
        'repo.official': z.string().optional(),
        'repo.viewInstall': z.string().optional(),
        'social.applePodcast': z.string().optional(),
        'social.spotifyPodcast': z.string().optional(),
        'modal.header': z.string().optional(),
      }),
    }),
  }),
};
