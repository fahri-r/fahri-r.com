<script lang="ts">
	import type { Image } from '~/interfaces/notion/block.interface';
	import { filePath } from '~/libs/blog-helper.ts';
	import Caption from '~/components/shared/notion-blocks/caption.svelte';
	import { onMount } from 'svelte';

	interface Props {
		block: Image;
	}

	const { block }: Props = $props();

	let image = $state('');
	onMount(() => {
		if (block.mediaType === 'external') {
			image = block.external.url;
		} else if (block.mediaType === 'file') {
			image = filePath(new URL(block.file.url));
		}
	});
</script>

<figure class="image">
	{#if image}
		<div>
			<div>
				<img src={image} alt="Image in a image block" loading="lazy" />
			</div>
			<Caption richTexts={block.caption} />
		</div>
	{/if}
</figure>

<style>
	.image {
		display: flex;
		margin: 0.2rem auto 0;
	}
	.image > div {
		margin: 0 auto;
	}
	.image > div > div {
	}
	.image > div > div img {
		display: block;
		max-width: 100%;
	}
</style>
