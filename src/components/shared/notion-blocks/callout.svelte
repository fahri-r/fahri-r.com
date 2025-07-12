<script lang="ts">
	import type { Block, Emoji, FileObject } from '~/interfaces/notion/block.interface';
	import RichText from '~/components/shared/notion-blocks/rich-text.svelte';
	import NotionBlocks from '~/components/shared/notion-blocks/notion-block.svelte';

	interface Props {
		block: Block;
		headings: Block[];
	}

	const { block, headings }: Props = $props();
</script>

<div class={`callout ${block.callout!.color.replaceAll('_', '-')}`}>
	{#if block.callout!.icon}
		<div class="icon">
			{#if block.callout!.icon.type === 'emoji'}
				{(block.callout!.icon as Emoji).emoji}
			{:else if block.callout?.icon.type === 'external'}
				<img src={(block.callout.icon as FileObject).url} alt="Icon in a callout block" />
			{:else}
				{null}
			{/if}
		</div>
	{/if}

	<div>
		{#each block.callout!.richTexts as richText}
			<RichText {richText} />
		{/each}

		{#if block.callout!.children}
			<NotionBlocks blocks={block.callout!.children} {headings} />
		{/if}
	</div>
</div>

<style>
	.callout {
		display: flex;
		margin: 0.4rem auto;
		padding: 16px 12px;
		width: 100%;
		font-size: 1rem;
		font-weight: 400;
		line-height: 1.6rem;
		border-radius: 3px;
		border-width: 1px;
		border-style: solid;
		border-color: transparent;
		background: rgba(235, 236, 237, 0.6);
	}
	.callout > div {
		margin: 0;
		line-height: 1.5rem;
	}
	.callout > div.icon {
		margin-right: 0.7rem;
	}
	.callout > div.icon > img {
		width: 1.2rem;
		height: 1.2rem;
	}
</style>
