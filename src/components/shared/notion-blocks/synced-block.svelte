<script lang="ts">
	import type { Block } from '~/interfaces/notion/block.interface';
	import NotionBlocks from '~/components/shared/notion-blocks/notion-block.svelte';

	interface Props {
		block: Block;
		headings: Block[];
	}

	const { block, headings }: Props = $props();
</script>

<NotionBlocks blocks={block.syncedBlock!.children!} {headings} />
