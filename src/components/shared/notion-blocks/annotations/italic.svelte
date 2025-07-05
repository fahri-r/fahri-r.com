<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { RichText } from '~/interfaces/notion/block.interface';

	interface Props {
		richText: RichText;
		children: Snippet;
	}

	const { richText, children }: Props = $props();
</script>

{#if richText.annotation.italic}
	<i> {@render children()} </i>
{:else}
	{@render children()}
{/if}
