<script lang="ts">
	import type { LinkToPage } from '~/interfaces/notion/block.interface';
	import Mention from '~/components/shared/notion-blocks/mention.svelte';

	interface Props {
		block: LinkToPage;
	}

	const { block }: Props = $props();
</script>

<p>
	<Mention pageId={block.pageId} />
</p>
