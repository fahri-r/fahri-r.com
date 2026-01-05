import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
	loader: glob({ pattern: '**/*.mdx', base: './src/content/projects' }),
	schema: ({ image }) =>
		z.object({
			cover: image().nullable(),
			title: z.string(),
			description: z.string().nullable(),
			date: z.coerce.date(),
			repository: z.string().nullable(),
			site: z.string().nullable(),
			tools: z.array(z.string()),
			category: z.string(),
		})
});

const blog = defineCollection({
	loader: glob({ pattern: '**/*.mdx', base: './src/content/blog' }),
	schema: ({ image }) =>
		z.object({
			cover: image().nullable(),
			title: z.string(),
			description: z.string().nullable(),
			date: z.coerce.date(),
			tags: z.array(z.string()),
		})
});

export const collections = {
	projects,
	blog
};
