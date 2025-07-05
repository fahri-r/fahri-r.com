<script lang="ts">
	import * as notionBlokConst from '~/constants/notion-block'
	import * as interfaces from '~/interfaces/notion/block.interface';
	import Paragraph from '~/components/shared/notion-blocks/paragraph.svelte';
	import Heading1 from '~/components/shared/notion-blocks/heading1.svelte';
	import Heading2 from '~/components/shared/notion-blocks/heading2.svelte';
	import Heading3 from '~/components/shared/notion-blocks/heading3.svelte';

	interface Props {
		blocks: interfaces.Block[];
	}

	const { blocks}: Props = $props();
</script>

{#each blocks as block}
	{#if block.type === notionBlokConst.Paragraph}
		<Paragraph {block}/>
	{:else if block.type === notionBlokConst.Heading1}
		<Heading1 {block}/>
	{:else if block.type === notionBlokConst.Heading2}
		<Heading2 {block}/>
	{:else if block.type === notionBlokConst.Heading3}
		<Heading3 {block}/>
	{/if}
{/each}
