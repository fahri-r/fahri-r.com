<script lang="ts">
	import { Avatar } from '~/components/shared/avatar';
	import profile from '~/constants/profile';
</script>

<section id="hero">
	<div class="mx-auto w-full max-w-2xl space-y-8">
		<div class="gap-2 flex justify-between items-center">
			<div class="flex-col flex flex-1 space-y-1.5 md:gap-4">
				<span class="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
					{profile.name}
				</span>
				<span class="max-w-[600px] md:text-xl">
					{profile.job}
				</span>
			</div>
			<div>
				<Avatar
					src={profile.imgUrl}
					class="size-28 border"
					width={200}
					height={200}
					alt={'Avatar'}
					fallback={profile.initials}
				/>
			</div>
		</div>
	</div>
</section>
