// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
	site: 'https://www.fahri-r.com',
	integrations: [
		sitemap(),
		mdx(),
		react(),
		icon({
			iconDir: 'src/assets'
		})
	],
	vite: {
		plugins: [tailwindcss()],
		resolve: {
			// https://github.com/withastro/astro/issues/12824
			// Use react-dom/server.edge instead of react-dom/server.browser for React 19.
			// Without this, MessageChannel from node:worker_threads needs to be polyfilled.
			alias: import.meta.env.PROD && {
				'react-dom/server': 'react-dom/server.edge'
			}
		}
	},
	output: 'static',
	adapter: cloudflare()
});
