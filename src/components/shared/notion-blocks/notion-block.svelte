<script lang="ts">
	import { onMount } from 'svelte';
	import { buildURLToHTMLMap, isAmazonURL, isTweetURL } from '~/libs/blog-helper';
	import * as notionBlokConst from '~/constants/notion-block';
	import * as interfaces from '~/interfaces/notion/block.interface';
	import Paragraph from '~/components/shared/notion-blocks/paragraph.svelte';
	import Heading1 from '~/components/shared/notion-blocks/heading1.svelte';
	import Heading2 from '~/components/shared/notion-blocks/heading2.svelte';
	import Heading3 from '~/components/shared/notion-blocks/heading3.svelte';
	import Divider from '~/components/shared/notion-blocks/divider.svelte';
	import Embed from '~/components/shared/notion-blocks/embed.svelte';
	import Quote from '~/components/shared/notion-blocks/quote.svelte';
	import Bookmark from '~/components/shared/notion-blocks/bookmark.svelte';

	interface Props {
		blocks: interfaces.Block[];
		isRoot?: boolean;
		headings: interfaces.Block[];
	}

	const {
		blocks: rawBlocks,
		isRoot = false,
		headings: rawHeadings = []
	}: Props = $props();

	let headings: interfaces.Block[] = $state(rawHeadings);
	let blocks: interfaces.Block[] = $state(rawBlocks);
	let bookmarkURLMap: { [key: string]: string } | undefined = $state();

	onMount(async () => {

		if (isRoot) {
			headings = blocks.filter((b: interfaces.Block) =>
				[notionBlokConst.Heading1, notionBlokConst.Heading2, notionBlokConst.Heading3].includes(
					b.type
				)
			);
		}

		const bookmarkURLs = blocks
			.filter((b: interfaces.Block) => [notionBlokConst.Bookmark, notionBlokConst.LinkPreview, notionBlokConst.Embed].includes(b.type))
			.map((b: interfaces.Block) => {
				const urlString = (b.bookmark || b.linkPreview || b.embed)!.url;

				let url: URL = new URL('');
				try {
					url = new URL(urlString);
				} catch (err) {
					console.log(err);
				}
				return url;
			})
			.filter((url: URL) => url && !isTweetURL(url) && !isAmazonURL(url));

		bookmarkURLMap = await buildURLToHTMLMap(bookmarkURLs);
	});
</script>

{#each blocks as block}
	{#if block.type === notionBlokConst.Paragraph}
		<Paragraph {block} {headings} />
	{:else if block.type === notionBlokConst.Heading1}
		<Heading1 {block} {headings} />
	{:else if block.type === notionBlokConst.Heading2}
		<Heading2 {block} {headings} />
	{:else if block.type === notionBlokConst.Heading3}
		<Heading3 {block} {headings} />
	{:else if block.type === notionBlokConst.Divider}
		<Divider />
	{:else if block.type === notionBlokConst.Quote}
		<Quote {block} {headings} />
	{:else if block.type === notionBlokConst.Embed}
		<Embed {block} urlMap={bookmarkURLMap!} />
	{:else if [notionBlokConst.Bookmark, notionBlokConst.LinkPreview].includes(block.type)}
		<Bookmark {block} urlMap={bookmarkURLMap!} />
	{/if}
{/each}
