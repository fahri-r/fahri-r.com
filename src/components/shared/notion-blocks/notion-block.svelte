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
	import Callout from '~/components/shared/notion-blocks/callout.svelte';
	import Video from '~/components/shared/notion-blocks/video.svelte';
	import Image from '~/components/shared/notion-blocks/image.svelte';
	import File from '~/components/shared/notion-blocks/file.svelte';
	import Toggle from '~/components/shared/notion-blocks/toggle.svelte';
	import Table from '~/components/shared/notion-blocks/table.svelte';
	import TableOfContents from '~/components/shared/notion-blocks/table-of-contents.svelte';
	import SyncedBlock from '~/components/shared/notion-blocks/synced-block.svelte';
	import LinkToPage from '~/components/shared/notion-blocks/link-to-page.svelte';
	import Code from '~/components/shared/notion-blocks/code.svelte';
	import Equation from '~/components/shared/notion-blocks/equation.svelte';

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
	{:else if block.type === notionBlokConst.Callout}
		<Callout {block} {headings} />
	{:else if block.type === notionBlokConst.Video}
		<Video {block} />
	{:else if block.type === notionBlokConst.Image}
		<Image {block} />
	{:else if block.type === notionBlokConst.File}
		<File {block} />
	{:else if block.type === notionBlokConst.Toggle}
		<Toggle {block} {headings} />
	{:else if block.type === notionBlokConst.Table}
		<Table {block} />
	{:else if block.type === notionBlokConst.TableOfContents}
		<TableOfContents {block} {headings} />
	{:else if block.type === notionBlokConst.SyncedBlock}
		<SyncedBlock {block} {headings} />
	{:else if block.type === notionBlokConst.LinkToPage}
		<LinkToPage {block} />
	{:else if block.type === notionBlokConst.Code}
		<Code {block} />
	{:else if block.type === notionBlokConst.Equation}
		<Equation {block} />
	{/if}
{/each}
