// @ts-check
import { defineConfig } from 'astro/config';

import svelte from '@astrojs/svelte';
import tailwindcss from '@tailwindcss/vite';
import vercelStatic from '@astrojs/vercel/static';

import sitemap from '@astrojs/sitemap';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
	site: 'https://www.fahri-r.com',
	integrations: [svelte(), sitemap(), mdx()],
	vite: {
		plugins: [tailwindcss()]
	},
	output: 'static',
	adapter: vercelStatic()
});
