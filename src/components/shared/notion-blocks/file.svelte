<script lang="ts">
	import type { Block } from '~/interfaces/notion/block.interface';
	import { filePath } from '~/libs/blog-helper.ts';
	import Caption from '~/components/shared/notion-blocks/caption.svelte';
	import { onMount } from 'svelte';

	interface Props {
		block: Block;
	}

	const { block }: Props = $props();

	let filename = $state('');
	let url: URL | undefined = $state();

	onMount(() => {
		try {
			url = new URL(block.file?.external?.url || block.file?.file?.url!);
			filename = decodeURIComponent(url.pathname.split('/').slice(-1)[0]);
		} catch (err) {
			console.log(err);
		}
	});
</script>

<div class="file">
	<div>
		{#if url}
			<a
				href={block.file?.external ? url.toString() : filePath(url)}
				target="_blank"
				rel="noopener noreferrer"
			>
				<img
					src="https://www.notion.so/icons/document_gray.svg"
					alt="File icon in a file block"
				/>{' '}
				{filename}
			</a>
		{/if}
	</div>
	<Caption richTexts={block.file?.caption!} />
</div>

<style>
	.file {
	}

	.file a {
		display: block;
		padding: 0.5rem 0.2rem 0.4rem;
		border-radius: var(--radius);
		color: var(--fg);
		font-weight: 500;
		line-height: 1.4rem;
	}
	.file a:hover {
		background-color: #eee;
	}

	.file a img {
		width: 1.3rem;
		height: 1.3rem;
		vertical-align: sub;
	}
</style>
