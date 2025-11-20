import { glob, file } from 'astro/loaders';
import { defineCollection, reference, z } from 'astro:content';

const thoughts = defineCollection({
	loader: glob({ base: './src/content/thoughts', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) => z.object({
		page_description: z.string().optional(),
    heroImage: image().optional(),
    iconEmoji: z.string().optional(),
    iconHero: image().optional(),
    page_title: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
    footnotes: z.array(z.object({
      type: z.string(), content: z.string(), label: z.string().optional()
    })).optional()
	})
});

const works = defineCollection({
  loader: file('src/content/works/data.json'),
  schema: z.object({
    id: z.string(),
    content: z.string().optional(),
    detailPage: z.string().optional(),
    entryDate: z.coerce.date(),
    iconEmoji: z.string().optional(),
    imageScreenshots: z.array(z.string()).optional(),
    organization: z.string(),
    organizationLogo: z.string().optional(),
    organizationUrl: z.string().optional(),
    stackHighlights: z.array(z.object(
      {
        label: z.string(),
        link: z.string().optional()
      }
    )).optional(),
    summary: z.string().optional(),
    title: z.string()
  })
});

const workDetails = defineCollection({
	loader: glob({ base: './src/content/works', pattern: '**/*.{md,mdx}' }),
	schema: () => z.object({
    id: z.string(),
    page_title: z.string().optional(),
    tags: z.array(z.object(
      {
        label: z.string(),
        link: z.string().optional()
      }
    )).optional()
	})
});

export const collections = { thoughts, works, workDetails };
