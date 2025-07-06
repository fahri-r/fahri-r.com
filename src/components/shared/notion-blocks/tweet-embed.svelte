<script lang="ts">
	interface Props {
		url: URL;
	}

	const { url }: Props = $props();

	const postURL =
		url.hostname === 'x.com' || url.hostname === 'www.x.com'
			? new URL(url.pathname, 'https://twitter.com')
			: url;
</script>

<svelte:head>
	<script async src="//platform.twitter.com/widgets.js"></script>
</svelte:head>

<div class="tweet-embed">
	<blockquote class="twitter-tweet">
		<a href={postURL.toString()} aria-label="tweet"></a>
	</blockquote>
</div>

<style>
	.tweet-embed {
		width: 100%;
		max-width: 640px;
		margin: auto;
	}
	.tweet-embed div:first-child div:first-child {
		margin: auto;
	}
</style>
