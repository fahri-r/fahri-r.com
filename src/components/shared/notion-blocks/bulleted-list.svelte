<script lang="ts">
	import type {
		BulletedList,
		Heading1,
		Heading2,
		Heading3
	} from '~/interfaces/notion/block.interface';
	import RichText from '~/components/shared/notion-blocks/rich-text.svelte';
	import NotionBlocks from '~/components/shared/notion-blocks/notion-block.svelte';
	import '~/styles/notion-color.css';

	interface Props {
		list: BulletedList;
		headings: (Heading1 | Heading2 | Heading3)[];
	}

	const { list, headings }: Props = $props();
	const { listItems: blocks } = list;
	console.log(blocks)
</script>

<ul>
	{#each blocks as b}
		<li class={b.color.replaceAll('_', '-')}>
			{#each b.richTexts as richText}
				<RichText {richText} />
			{/each}

			{#if b.hasChildren && b.children}
				<NotionBlocks blocks={b.children} {headings} />
			{/if}
		</li>
	{/each}
</ul>

<style>
	ul {
		font-size: 1rem;
	}
</style>
