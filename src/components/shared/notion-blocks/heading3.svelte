<script lang="ts">
	import type { Heading1, Heading2, Heading3 } from '~/interfaces/notion/block.interface';
	import { buildHeadingId } from '~/libs/blog-helper';
	import RichText from './rich-text.svelte';
	import NotionBlocks from './notion-block.svelte';

	interface Props {
		block: Heading3;
		headings: (Heading1 | Heading2 | Heading3)[];
	}

	const { block, headings }: Props = $props();

	const id = buildHeadingId(block);
	const richTexts = block.richTexts ?? [];
</script>

{#if block.isToggleable}
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
			{#if block.hasChildren && block.children}
				<NotionBlocks blocks={block.children} {headings} />
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
