// @ts-check
import { defineConfig } from 'astro/config';

import svelte from '@astrojs/svelte';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
    site: 'https://www.fahri-r.com',
    integrations: [svelte(), sitemap(), mdx()],
    vite: {
        plugins: [tailwindcss()]
    },
    output: 'static',
    adapter: cloudflare()
});