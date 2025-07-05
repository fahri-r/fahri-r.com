<script lang="ts">
	import type { Block } from '~/interfaces/notion/block.interface';
	import { buildHeadingId } from '~/libs/blog-helper';
	import RichText from './rich-text.svelte';
	import NotionBlocks from './notion-block.svelte';

	interface Props {
		block: Block;
	}

	const { block }: Props = $props();

	const id = buildHeadingId(block.heading3!);
	const richTexts = block.heading3?.richTexts ?? [];
</script>

{#if block.heading3?.isToggleable}
	<details class="toggle">
		<summary>
			<a href={`#${id}`} {id}>
				<h5>
					{#each richTexts as richText}
						<RichText {richText} />
					{/each}
				</h5>
			</a>
		</summary>
		<div>
			{#if block.heading3?.children}
				<NotionBlocks blocks={block.heading3.children} />
			{/if}
		</div>
	</details>
{:else}
	<a href={`#${id}`} {id}>
		<h5>
			{#each richTexts as richText}
				<RichText {richText} />
			{/each}
		</h5>
	</a>
{/if}

<style>
	h5 {
		margin: 0.9em 0 0.3em;
		color: var(--fg);
		font-size: 1.25rem;
	}
	@media (max-width: 640px) {
		h5 {
			font-size: 1.1rem;
		}
	}

	.toggle {
		margin: 1.2rem 0 0;
	}
	@media (max-width: 640px) {
		.toggle {
			margin: 1.1rem 0 0;
		}
	}

	.toggle > summary {
		cursor: pointer;
	}

	.toggle > summary > a {
		display: inline;
	}

	.toggle > summary > a > h5 {
		display: inline;
	}

	.toggle > div {
		margin-left: 1em;
	}
</style>
