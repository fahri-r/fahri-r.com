<script lang="ts">
	import type {
		Callout,
		Emoji,
		FileObject,
		Heading1,
		Heading2,
		Heading3
	} from '~/interfaces/notion/block.interface';
	import RichText from '~/components/shared/notion-blocks/rich-text.svelte';
	import NotionBlocks from '~/components/shared/notion-blocks/notion-block.svelte';

	interface Props {
		block: Callout;
		headings: (Heading1 | Heading2 | Heading3)[];
	}

	const { block, headings }: Props = $props();
</script>

<div class={`callout ${block.color.replaceAll('_', '-')}`}>
	{#if block.icon}
		<div class="icon">
			{#if block.icon.type === 'emoji'}
				{(block.icon as Emoji).emoji}
			{:else if block.icon.type === 'external'}
				<img src={(block.icon as FileObject).url} alt="Icon in a callout block" />
			{:else}
				{null}
			{/if}
		</div>
	{/if}

	<div>
		{#each block.richTexts as richText}
			<RichText {richText} />
		{/each}

		{#if block.hasChildren && block.children}
			<NotionBlocks blocks={block.children} {headings} />
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
