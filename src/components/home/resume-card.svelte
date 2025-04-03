<script lang="ts">
	import { ChevronRightIcon } from '@lucide/svelte';
	import { Card, CardHeader } from '~/components/shared/card';
	import { Avatar } from '~/components/shared/avatar';
	import { cn } from '~/utils';

	let { logoUrl, altText, title, subtitle, period, description, initials } = $props();

	let isExpanded = $state(false);

	function onclick(e: MouseEvent) {
		if (description) {
			e.preventDefault();
			isExpanded = !isExpanded;
		}
	}
</script>

<button
	{onclick}
	class={cn('block cursor-default w-full', {
		'cursor-pointer': description
	})}
	type="button"
>
	<Card class="flex">
		<div class="flex-none">
			<Avatar
				src={logoUrl}
				class="size-12 m-auto bg-muted-background dark:bg-foreground"
				width={200}
				height={200}
				alt={altText}
				fallback={initials}
			/>
		</div>
		<div class="flex-grow ml-4 items-center flex-col group">
			<CardHeader>
				<div class="flex items-center justify-between gap-x-2 text-base">
					<h3
						class="inline-flex items-center justify-center font-semibold leading-none text-xs sm:text-sm"
					>
						{title}
						<ChevronRightIcon
							class={cn(
								'size-4 translate-x-0 transform opacity-0 transition-all duration-300 ease-out rotate-0',
								{
									'rotate-90': isExpanded,
									'group-hover:translate-x-1 group-hover:opacity-100': description
								}
							)}
						/>
					</h3>
					<div class="text-xs sm:text-sm tabular-nums text-muted-foreground text-right font-sans">
						{period}
					</div>
				</div>
				{#if subtitle}
					<div class="font-sans text-xs">{subtitle}</div>
				{/if}
			</CardHeader>
			{#if description && isExpanded}
				<div class="mt-2 text-xs sm:text-sm">
					{description}
				</div>
			{/if}
		</div>
	</Card>
</button>
