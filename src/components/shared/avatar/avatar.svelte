<script>
	import { onMount } from 'svelte';
	import { cn } from '~/libs/utils';

	let { class: className, src, fallback, ...props } = $props();

	let loading = $state(true);
	let loaded = $state(false);
	let failed = $state(false);
	onMount(() => {
		const img = new Image();
		img.src = src;

		img.onload = () => {
			loading = false;
			loaded = true;
		};

		img.onerror = () => {
			loading = false;
			failed = true;
		};
	});
</script>

{#if loaded}
	<img {src} class={cn('aspect-square size-full rounded-full', className)} {...props} />
{:else if failed || loading}
	<div
		class={cn(
			'flex aspect-square size-full items-center justify-center rounded-full',
			className,
			'bg-muted dark:bg-muted'
		)}
		{...props}
	>
		{fallback}
	</div>
{/if}
