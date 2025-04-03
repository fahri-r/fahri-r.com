<script lang="ts">
	import profile from '~/constants/profile';
</script>

<section id="about">
	<div class="flex flex-col gap-y-2">
		<div>
			<h2 class="text-xl font-bold">About</h2>
		</div>
		<div>
			<p
				class="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert"
			>
				{profile.description}
			</p>
		</div>
	</div>
</section>
