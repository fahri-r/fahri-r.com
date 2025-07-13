<script lang="ts">
	import { onMount } from 'svelte';
	import { buildURLToHTMLMap, isAmazonURL, isTweetURL } from '~/libs/blog-helper';
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
		headings: (interfaces.Heading1 | interfaces.Heading2 | interfaces.Heading3)[];
	}

	const {
		blocks: rawBlocks,
		headings = []
	}: Props = $props();
	
	let blocks: interfaces.Block[] = $state(rawBlocks);
	let bookmarkURLMap: { [key: string]: string } | undefined = $state();

	onMount(async () => {
		const bookmarkURLs = blocks
			.filter((b: interfaces.Block) => b.type === 'bookmark' || b.type === 'link_preview' || b.type === 'embed')
			.map((b: interfaces.Bookmark | interfaces.LinkPreview | interfaces.Embed) => {
				const urlString = b.url;

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
	{#if block.type === 'paragraph'}
		<Paragraph {block} {headings} />
	{:else if block.type === 'heading_1'}
		<Heading1 {block} {headings} />
	{:else if block.type === 'heading_2'}
		<Heading2 {block} {headings} />
	{:else if block.type === 'heading_3'}
		<Heading3 {block} {headings} />
	{:else if block.type === 'divider'}
		<Divider />
	{:else if block.type === 'quote'}
		<Quote {block} {headings} />
	{:else if block.type === 'embed'}
		<Embed {block} urlMap={bookmarkURLMap!} />
	{:else if block.type === 'bookmark' || block.type === 'link_preview'}
		<Bookmark {block} urlMap={bookmarkURLMap!} />
	{:else if block.type === 'callout'}
		<Callout {block} {headings} />
	{:else if block.type === 'video'}
		<Video {block} />
	{:else if block.type === 'image'}
		<Image {block} />
	{:else if block.type === 'file'}
		<File {block} />
	{:else if block.type === 'toggle'}
		<Toggle {block} {headings} />
	{:else if block.type === 'table'}
		<Table {block} />
	{:else if block.type === 'table_of_contents'}
		<TableOfContents {block} {headings} />
	{:else if block.type === 'synced_block'}
		<SyncedBlock {block} {headings} />
	{:else if block.type === 'link_to_page'}
		<LinkToPage {block} />
	{:else if block.type === 'code'}
		<Code {block} />
	{:else if block.type === 'equation'}
		<Equation {block} />
	{/if}
{/each}
