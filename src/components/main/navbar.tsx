import menu from '~/constants/menu';
import { Dock, DockIcon } from '../shared/dock';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../shared/tooltip';
import { Button } from '../shared/button';
import { Separator } from '../shared/separator';
import profile from '~/constants/profile';
import ModeToggle from './mode-toggle';
// import { DynamicIcon } from 'lucide-react/dynamic';

export default function Navbar() {
	return (
		<div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 mx-auto mb-4 flex h-full max-h-14 origin-bottom">
			<div className="bg-background dark:bg-background fixed inset-x-0 bottom-0 h-16 w-full to-transparent backdrop-blur-lg [-webkit-mask-image:linear-gradient(to_top,black,transparent)]" />

			<Dock className="bg-background pointer-events-auto relative z-50 mx-auto flex h-full min-h-full transform-gpu items-center px-1 [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] dark:[border:1px_solid_rgba(255,255,255,.1)]">
				{menu.map((item) => (
					<DockIcon key={item.path}>
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger>
									<a href={item.path}>
										<Button className="rounded-full" variant="ghost" size="icon">
											{/* <DynamicIcon name={item.icon} className="!size-4" /> */}
										</Button>
									</a>
								</TooltipTrigger>
								<TooltipContent>
									<p>{item.name}</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</DockIcon>
				))}

				<Separator orientation="vertical" className="h-full" />

				{profile.socials.map((item) => (
					<DockIcon key={item.href}>
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<a href={item.href} target="_blank">
										<Button className="rounded-full" variant="ghost" size="icon">
											{/* <DynamicIcon name={item.icon} className="!size-4" /> */}
										</Button>
									</a>
								</TooltipTrigger>
								<TooltipContent>
									<p>{item.label}</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</DockIcon>
				))}

				<Separator orientation="vertical" className="h-full py-2" />

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
	);
}
