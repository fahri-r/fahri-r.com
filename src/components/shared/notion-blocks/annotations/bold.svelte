<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { RichText } from '~/interfaces/notion/block.interface';

	interface Props {
		richText: RichText;
		children: Snippet;
	}

	let { richText, children }: Props = $props();
</script>

{#if richText.annotation.bold}
	<b class="bold-text">
		{@render children()}
	</b>
{:else}
	{@render children()}
{/if}

<style>
	.bold-text {
		font-weight: bold;
	}
</style>
