<script lang="ts">
	import type { Block } from '~/interfaces/notion/block.interface';
	import RichText from '~/components/shared/notion-blocks/rich-text.svelte';
	import NotionBlocks from '~/components/shared/notion-blocks/notion-block.svelte';
	import '~/styles/notion-color.css';

	interface Props {
		block: Block;
		headings: Block[];
	}

	const { block, headings }: Props = $props();
</script>

<blockquote class={block.quote!.color.replaceAll('_', '-')}>
	{#each block.quote!.richTexts as richText}
		<RichText {richText} />
	{/each}

	{#if block.quote!.children}
		<NotionBlocks blocks={block.quote!.children} {headings} />
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
