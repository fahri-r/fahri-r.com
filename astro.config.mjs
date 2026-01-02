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
    integrations: [sitemap(), mdx(), react(), icon()],
    vite: {
        plugins: [tailwindcss()]
    },
    output: 'static',
    adapter: cloudflare()
});