<script lang="ts">
	import { cn } from '~/libs/utils';

	let { class: className, children, ...props } = $props();
</script>

<div
	{...props}
	class={cn('mx-auto w-max h-full p-2 flex items-end rounded-full border', className)}
>
	{@render children?.()}
</div>
