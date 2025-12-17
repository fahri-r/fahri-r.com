import profile from '~/constants/profile';
import ResumeCard from '~/components/home/resume-card';
import moment from 'moment';
import type { WorkDate } from '~/interfaces/work.interface';

function handlePeriod(entry: WorkDate, resign?: WorkDate) {
	const dateIn = new Date(entry.year, entry.month - 1);
	const dateOut = resign ? new Date(resign.year, resign.month - 1) : 'Present';

	return `${moment(dateIn).format('MMM yyyy')} - ${
		dateOut instanceof Date ? moment(dateOut).format('MMM yyyy') : dateOut
	}`;
}

export default function WorkSection() {
	return (
		<section id="work">
			<div className="flex min-h-0 flex-col gap-y-4">
				<div>
					<h2 className="text-xl font-bold">Work Experience</h2>
				</div>

				{profile.works.map((work) => (
					<div key={`${work.company}-${work.entry.year}-${work.entry.month}`}>
						<ResumeCard
							initials={work.initials}
							logoUrl={work.logoUrl}
							altText={work.company}
							title={work.company}
							subtitle={work.role}
							period={handlePeriod(work.entry, work.resign)}
							description={work.description}
						/>
					</div>
				))}
			</div>
		</section>
	);
}
