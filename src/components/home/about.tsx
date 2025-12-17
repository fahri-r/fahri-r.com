import profile from '~/constants/profile';

export default function AboutSection() {
	return (
		<section id="about">
			<div className="flex flex-col gap-y-2">
				<div>
					<h2 className="text-xl font-bold">About</h2>
				</div>
				<div>
					<p className="prose text-muted-foreground dark:prose-invert max-w-full font-sans text-sm text-pretty">
						{profile.description}
					</p>
				</div>
			</div>
		</section>
	);
}
