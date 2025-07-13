<script lang="ts">
	import type {
		Heading1,
		Heading2,
		Heading3,
		ToDoList
	} from '~/interfaces/notion/block.interface.ts';
	import RichText from '~/components/shared/notion-blocks/rich-text.svelte';
	import NotionBlocks from '~/components/shared/notion-blocks/notion-block.svelte';
	import '~/styles/notion-color.css';

	interface Props {
		list: ToDoList;
		headings: (Heading1 | Heading2 | Heading3)[];
	}

	const { list, headings }: Props = $props();
	const { listItems: blocks } = list;
</script>

<div class="to-do">
	{#each blocks as b}
		<div class={b.color.replaceAll('_', '-')}>
			<input type="checkbox" checked={b.checked} disabled />
			{#each b.richTexts as richText}
				{#if b.checked}
					<s>
						<RichText {richText} />
					</s>
				{:else}
					<RichText {richText} />;
				{/if}
			{/each}

			{#if b.hasChildren && b.children}
				<NotionBlocks blocks={b.children} {headings} />
			{/if}
		</div>
	{/each}
</div>

<style>
	.to-do {
		color: #222;
		font-weight: 400;
		font-size: 1rem;
		line-height: 1.8rem;
		padding-inline-start: 1rem;
	}
	.to-do > div {
	}
	.to-do > div > input {
	}
	.to-do > div > s {
		color: var(--accents-3);
	}
</style>
