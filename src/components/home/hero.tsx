import { Avatar, AvatarFallback, AvatarImage } from '~/components/shared/avatar';
import profile from '~/constants/profile';

export default function HeroSection() {
	return (
		<section id="hero">
			<div className="mx-auto w-full max-w-2xl space-y-8">
				<div className="flex items-center justify-between gap-2">
					<div className="flex flex-1 flex-col space-y-1.5 md:gap-4">
						<span className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
							{profile.name}
						</span>
						<span className="max-w-[600px] md:text-xl">{profile.job}</span>
					</div>

					<div>
						<Avatar className="size-28 border">
							<AvatarImage src={profile.imgUrl} alt={profile.initials} />
							<AvatarFallback>{profile.initials}</AvatarFallback>
						</Avatar>
					</div>
				</div>
			</div>
		</section>
	);
}
