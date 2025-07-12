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

<details class={`toggle ${block.toggle!.color.replaceAll('_', '-')}`}>
	<summary>
		{#each block.toggle!.richTexts as richText}
			<RichText {richText} />
		{/each}
	</summary>
	<div>
		{#if block.toggle!.children}
			<NotionBlocks blocks={block.toggle!.children} {headings} />
		{/if}
	</div>
</details>

<style>
	.toggle {
		padding: 0.4rem;
	}

	.toggle > summary {
		cursor: pointer;
	}

	.toggle > summary > a {
		display: inline;
	}

	.toggle > div {
		margin-left: 1em;
	}
</style>
