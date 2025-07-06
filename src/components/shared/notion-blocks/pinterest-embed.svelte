<script lang="ts">
	interface Props {
		url: URL;
	}

	const { url }: Props = $props();
</script>

<svelte:head>
	<script async src="//assets.pinterest.com/js/pinit.js"></script>
</svelte:head>

<a href={url.toString()} data-pin-do="embedPin" aria-label="pinterest-embed"></a>
