<script lang="ts">
	import { cn } from '~/libs/utils';

	let { children, class: className, ...props } = $props();
</script>

<div
	{...props}
	class={cn(
		'flex aspect-square cursor-pointer items-center justify-center rounded-full',
		className
	)}
>
	{@render children?.()}
</div>
