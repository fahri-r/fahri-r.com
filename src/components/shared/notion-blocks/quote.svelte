<script lang="ts">
	import type { Heading1, Heading2, Heading3, Quote } from '~/interfaces/notion/block.interface';
	import RichText from '~/components/shared/notion-blocks/rich-text.svelte';
	import NotionBlocks from '~/components/shared/notion-blocks/notion-block.svelte';
	import '~/styles/notion-color.css';

	interface Props {
		block: Quote;
		headings: (Heading1 | Heading2 | Heading3)[];
	}

	const { block, headings }: Props = $props();
</script>

<blockquote class={block.color.replaceAll('_', '-')}>
	{#each block.richTexts as richText}
		<RichText {richText} />
	{/each}

	{#if block.hasChildren && block.children}
		<NotionBlocks blocks={block.children} {headings} />
	{/if}
</blockquote>

<style>
	blockquote {
		margin: 0.6rem 0;
		padding: 0 0.9rem;
		border-left: 3px solid var(--fg);
		font-size: 1rem;
		line-height: 1.8rem;
	}
</style>
