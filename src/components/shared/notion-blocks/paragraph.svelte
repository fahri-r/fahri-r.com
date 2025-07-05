<script lang="ts">
	import type { Block } from '~/interfaces/notion/block.interface';
	import RichText from '~/components/shared/notion-blocks/rich-text.svelte';
	import NotionBlocks from '~/components/shared/notion-blocks/notion-block.svelte';

	interface Props {
		block: Block;
	}

	const { block }: Props = $props();
</script>

<p class={block.paragraph!.color.replaceAll('_', '-')}>
	{#each block.paragraph!.richTexts as richText}
		<RichText {richText} />
	{/each}

	{#if block.hasChildren}
		<NotionBlocks blocks={block.paragraph!.children!} />
	{/if}
</p>

<style>
	p {
		margin: 0.3rem 0;
		font-size: 1rem;
		min-height: 1.8rem;
	}
</style>
