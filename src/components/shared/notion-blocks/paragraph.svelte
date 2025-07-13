<script lang="ts">
	import type { Heading1, Heading2, Heading3, Paragraph } from '~/interfaces/notion/block.interface';
	import RichText from '~/components/shared/notion-blocks/rich-text.svelte';
	import NotionBlocks from '~/components/shared/notion-blocks/notion-block.svelte';
	import '~/styles/notion-color.css';

	interface Props {
		block: Paragraph;
		headings: (Heading1 | Heading2 | Heading3)[];
	}

	const { block, headings }: Props = $props();
</script>

<p class={block.color.replaceAll('_', '-')}>
	{#each block.richTexts as richText}
		<RichText {richText} />
	{/each}

	{#if block.hasChildren && block.children}
		<NotionBlocks blocks={block.children} {headings} />
	{/if}
</p>

<style>
	p {
		margin: 0.3rem 0;
		font-size: 1rem;
		min-height: 1.8rem;
	}
</style>
