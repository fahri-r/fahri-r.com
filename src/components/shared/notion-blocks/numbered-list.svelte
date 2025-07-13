<script lang="ts">
	import type {
		Heading1,
		Heading2,
		Heading3,
		NumberedList
	} from '~/interfaces/notion/block.interface';
	import RichText from '~/components/shared/notion-blocks/rich-text.svelte';
	import NotionBlocks from '~/components/shared/notion-blocks/notion-block.svelte';
	import '~/styles/notion-color.css';

	interface Props {
		list: NumberedList;
		level: number;
		headings: (Heading1 | Heading2 | Heading3)[];
	}
	

	const { list, level, headings }: Props = $props();
	const { listItems: blocks } = list;

	const listTypes: ('i' | '1' | 'a')[] = ['i', '1', 'a'];
</script>

<ol type={listTypes[level % 3]}>
	{#each blocks as b}
		<li class={b.color.replaceAll('_', '-')}>
			{#each b.richTexts as richText}
				<RichText {richText} />
			{/each}

			{#if b.hasChildren && b.children}
				<NotionBlocks blocks={b.children} level={level + 1} {headings} />
			{/if}
		</li>
	{/each}
</ol>

<style>
	ol {
		font-size: 1rem;
	}
</style>
