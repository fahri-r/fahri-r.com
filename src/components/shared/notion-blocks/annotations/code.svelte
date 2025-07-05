<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { RichText } from '~/interfaces/notion/block.interface';

	interface Props {
		richText: RichText;
		children: Snippet;
	}

	const { richText, children }: Props = $props();
</script>

{#if richText.annotation.code}
	<code> {@render children()} </code>
{:else}
	{@render children()}
{/if}

<style>
	code {
		color: #eb5757;
		padding: 0.25rem;
	}
</style>
