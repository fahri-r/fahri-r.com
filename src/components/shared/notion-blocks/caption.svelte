<script lang="ts">
	import type { RichText } from '~/interfaces/notion/block.interface';

	interface Props {
		richTexts: RichText[];
	}

	const { richTexts }: Props = $props();
</script>

{#if richTexts.length > 0 && richTexts[0].text?.content}
	<div class="caption">
		<div>{richTexts[0].text.content}</div>
	</div>
{/if}

<style>
	.caption {
		display: flex;
		margin-top: 0.3rem;
		font-size: 0.9rem;
		color: var(--accents-3);
		white-space: pre-wrap;
		word-break: break-word;
		line-height: 1.4;
	}
	.caption > div {
		flex-grow: 1;
		width: 0;
	}
</style>
