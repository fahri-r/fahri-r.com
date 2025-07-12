<script lang="ts">
	import type { Block } from '~/interfaces/notion/block.interface';
	import { isYouTubeURL, parseYouTubeVideoId } from '~/libs/blog-helper.ts';
	import Caption from '~/components/shared/notion-blocks/caption.svelte';
	import { onMount } from 'svelte';

	interface Props {
		block: Block;
	}

	const { block }: Props = $props();

	let url: URL | undefined = $state();
	onMount(() => {
		try {
			url = new URL(block.video!.external?.url!);
		} catch (err) {
			console.log(err);
		}
	});
</script>

<div class="video">
	<div>
		{#if url && isYouTubeURL(url!)}
			<iframe
				src={`https://www.youtube.com/embed/${parseYouTubeVideoId(url!)}`}
				title="YouTube video player"
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				allowfullscreen
			>
			</iframe>
		{/if}
	</div>
	<Caption richTexts={block.video!.caption} />
</div>

<style>
	.video div:first-child {
		width: 100%;
	}
	.video div:first-child iframe {
		width: 100%;
		height: 340px;
	}
	@media (max-width: 640px) {
		.video div:first-child iframe {
			height: 220px;
		}
	}
</style>
