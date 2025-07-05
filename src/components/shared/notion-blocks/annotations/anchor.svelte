<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { RichText } from '~/interfaces/notion/block.interface';

	interface Props {
		richText: RichText;
		children: Snippet;
	}

	let { richText, children }: Props = $props();
</script>

{#if richText.href}
	<a href={richText.href} class="link">
		{@render children()}
	</a>
{:else}
	{@render children()}
{/if}

<style>
	a.link {
		text-decoration: underline;
	}
</style>
