<script lang="ts">
	import { Dock, DockIcon } from '~/components/shared/dock';
	import {
		Tooltip,
		TooltipTrigger,
		TooltipContent,
		TooltipProvider
	} from '~/components/shared/tooltip';
	import { Separator } from '~/components/shared/separator';
	import { Button } from '~/components/shared/button';
	import ModeToggle from '~/components/mode-toggle.svelte';
	import LucideIcon from '~/components/lucide-icon.svelte';
	import menu from '~/constants/menu';
	import profile from '~/constants/profile';
</script>

<div
	class="pointer-events-none fixed inset-x-0 bottom-0 z-50 mx-auto mb-4 flex origin-bottom h-full max-h-14"
>
	<div
		class="fixed bottom-0 inset-x-0 h-16 w-full bg-background to-transparent backdrop-blur-lg [-webkit-mask-image:linear-gradient(to_top,black,transparent)] dark:bg-background"
	></div>
	<Dock
		class="z-50 pointer-events-auto relative mx-auto flex min-h-full h-full items-center px-1 bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] "
	>
		{#each menu as item}
			<DockIcon>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger>
							<Button href={item.path} class="rounded-full" variant="ghost" size="icon">
								<LucideIcon name={item.icon} class="!size-4" />
							</Button>
						</TooltipTrigger>
						<TooltipContent>
							<p>{item.name}</p>
						</TooltipContent>
					</Tooltip></TooltipProvider
				>
			</DockIcon>
		{/each}

		<Separator orientation="vertical" className="h-full" />
		{#each profile.socials as item}
			<DockIcon>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								href={item.href}
								class="rounded-full"
								variant="ghost"
								size="icon"
								target="_blank"
							>
								<LucideIcon name={item.icon} class="!size-4" />
							</Button>
						</TooltipTrigger>
						<TooltipContent>
							<p>{item.label}</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</DockIcon>
		{/each}

		<Separator orientation="vertical" class="h-full py-2" />
		<DockIcon>
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<ModeToggle />
					</TooltipTrigger>
					<TooltipContent>
						<p>Theme</p>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		</DockIcon>
	</Dock>
</div>
