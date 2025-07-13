<script lang="ts">
	import type {
		TableOfContents,
		Heading1,
		Heading2,
		Heading3
	} from '~/interfaces/notion/block.interface';
	import { buildHeadingId } from '~/libs/blog-helper.ts';
	import '~/styles/notion-color.css';

	interface Props {
		block: TableOfContents;
		headings: (Heading1 | Heading2 | Heading3)[];
	}

	const { block, headings }: Props = $props();
</script>

<div class="table-of-contents">
	{#each headings as headingBlock}
		{@const indentClass =
			headingBlock.type === 'heading_2'
				? 'indent-1'
				: headingBlock.type === 'heading_3'
					? 'indent-2'
					: ''}

		<a
			href={`#${buildHeadingId(headingBlock)}`}
			class={`table-of-contents-item ${(block.color || 'default').replaceAll('_', '-')} ${indentClass}`}
		>
			{headingBlock.richTexts.map((richText) => richText.plainText).join('')}
		</a>
	{/each}
</div>

<style>
	.table-of-contents {
	}
	.table-of-contents > a {
		display: block;
		line-height: 1.8rem;
		font-size: 0.9rem;
		font-weight: 500;
		text-decoration: underline;
	}
	.table-of-contents > a:hover {
		background: rgba(241, 241, 239, 1) !important;
	}
	.table-of-contents > a.indent-1 {
		padding-left: 1.5rem;
	}
	.table-of-contents > a.indent-2 {
		padding-left: 3rem;
	}
</style>
