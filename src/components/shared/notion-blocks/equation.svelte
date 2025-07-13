<script lang="ts">
	import katex from 'katex';
	import { onMount } from 'svelte';
	import type { Equation } from '~/interfaces/notion/block.interface';

	interface Props {
		block: Equation;
	}

	const { block }: Props = $props();

	let html = $state('');

	onMount(() => {
		html = katex.renderToString(block.expression!, {
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
