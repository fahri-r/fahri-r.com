import { Github, Rss, User, NotebookPen, Folder } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../shared/avatar';
import { Separator } from '../shared/separator';
import profile from '~/constants/profile';

export function Sidebar() {
	return (
		<div className="min-w-3xs space-y-6 p-6 sticky top-0">
			{/* Profile */}
			<div className="flex items-center gap-3">
				<Avatar>
					<AvatarImage src={profile.imgUrl} />
					<AvatarFallback>{profile.initials}</AvatarFallback>
				</Avatar>
				<div>
					<p className="font-semibold">{profile.name}</p>
					<p className="text-sm text-neutral-400">{profile.job}</p>
				</div>
			</div>

			<Separator />

			{/* Nav */}
			<div className="space-y-2">
				<p className="text-xs text-neutral-400 uppercase">Navigation</p>

				<SidebarLink icon={<NotebookPen size={14} />} label="Blog" />
				<SidebarLink icon={<User size={14} />} label="About Me" />
				<SidebarLink icon={<Folder size={14} />} label="Projects" />
			</div>

			<Separator />

			{/* Connected */}
			<div className="space-y-2">
				<p className="text-xs text-neutral-400 uppercase">Stay Connected</p>

				<SidebarLink icon={<Rss size={14} />} label="RSS Feed" />
				<SidebarLink icon={<Github size={14} />} label="GitHub" />
			</div>
		</div>
	);
}

function SidebarLink({ icon, label }: { icon: React.ReactNode; label: string }) {
	return (
		<button className="flex w-full items-center gap-2 rounded-lg px-2 py-1 text-sm text-neutral-300 hover:bg-neutral-900 hover:text-white">
			{icon}
			{label}
		</button>
	);
}
