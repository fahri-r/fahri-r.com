<script lang="ts">
	import Prism from 'prismjs';
	import 'prismjs/components/prism-css';
	import 'prismjs/components/prism-diff';
	import 'prismjs/components/prism-docker';
	import 'prismjs/components/prism-elixir';
	import 'prismjs/components/prism-go';
	import 'prismjs/components/prism-hcl';
	import 'prismjs/components/prism-java';
	import 'prismjs/components/prism-json';
	import 'prismjs/components/prism-python';
	import 'prismjs/components/prism-ruby';
	import 'prismjs/components/prism-sql';
	import 'prismjs/components/prism-typescript';
	import 'prismjs/components/prism-yaml';
	import mermaid from 'mermaid';
	import type { Block, RichText } from '~/interfaces/notion/block.interface';
	import Caption from '~/components/shared/notion-blocks/caption.svelte';

	interface Props {
		block: Block;
	}

	const { block }: Props = $props();

	const code = block.code?.richTexts!.map((richText: RichText) => richText.text?.content).join('');
	const language = block.code?.language.toLowerCase();
	const grammar = Prism.languages[language!] || Prism.languages.javascript;
	const highlightedCode =
		language === 'mermaid' ? code : Prism.highlight(code!, grammar, language!);

	mermaid.initialize({ startOnLoad: true, theme: 'neutral' });

	function copyToClipboard(code: string, button: HTMLButtonElement) {
		navigator.clipboard.writeText(code).then(() => {
			const originalText = button.innerText;
			const doneText = button.dataset.doneText || 'Copied!';

			button.innerText = doneText;

			setTimeout(() => {
				button.innerText = originalText;
			}, 3000);
		});
	}
</script>

<svelte:head>
	<link
		href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.22.0/themes/prism.min.css"
		rel="stylesheet"
	/>
</svelte:head>

<div class="code">
	<div>
		{#if language === 'mermaid'}
			<pre class="mermaid">{code}</pre>
		{:else}
			<div>
				<button
					class="copy"
					data-code={code}
					data-done-text="Copied!"
					onclick={(e) => copyToClipboard(code!, e.target as HTMLButtonElement)}
				>
					Copy
				</button>
			</div>
			<pre><code>{@html highlightedCode}</code></pre>
		{/if}
	</div>
	<Caption richTexts={block.code?.caption!} />
</div>

<style>
	.code {
		display: block;
		width: 100%;
		margin-bottom: 0.6rem;
	}
	.code > div {
		background: rgb(247, 246, 243);
		border-radius: var(--radius);
	}
	.code > div div {
		display: flex;
		justify-content: flex-end;
	}
	.code button.copy {
		display: block;
		width: 4rem;
		border: 0;
		border-radius: var(--radius);
		background-color: rgba(227, 226, 224, 0.5);
		color: var(--fg);
		line-height: 1.2rem;
		cursor: pointer;
	}
	.code pre {
		display: block;
		overflow: auto;
		padding: 0.8rem 2rem 2rem;
		font-size: 0.9rem;
		line-height: 1.2rem;
		white-space: pre;
		width: 100px;
		min-width: 100%;
		overflow-x: auto;
		&::-webkit-scrollbar {
			height: 10px;
		}
		&::-webkit-scrollbar-thumb {
			background: rgb(211, 209, 203);
		}
		&::-webkit-scrollbar-track {
			background: rgb(237, 236, 233);
		}
	}
	.code pre.mermaid {
		padding: 2rem;
	}
	.code pre code {
		color: var(--fg);
		padding: 0;
		background: rgb(247, 246, 243) !important;
		border-radius: 0;
	}
</style>
