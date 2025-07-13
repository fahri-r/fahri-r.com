<script lang="ts">
	import katex from 'katex';
	import { onMount } from 'svelte';
	import type { Block } from '~/interfaces/notion/block.interface';

	interface Props {
		block: Block;
	}

	const { block }: Props = $props();

	let html = $state('');

	onMount(() => {
		html = katex.renderToString(block.equation?.expression!, {
			throwOnError: false
		});
	});
</script>

<div class="equation">{@html html}</div>

<style>
	.equation {
		text-align: center;
	}
</style>
