import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import icon from '@twodft/astro-icon';

import { rehypeHeadingIds } from '@astrojs/markdown-remark';
import rehypeExpressiveCode from 'rehype-expressive-code';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeKatex from 'rehype-katex';
import rehypeShiki from '@shikijs/rehype';
import remarkEmoji from 'remark-emoji';
import remarkMath from 'remark-math';

import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers';
import type { ExpressiveCodeTheme } from 'rehype-expressive-code';

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
	],
	markdown: {
		syntaxHighlight: false,
		rehypePlugins: [
			[
				rehypeExternalLinks,
				{
					target: '_blank',
					rel: ['nofollow', 'noreferrer', 'noopener']
				}
			],
			rehypeHeadingIds,
			rehypeKatex,
			[
				rehypeExpressiveCode,
				{
					themes: ['github-light', 'github-dark'],
					plugins: [pluginLineNumbers()],
					useDarkModeMediaQuery: false,
					themeCssSelector: (theme: ExpressiveCodeTheme) =>
						`[data-theme="${theme.name.split('-')[1]}"]`,
					defaultProps: {
						wrap: true,
						collapseStyle: 'collapsible-auto',
						overridesByLang: {
							'ansi,bat,bash,batch,cmd,console,powershell,ps,ps1,psd1,psm1,sh,shell,shellscript,shellsession,text,zsh':
								{
									showLineNumbers: false
								}
						}
					},
					styleOverrides: {
						codeFontSize: '0.75rem',
						borderColor: 'var(--border)',
						codeFontFamily: 'var(--font-mono)',
						codeBackground: 'color-mix(in oklab, var(--muted) 25%, transparent)',
						frames: {
							editorActiveTabForeground: 'var(--muted-foreground)',
							editorActiveTabBackground: 'transparent',
							editorActiveTabIndicatorBottomColor: 'transparent',
							editorActiveTabIndicatorTopColor: 'transparent',
							editorTabBorderRadius: '0',
							editorTabBarBackground: 'color-mix(in oklab, var(--muted) 25%, transparent)',
							editorTabBarBorderBottomColor: 'var(--border)',
							frameBoxShadowCssValue: 'none',
							terminalBackground: 'color-mix(in oklab, var(--muted) 25%, transparent)',
							terminalTitlebarBackground: 'transparent',
							terminalTitlebarBorderBottomColor: 'transparent',
							terminalTitlebarForeground: 'var(--muted-foreground)'
						},
						lineNumbers: {
							foreground: 'var(--muted-foreground)'
						},
						uiFontFamily: 'var(--font-sans)'
					}
				}
			],
			[
				rehypeShiki,
				{
					themes: {
						light: 'github-light',
						dark: 'github-dark'
					},
					inline: 'tailing-curly-colon'
				}
			]
		],
		remarkPlugins: [remarkMath, remarkEmoji]
	}
});
