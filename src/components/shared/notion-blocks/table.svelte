<script lang="ts">
	import type { Table } from '~/interfaces/notion/block.interface';
	import RichText from '~/components/shared/notion-blocks/rich-text.svelte';

	export interface Props {
		block: Table;
	}

	const { block }: Props = $props();
</script>

<div class="table">
	<table>
		<tbody>
			{#each block.rows as tableRow, j}
				<tr>
					{#each tableRow.cells as cell, i}
						{#if (block.hasRowHeader && i === 0) || (block.hasColumnHeader && j === 0)}
							<th>
								{#each cell.richTexts as richText}
									<RichText {richText} />
								{/each}
							</th>
						{:else}
							<td>
								{#each cell.richTexts as richText}
									<RichText {richText} />
								{/each}
							</td>
						{/if}
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
	.table {
	}
	.table table {
		margin: 0.6rem 0;
	}
	.table th,
	.table td {
		font-weight: normal;
	}
</style>
