<script lang="ts">
	import '../../styles/notion-color.css';
	import arrow from '../../images/icon-arrow-link.svg';

	interface Props {
		pageId: string;
	}

	let { pageId }: Props = $props();

	let post: Post | null = null;

	// Load post data when pageId changes
	$: if (pageId) {
		getPostByPageId(pageId).then((p) => (post = p));
	}
</script>

{#if post}
	<a href={getPostLink(post.Slug)} class="link">
		<span class="icon">
			{#if post.Icon?.Type === 'emoji'}
				{post.Icon.Emoji}
			{:else if post.Icon?.Type === 'external'}
				<img src={post.Icon.Url} class="notion-icon" alt="Post title icon in a page link" />
			{:else}
				📄
			{/if}
			<img src={arrow} class="icon-link" alt="Arrow icon of a page link" />
		</span>
		<span class="text">{post.Title}</span>
	</a>
{:else}
	<a href="#" class="link">
		<span class="icon">
			🚫
			<img src={arrow} class="icon-link" alt="Arrow icon of a page link" />
		</span>
		<span class="text not-found">Post not found</span>
	</a>
{/if}

<style>
	a.link {
		display: inline-flex;
		font-weight: 600;
		gap: 4px;
	}
	span.icon {
		height: fit-content;
		flex-shrink: 0;
		position: relative;
	}
	span.icon img.notion-icon {
		width: 1.3em;
		height: 1.3rem;
		vertical-align: sub;
		flex-shrink: 0;
		position: relative;
	}
	span.icon img.icon-link {
		display: block;
		position: absolute;
		top: 1em;
		right: 0;
		width: 8px;
		height: 8px;
	}
	span.text {
		color: var(--fg);
		font-weight: 500;
		text-decoration: underline;
	}
	span.text.not-found {
		font-weight: normal;
		text-decoration: none;
	}
</style>
