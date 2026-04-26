import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';
import icon from 'astro-icon';

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
	output: 'static',
	adapter: cloudflare(),
	vite: {
		plugins: [tailwindcss()]
	},
	fonts: [
		{
			name: 'Geist',
			cssVariable: '--font-body',
			provider: fontProviders.google(),
			weights: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
		},
		{
			name: 'Press Start 2P',
			cssVariable: '--font-heading',
			provider: fontProviders.google()
		}
	]
});
