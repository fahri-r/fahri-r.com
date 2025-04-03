<script lang="ts">
	import profile from '~/constants/profile.ts';
	import ResumeCard from '~/components/home/resume-card.svelte';
	import type { WorkDateProps } from '~/types/work';
	import moment from 'moment';

	function handlePeriod(entry: WorkDateProps, resign?: WorkDateProps) {
		const dateOut = resign ? new Date(resign.year, resign.month - 1) : 'Present';
		const dateIn = new Date(entry.year, entry.month - 1);

		return `${moment(dateIn).format('MMM yyyy')} - ${dateOut instanceof Date ? moment(dateOut).format('MMM yyyy') : dateOut}`;
	}
</script>

<section id="work">
	<div class="flex min-h-0 flex-col gap-y-4">
		<div>
			<h2 class="text-xl font-bold">Work Experience</h2>
		</div>
		{#each profile.works as work}
			<div>
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
		{/each}
	</div>
</section>
