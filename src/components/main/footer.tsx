import { Heart, Coffee } from 'lucide-react';
import profile from '~/constants/profile';

export function Footer() {
	return (
		<footer className="border-t p-10 text-sm text-neutral-400">
			<div className="flex flex-wrap items-center justify-between gap-4">
				<div className="space-x-4">
					<a className="hover:text-white" href="#">
						Email signup
					</a>
					<a className="hover:text-white" href="#">
						RSS feed
					</a>
					<a className="hover:text-white" href="#">
						Bluesky
					</a>
					<a className="hover:text-white" href="#">
						Buy me a coffee
					</a>
				</div>

				<div className="flex items-center gap-1">
					Made with <Heart className="h-3 w-3" /> by {profile.name}
				</div>
			</div>
		</footer>
	);
}
