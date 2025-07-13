<script lang="ts">
	import type { Heading1, Heading2, Heading3, Toggle } from '~/interfaces/notion/block.interface';
	import RichText from '~/components/shared/notion-blocks/rich-text.svelte';
	import NotionBlocks from '~/components/shared/notion-blocks/notion-block.svelte';
	import '~/styles/notion-color.css';

	interface Props {
		block: Toggle;
		headings: (Heading1 | Heading2 | Heading3)[];
	}

	const { block, headings }: Props = $props();
</script>

<details class={`toggle ${block.color.replaceAll('_', '-')}`}>
	<summary>
		{#each block.richTexts as richText}
			<RichText {richText} />
		{/each}
	</summary>
	<div>
		{#if block.hasChildren && block.children}
			<NotionBlocks blocks={block.children} {headings} />
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
