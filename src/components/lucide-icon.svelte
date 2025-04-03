<script>
	import * as icons from '@lucide/svelte';
	let { name, ...props } = $props();

	const LucideIcon = icons[name];
</script>

<LucideIcon {...props} />
