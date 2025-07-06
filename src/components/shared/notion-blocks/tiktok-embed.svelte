<script lang="ts">
	interface Props {
		url: URL;
	}

	const { url }: Props = $props();
	const user = url.pathname.split('/')[1];
	const videoId = url.pathname.split('/')[3];
</script>

<svelte:head>
	<script async src="//www.tiktok.com/embed.js"></script>
</svelte:head>

<div class="tiktok-wrapper">
	<blockquote
		class="tiktok-embed"
		cite={url.toString()}
		data-video-id={videoId}
		style="min-width: 325px;"
	>
		<section>
			<a target="_blank" title={user} href="https://www.tiktok.com/{user}?refer=embed">{user}</a>
		</section>
	</blockquote>
</div>

<style>
	.tiktok-wrapper {
		max-width: 325px;
		overflow-x: auto;
		margin-block-start: 1.5rem;
		margin-inline: auto;
		border-radius: 8px;
	}
	blockquote.tiktok-embed {
		margin: 0;
	}
</style>
