<script lang="ts">
	import * as interfaces from '~/interfaces/notion/block.interface';
	import {
		isTweetURL,
		isTikTokURL,
		isInstagramURL,
		isPinterestURL,
		isCodePenURL
	} from '~/libs/blog-helper.ts';
	import Bookmark from '~/components/shared/notion-blocks/bookmark.svelte';
	import TweetEmbed from '~/components/shared/notion-blocks/tweet-embed.svelte';
	import TikTokEmbed from '~/components/shared/notion-blocks/tiktok-embed.svelte';
	import InstagramEmbed from '~/components/shared/notion-blocks/instagram-embed.svelte';
	import PinterestEmbed from '~/components/shared/notion-blocks/pinterest-embed.svelte';
	import CodePenEmbed from '~/components/shared/notion-blocks/codepen-embed.svelte';
	import { onMount } from 'svelte';

	interface Props {
		block: interfaces.Block;
		urlMap: { [key: string]: string };
	}

	const { block, urlMap }: Props = $props();

	let url: URL | undefined = $state();
	onMount(() => {
		try {
			url = new URL(block.embed?.url!);
		} catch (err) {
			console.log(err);
		}
	});
</script>

{#if url}
	{#if isTweetURL(url)}
		<TweetEmbed {url} />
	{:else if isTikTokURL(url)}
		<TikTokEmbed {url} />
	{:else if isInstagramURL(url)}
		<InstagramEmbed {url} />
	{:else if isPinterestURL(url)}
		<PinterestEmbed {url} />
	{:else if isCodePenURL(url)}
		<CodePenEmbed {url} />
	{:else}
		<Bookmark {block} {urlMap} />
	{/if}
{/if}
