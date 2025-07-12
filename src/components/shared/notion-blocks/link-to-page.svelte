<script lang="ts">
	import type { Block } from '~/interfaces/notion/block.interface';
	import Mention from '~/components/shared/notion-blocks/mention.svelte';

	interface Props {
		block: Block;
	}

	const { block }: Props = $props();
</script>

<p>
	<Mention pageId={block.linkToPage?.pageId!} />
</p>
