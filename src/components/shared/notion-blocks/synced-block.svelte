<script lang="ts">
	import type { Heading1, Heading2, Heading3, SyncedBlock } from '~/interfaces/notion/block.interface';
	import NotionBlocks from '~/components/shared/notion-blocks/notion-block.svelte';

	interface Props {
		block: SyncedBlock;
		headings: (Heading1 | Heading2 | Heading3)[];
	}

	const { block, headings }: Props = $props();
</script>

<NotionBlocks blocks={block.children!} {headings} />
