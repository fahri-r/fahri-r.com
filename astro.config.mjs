// @ts-check
import { defineConfig } from 'astro/config';

import svelte from '@astrojs/svelte';
import tailwindcss from '@tailwindcss/vite';
import vercelStatic from '@astrojs/vercel/static';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://www.fahri-r.com',
	integrations: [svelte(), sitemap()],
	vite: {
		plugins: [tailwindcss()]
	},
	output: 'static',
	adapter: vercelStatic()
});
