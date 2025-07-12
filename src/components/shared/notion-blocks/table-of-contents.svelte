<script lang="ts">
	import { Heading2, Heading3 } from '~/constants/notion-block';
	import type { Block } from '~/interfaces/notion/block.interface';
	import { buildHeadingId } from '~/libs/blog-helper.ts';
	import '~/styles/notion-color.css';

	interface Props {
		block: Block;
		headings: Block[];
	}

	const { block, headings }: Props = $props();
</script>

<div class="table-of-contents">
	{#each headings as headingBlock}
		{@const heading = headingBlock.heading1 || headingBlock.heading2 || headingBlock.heading3}
		{@const indentClass =
			headingBlock.type === Heading2
				? 'indent-1'
				: headingBlock.type === Heading3
					? 'indent-2'
					: ''}

		<a
			href={`#${buildHeadingId(heading!)}`}
			class={`table-of-contents-item ${(block.tableOfContents?.color || 'default').replaceAll('_', '-')} ${indentClass}`}
		>
			{heading?.richTexts.map((richText) => richText.plainText).join('')}
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
