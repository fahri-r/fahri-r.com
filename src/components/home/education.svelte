<script lang="ts">
	import profile from '~/constants/profile.ts';
	import ResumeCard from '~/components/home/resume-card.svelte';
</script>

<section id="education">
	<div class="flex min-h-0 flex-col gap-y-4">
		<div>
			<h2 class="text-xl font-bold">Education</h2>
		</div>
		{#each profile.education as education}
			<div>
				<ResumeCard
					initials={education.initials}
					logoUrl={education.logoUrl}
					altText={education.institution}
					title={education.institution}
					subtitle={`${education.degree} - ${education.major}`}
					period={`${education.entry} - ${education.resign}`}
				/>
			</div>
		{/each}
	</div>
</section>
