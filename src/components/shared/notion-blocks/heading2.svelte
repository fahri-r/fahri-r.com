<script lang="ts">
	import type { Block } from '~/interfaces/notion/block.interface';
	import { buildHeadingId } from '~/libs/blog-helper';
	import RichText from './rich-text.svelte';
	import NotionBlocks from './notion-block.svelte';

	interface Props {
		block: Block;
	}

	const { block }: Props = $props();

	const id = buildHeadingId(block.heading2!);
	const richTexts = block.heading2?.richTexts ?? [];
</script>

{#if block.heading2?.isToggleable}
	<details class="toggle">
		<summary>
			<a href={`#${id}`} {id}>
				<h4>
					{#each richTexts as richText}
						<RichText {richText} />
					{/each}
				</h4>
			</a>
		</summary>
		<div>
			{#if block.heading2?.children}
				<NotionBlocks blocks={block.heading2.children} />
			{/if}
		</div>
	</details>
{:else}
	<a href={`#${id}`} {id}>
		<h4>
			{#each richTexts as richText}
				<RichText {richText} />
			{/each}
		</h4>
	</a>
{/if}

<style>
	h4 {
		margin: 1em 0 0.3em;
		color: var(--fg);
		font-size: 1.5rem;
	}
	@media (max-width: 640px) {
		h4 {
			font-size: 1.2rem;
		}
	}

	.toggle {
		margin: 1.6rem 0 0;
	}
	@media (max-width: 640px) {
		.toggle {
			margin: 1.2rem 0 0;
		}
	}

	.toggle > summary {
		cursor: pointer;
	}

	.toggle > summary > a {
		display: inline;
	}

	.toggle > summary > a > h4 {
		display: inline;
	}

	.toggle > div {
		margin-left: 1em;
	}
</style>
