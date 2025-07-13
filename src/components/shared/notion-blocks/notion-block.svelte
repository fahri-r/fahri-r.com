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
	import BulletedListItems from '~/components/shared/notion-blocks/bulleted-list.svelte';
	import NumberedListItems from '~/components/shared/notion-blocks/numbered-list.svelte';
	import ToDoListItems from '~/components/shared/notion-blocks/to-do-list.svelte';

	interface Props {
		blocks: interfaces.Block[];
		headings: (interfaces.Heading1 | interfaces.Heading2 | interfaces.Heading3)[];
		level?: number;
	}

	const { blocks: rawBlocks, headings = [], level = 1 }: Props = $props();

	let blocks: interfaces.Block[] = $state([]);
	let listGroups: interfaces.List[] = $state([]);
	let bookmarkURLMap: { [key: string]: string } | undefined = $state();

	onMount(async () => {
		let prevBlock: interfaces.Block | undefined;
		let currentListGroup: interfaces.Block[] = []; // Track consecutive list items of same type
		let bookmarkURLs: URL[] = [];

		for (const block of rawBlocks) {
			const isListBlock =
				block.type === 'bulleted_list_item' ||
				block.type === 'numbered_list_item' ||
				block.type === 'to_do';

			// Handle list items grouping
			if (isListBlock) {
				// Start new group if:
				// 1. First block
				// 2. Not same type as previous
				// 3. Previous block wasn't a list item
				if (!prevBlock || prevBlock.type !== block.type || !currentListGroup.length) {
					currentListGroup.push(block);
					blocks.push(block); // Only add first item of each group
				} else {
					currentListGroup.push(block);
				}
			}
			// Handle non-list blocks
			else {
				// Push any pending list group
				if (currentListGroup.length > 0) {
					listGroups.push({
						type: getListType(prevBlock!.type),
						listItems: [...currentListGroup]
					});
					currentListGroup = [];
				}
				blocks.push(block);
			}

			// Handle bookmark URLs
			if (block.type === 'bookmark' || block.type === 'link_preview' || block.type === 'embed') {
				try {
					const url = new URL(block.url);
					if (!isTweetURL(url) && !isAmazonURL(url)) {
						bookmarkURLs.push(url);
					}
				} catch (err) {
					console.error('Invalid URL:', block.url, err);
				}
			}

			// Build URL map
			bookmarkURLMap = await buildURLToHTMLMap(bookmarkURLs);
			prevBlock = block;
		}
	});

	// Helper function to determine list type
	function getListType(itemType: string): 'bulleted_list' | 'numbered_list' | 'to_do_list' {
		switch (itemType) {
			case 'bulleted_list_item':
				return 'bulleted_list';
			case 'numbered_list_item':
				return 'numbered_list';
			default:
				return 'to_do_list';
		}
	}
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
	{:else if block.type === 'bulleted_list_item'}
		{@const bulletedList = listGroups.find(
			(x) => x.type == 'bulleted_list' && x.listItems.some((item) => item.id === block.id)
		)! as interfaces.BulletedList}
		<BulletedListItems list={bulletedList} {headings} />
	{:else if block.type === 'numbered_list_item'}
		{@const numberedList = listGroups.find(
			(x) => x.type == 'numbered_list' && x.listItems.some((item) => item.id === block.id)
		)! as interfaces.NumberedList}
		{console.log(numberedList)}
		<NumberedListItems list={numberedList} {level} {headings} />
	{:else if block.type === 'to_do'}
		{@const toDoList = listGroups.find(
			(x) => x.type == 'to_do_list' && x.listItems.some((item) => item.id === block.id)
		)! as interfaces.ToDoList}
		<ToDoListItems list={toDoList} {headings} />
	{/if}
{/each}
