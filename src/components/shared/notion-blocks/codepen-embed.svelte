<script lang="ts">
	interface Props {
		url: URL;
	}

	const { url }: Props = $props();
	const user = url.pathname.split('/')[1];
	const id = url.pathname.split('/')[3];
</script>

<svelte:head>
	<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
</svelte:head>

<p
	class="codepen"
	data-slug-hash={id.toString()}
	data-user={user.toString()}
	style="box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;"
></p>

<style is:global>
	.cp_embed_wrapper {
		width: 100%;
		aspect-ratio: 1.6 / 1;
		background-color: #fff;
	}
	.cp_embed_wrapper iframe {
		height: 100% !important;
	}
</style>
