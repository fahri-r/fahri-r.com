import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
	loader: glob({ pattern: '**/*.mdx', base: './src/content/projects' })
});

export const collections = {
	projects
};
