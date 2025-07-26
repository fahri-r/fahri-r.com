<script lang="ts" module>
</script>

<script lang="ts">
	import { Button } from '~/components/shared/button';
	import {
		ChevronLeftIcon,
		ChevronRightIcon,
		ChevronsLeftIcon,
		ChevronsRightIcon
	} from '@lucide/svelte';
	import { onMount } from 'svelte';

	interface Props {
		currentPage: number;
		lastPage: number;
		path: string;
		maxVisiblePages?: number;
	}

	const { currentPage, lastPage, path, maxVisiblePages = 3 }: Props = $props();
	const basePath = `/${path}/`;
	const lastPath = basePath + lastPage;

	const prevPage = currentPage - 1;
	const prevPath = prevPage == 1 ? basePath : basePath + prevPage;

	const nextPage = currentPage + 1;
	const nextPath = basePath + nextPage;

	let startPage = $derived(Math.max(1, currentPage - Math.floor(maxVisiblePages / 2)));
	let endPage = $derived(Math.min(lastPage, startPage + maxVisiblePages - 1));

	onMount(() => {
		if (endPage - startPage + 1 < maxVisiblePages) {
			startPage = Math.max(1, endPage - maxVisiblePages + 1);
		}
	});
</script>

<div class="flex items-center justify-center gap-1">
	<Button href={basePath} variant={'outline'} disabled={currentPage == 1}>
		<ChevronsLeftIcon />
	</Button>

	<Button href={prevPath} variant={'outline'} disabled={currentPage == 1}>
		<ChevronLeftIcon />
	</Button>

	{#each Array.from({ length: endPage - startPage + 1 }) as _, i}
		{@const pageNum = startPage + i}
		<Button
			disabled={pageNum === currentPage}
			href={pageNum === 1 ? `/${path}/` : `/${path}/${pageNum}/`}
			variant={pageNum === currentPage ? 'default' : 'outline'}
		>
			{pageNum}
		</Button>
	{/each}

	<Button href={nextPath} disabled={currentPage == lastPage} variant={'outline'}>
		<ChevronRightIcon />
	</Button>

	<Button href={lastPath} disabled={currentPage == lastPage} variant={'outline'}>
		<ChevronsRightIcon />
	</Button>
</div>
