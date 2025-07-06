<script lang="ts">
	import type { Block } from '~/interfaces/notion/block.interface';
	import { buildHeadingId } from '~/libs/blog-helper';
	import RichText from './rich-text.svelte';
	import NotionBlocks from './notion-block.svelte';

	interface Props {
		block: Block;
		headings: Block[];
	}

	const { block, headings }: Props = $props();

	const id = buildHeadingId(block.heading1!);
	const richTexts = block.heading1?.richTexts ?? [];
</script>

{#if block.heading1?.isToggleable}
	<details class="toggle">
		<summary>
			<a href={`#${id}`} {id}>
				<h3>
					{#each richTexts as richText}
						<RichText {richText} />
					{/each}
				</h3></a
			>
		</summary>
		<div>
			{#if block.heading1?.children}
				<NotionBlocks blocks={block.heading1.children} {headings} />
			{/if}
		</div>
	</details>
{:else}
	<a href={`#${id}`} {id}>
		<h3>
			{#each richTexts as richText}
				<RichText {richText} />
			{/each}
		</h3>
	</a>
{/if}

<style>
	h3 {
		margin: 1.1em 0 0.3em;
		color: var(--fg);
		font-size: 1.8rem;
	}
	@media (max-width: 640px) {
		h3 {
			font-size: 1.3rem;
		}
	}

	.toggle {
		margin: 2rem 0 0;
	}
	@media (max-width: 640px) {
		.toggle {
			margin: 1.4rem 0 0;
		}
	}

	.toggle > summary {
		cursor: pointer;
	}

	.toggle > summary > a {
		display: inline;
	}

	.toggle > summary > a > h3 {
		display: inline;
	}

	.toggle > div {
		margin-left: 1em;
	}
</style>
