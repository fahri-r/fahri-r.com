<script lang="ts">
	import type { RichText } from '~/interfaces/notion/block.interface';
	import Anchor from '~/components/shared/notion-blocks/annotations/anchor.svelte';
	import Code from '~/components/shared/notion-blocks/annotations/code.svelte';
	import Color from '~/components/shared/notion-blocks/annotations/color.svelte';
	import Underline from '~/components/shared/notion-blocks/annotations/underline.svelte';
	import Strikethrough from '~/components/shared/notion-blocks/annotations/strikethrough.svelte';
	import Italic from '~/components/shared/notion-blocks/annotations/italic.svelte';
	import Bold from '~/components/shared/notion-blocks/annotations/bold.svelte';
	import katex, { type KatexOptions } from 'katex';

	interface Props {
		richText: RichText;
	}

	const { richText }: Props = $props();

	function renderKatex(
		node: HTMLElement,
		params: {
			expression: string;
			options?: KatexOptions;
		}
	): {
		update?: (params: { expression: string; options?: KatexOptions }) => void;
	} {
		const { expression, options } = params;
		katex.render(expression, node, options);

		return {
			update({ expression, options }) {
				katex.render(expression, node, options);
			}
		};
	}
</script>

<Anchor {richText}>
	<Code {richText}>
		<Color {richText}>
			<Underline {richText}>
				<Strikethrough {richText}>
					<Italic {richText}>
						<Bold {richText}>
							{#if richText.text?.content}
								{#each richText.text.content.split('\n') as content, i}
									{#if i > 0}
										<br />
									{/if}
									{content}
								{/each}
							{/if}

							{#if richText.equation}
								<span
									use:renderKatex={{
										expression: richText.equation.expression,
										options: { throwOnError: false }
									}}
								></span>
							{/if}
						</Bold>
					</Italic>
				</Strikethrough>
			</Underline>
		</Color>
	</Code>
</Anchor>
