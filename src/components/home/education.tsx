import profile from '~/constants/profile';
import ResumeCard from '~/components/home/resume-card';

export default function EducationSection() {
	return (
		<section id="education">
			<div className="flex min-h-0 flex-col gap-y-4">
				<div>
					<h2 className="text-xl font-bold">Education</h2>
				</div>

				{profile.education.map((education) => (
					<div key={`${education.institution}-${education.entry}`}>
						<ResumeCard
							initials={education.initials}
							logoUrl={education.logoUrl}
							altText={education.institution}
							title={education.institution}
							subtitle={`${education.degree} - ${education.major}`}
							period={`${education.entry} - ${education.resign}`}
						/>
					</div>
				))}
			</div>
		</section>
	);
}
