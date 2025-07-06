<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { RichText } from '~/interfaces/notion/block.interface';
	import '~/styles/notion-color.css';

	interface Props {
		richText: RichText;
		children: Snippet;
	}

	const { richText, children }: Props = $props();
</script>

{#if richText.annotation.color !== 'default'}
	<span class={richText.annotation.color.replaceAll('_', '-')}>{@render children()}</span>
{:else}
	{@render children()}
{/if}
