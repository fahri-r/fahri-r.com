import fs from 'node:fs';
import { pipeline } from 'node:stream/promises';
import axios from 'axios';
import retry from 'async-retry';
import type * as responses from '~/interfaces/notion/responses.interface';
import type * as requestParams from '~/interfaces/notion/request-params.interface';
import type {
	Block,
	Equation,
	SyncedFrom,
	TableRow,
	TableCell,
	Column,
	RichText,
	Text,
	Annotation,
	Emoji,
	Mention,
	Reference,
	FileObject,
	SyncedBlock
} from '~/interfaces/notion/block.interface';
import { Client, APIResponseError } from '@notionhq/client';
import { NOTION_KEY } from '~/constants/global';
import type { DatabaseColumn } from '~/interfaces/notion/database-column.interface';

const NUMBER_OF_RETRY = 2;

const client = new Client({
	auth: NOTION_KEY
});

export async function getAllPosts(databaseId: string, database: DatabaseColumn[]): Promise<any[]> {
	const params: requestParams.QueryDatabase = {
		database_id: databaseId,
		page_size: 100
	};

	let results: responses.PageObject[] = [];
	while (true) {
		const res = await retry(
			async (bail) => {
				try {
					return (await client.databases.query(
						params as any // eslint-disable-line @typescript-eslint/no-explicit-any
					)) as responses.QueryDatabaseResponse;
				} catch (error: unknown) {
					if (error instanceof APIResponseError) {
						if (error.status && error.status >= 400 && error.status < 500) {
							bail(error);
						}
					}
					throw error;
				}
			},
			{
				retries: NUMBER_OF_RETRY
			}
		);

		results = results.concat(res.results);

		if (!res.has_more) {
			break;
		}

		params['start_cursor'] = res.next_cursor as string;
	}

	var post = results.map((pageObject) => _buildPost(pageObject, database)).filter((post) => post);

	return post;
}

export async function getAllBlocksByBlockId(blockId: string): Promise<Block[]> {
	let results: responses.BlockObject[] = [];

	const params: requestParams.RetrieveBlockChildren = {
		block_id: blockId
	};

	while (true) {
		const res = await retry(
			async (bail) => {
				try {
					return (await client.blocks.children.list(
						params as any // eslint-disable-line @typescript-eslint/no-explicit-any
					)) as responses.RetrieveBlockChildrenResponse;
				} catch (error: unknown) {
					if (error instanceof APIResponseError) {
						if (error.status && error.status >= 400 && error.status < 500) {
							bail(error);
						}
					}
					throw error;
				}
			},
			{
				retries: NUMBER_OF_RETRY
			}
		);

		results = results.concat(res.results);

		if (!res.has_more) {
			break;
		}

		params['start_cursor'] = res.next_cursor as string;
	}

	const allBlocks = results.map((blockObject) => _buildBlock(blockObject));

	for (let i = 0; i < allBlocks.length; i++) {
		const block = allBlocks[i];

		if (block.type === 'table') {
			block.rows = await _getTableRows(block.id);
		} else if (block.type === 'column_list') {
			block.columns = await _getColumns(block.id);
		} else if (block.type === 'bulleted_list_item' && block.hasChildren) {
			block.children = await getAllBlocksByBlockId(block.id);
		} else if (block.type === 'numbered_list_item' && block.hasChildren) {
			block.children = await getAllBlocksByBlockId(block.id);
		} else if (block.type === 'to_do' && block.hasChildren) {
			block.children = await getAllBlocksByBlockId(block.id);
		} else if (block.type === 'synced_block') {
			block.children = await _getSyncedBlockChildren(block);
		} else if (block.type === 'toggle') {
			block.children = await getAllBlocksByBlockId(block.id);
		} else if (block.type === 'paragraph' && block.hasChildren) {
			block.children = await getAllBlocksByBlockId(block.id);
		} else if (block.type === 'heading_1' && block.hasChildren) {
			block.children = await getAllBlocksByBlockId(block.id);
		} else if (block.type === 'heading_2' && block.hasChildren) {
			block.children = await getAllBlocksByBlockId(block.id);
		} else if (block.type === 'heading_3' && block.hasChildren) {
			block.children = await getAllBlocksByBlockId(block.id);
		} else if (block.type === 'quote' && block.hasChildren) {
			block.children = await getAllBlocksByBlockId(block.id);
		} else if (block.type === 'callout' && block.hasChildren) {
			block.children = await getAllBlocksByBlockId(block.id);
		}
	}

	return allBlocks;
}

export async function getBlock(blockId: string): Promise<Block> {
	const params: requestParams.RetrieveBlock = {
		block_id: blockId
	};

	const res = await retry(
		async (bail) => {
			try {
				return (await client.blocks.retrieve(
					params as any // eslint-disable-line @typescript-eslint/no-explicit-any
				)) as responses.RetrieveBlockResponse;
			} catch (error: unknown) {
				if (error instanceof APIResponseError) {
					if (error.status && error.status >= 400 && error.status < 500) {
						bail(error);
					}
				}
				throw error;
			}
		},
		{
			retries: NUMBER_OF_RETRY
		}
	);

	return _buildBlock(res);
}

export function getFileExtension(url: string): string | null {
	const match = url.match(/\.([a-zA-Z0-9]+)(?:[?#]|$)/);
	return match ? `.${match[1]}` : null;
}

export async function downloadFile(
	outputDir: string,
	url: string,
	filename: string,
	fileExtension: string | null
) {
	try {
		const response = await axios({
			method: 'GET',
			url,
			responseType: 'stream'
		});

		const writer = fs.createWriteStream(`src/assets/${outputDir}/${filename}${fileExtension}`);
		await pipeline(response.data, writer);
	} catch (error) {
		console.error('Download failed:', error);
	}
}

function _buildBlock(blockObject: responses.BlockObject): Block {
	const baseBlock = {
		id: blockObject.id,
		hasChildren: blockObject.has_children
	};
	let block: Block;

	switch (blockObject.type) {
		case 'paragraph':
			if (blockObject.paragraph) {
				block = {
					...baseBlock,
					type: 'paragraph',
					richTexts: blockObject.paragraph.rich_text.map(_buildRichText),
					color: blockObject.paragraph.color
				};
			}

			break;
		case 'heading_1':
			if (blockObject.heading_1) {
				block = {
					...baseBlock,
					type: 'heading_1',
					richTexts: blockObject.heading_1.rich_text.map(_buildRichText),
					color: blockObject.heading_1.color,
					isToggleable: blockObject.heading_1.is_toggleable
				};
			}

			break;
		case 'heading_2':
			if (blockObject.heading_2) {
				block = {
					...baseBlock,
					type: 'heading_2',
					richTexts: blockObject.heading_2.rich_text.map(_buildRichText),
					color: blockObject.heading_2.color,
					isToggleable: blockObject.heading_2.is_toggleable
				};
			}

			break;
		case 'heading_3':
			if (blockObject.heading_3) {
				block = {
					...baseBlock,
					type: 'heading_3',
					richTexts: blockObject.heading_3.rich_text.map(_buildRichText),
					color: blockObject.heading_3.color,
					isToggleable: blockObject.heading_3.is_toggleable
				};
			}

			break;
		case 'bulleted_list_item':
			if (blockObject.bulleted_list_item) {
				block = {
					...baseBlock,
					type: 'bulleted_list_item',
					richTexts: blockObject.bulleted_list_item.rich_text.map(_buildRichText),
					color: blockObject.bulleted_list_item.color
				};
			}

			break;
		case 'numbered_list_item':
			if (blockObject.numbered_list_item) {
				block = {
					...baseBlock,
					type: 'numbered_list_item',
					richTexts: blockObject.numbered_list_item.rich_text.map(_buildRichText),
					color: blockObject.numbered_list_item.color
				};
			}

			break;
		case 'to_do':
			if (blockObject.to_do) {
				block = {
					...baseBlock,
					type: 'to_do',
					richTexts: blockObject.to_do.rich_text.map(_buildRichText),
					checked: blockObject.to_do.checked,
					color: blockObject.to_do.color
				};
			}

			break;
		case 'video':
			if (blockObject.video) {
				const baseVideo = {
					...baseBlock,
					type: 'video' as const,
					caption: blockObject.video.caption?.map(_buildRichText) || []
				};

				if (blockObject.video.type === 'external' && blockObject.video.external) {
					block = {
						...baseVideo,
						mediaType: 'external',
						external: { url: blockObject.video.external.url }
					};
				} else if (blockObject.video.type === 'file' && blockObject.video.file) {
					block = {
						...baseVideo,
						mediaType: 'file',
						file: {
							type: blockObject.video.type,
							url: blockObject.video.file.url,
							expiryTime: blockObject.video.file.expiry_time
						}
					};
				}
			}

			break;
		case 'image':
			if (blockObject.image) {
				const baseImage = {
					...baseBlock,
					type: 'image' as const,
					caption: blockObject.image.caption?.map(_buildRichText) || []
				};
				if (blockObject.image.type === 'external' && blockObject.image.external) {
					block = {
						...baseImage,
						mediaType: 'external',
						external: { url: blockObject.image.external.url }
					};
				} else if (blockObject.image.type === 'file' && blockObject.image.file) {
					block = {
						...baseImage,
						mediaType: 'file',
						file: {
							type: blockObject.image.type,
							url: blockObject.image.file.url,
							expiryTime: blockObject.image.file.expiry_time
						}
					};
				}
			}

			break;
		case 'file':
			if (blockObject.file) {
				const baseFile = {
					...baseBlock,
					type: 'file' as const,
					caption: blockObject.file.caption?.map(_buildRichText) || []
				};

				if (blockObject.file.type === 'external' && blockObject.file.external) {
					block = {
						...baseFile,
						mediaType: 'external',
						external: { url: blockObject.file.external.url }
					};
				} else if (blockObject.file.type === 'file' && blockObject.file.file) {
					block = {
						...baseFile,
						mediaType: 'file',
						file: {
							type: blockObject.file.type,
							url: blockObject.file.file.url,
							expiryTime: blockObject.file.file.expiry_time
						}
					};
				}
			}

			break;
		case 'code':
			if (blockObject.code) {
				block = {
					...baseBlock,
					type: 'code',
					caption: blockObject.code.caption?.map(_buildRichText) || [],
					richTexts: blockObject.code.rich_text.map(_buildRichText),
					language: blockObject.code.language
				};
			}

			break;
		case 'quote':
			if (blockObject.quote) {
				block = {
					...baseBlock,
					type: 'quote',
					richTexts: blockObject.quote.rich_text.map(_buildRichText),
					color: blockObject.quote.color
				};
			}

			break;
		case 'equation':
			if (blockObject.equation) {
				block = {
					...baseBlock,
					type: 'equation',
					expression: blockObject.equation.expression
				};
			}

			break;
		case 'callout':
			if (blockObject.callout) {
				const baseCallout = {
					...baseBlock,
					type: 'callout' as const,
					richTexts: blockObject.callout.rich_text.map(_buildRichText),
					color: blockObject.callout.color,
					icon: null
				};

				if (blockObject.callout.icon) {
					if (blockObject.callout.icon.type === 'emoji' && 'emoji' in blockObject.callout.icon) {
						const icon: Emoji = {
							type: blockObject.callout.icon.type,
							emoji: blockObject.callout.icon.emoji
						};

						block = {
							...baseCallout,
							icon: icon
						};
					} else if (
						blockObject.callout.icon.type === 'external' &&
						'external' in blockObject.callout.icon
					) {
						const icon: FileObject = {
							type: blockObject.callout.icon.type,
							url: blockObject.callout.icon.external?.url || ''
						};

						block = {
							...baseCallout,
							icon: icon
						};
					}
				}
			}

			break;
		case 'synced_block':
			if (blockObject.synced_block) {
				block = {
					...baseBlock,
					type: 'synced_block',
					syncedFrom: null
				};

				if (blockObject.synced_block.synced_from && blockObject.synced_block.synced_from.block_id) {
					const syncedFrom: SyncedFrom = {
						blockId: blockObject.synced_block.synced_from.block_id
					};

					block = {
						...block,
						syncedFrom
					};
				}
			}

			break;
		case 'toggle':
			if (blockObject.toggle) {
				block = {
					...baseBlock,
					type: 'toggle',
					richTexts: blockObject.toggle.rich_text.map(_buildRichText),
					color: blockObject.toggle.color,
					children: []
				};
			}

			break;
		case 'embed':
			if (blockObject.embed) {
				block = {
					...baseBlock,
					type: 'embed',
					url: blockObject.embed.url
				};
			}

			break;
		case 'bookmark':
			if (blockObject.bookmark) {
				block = {
					...baseBlock,
					type: 'bookmark',
					url: blockObject.bookmark.url
				};
			}

			break;
		case 'link_preview':
			if (blockObject.link_preview) {
				block = {
					...baseBlock,
					type: 'link_preview',
					url: blockObject.link_preview.url
				};
			}

			break;
		case 'table':
			if (blockObject.table) {
				block = {
					...baseBlock,
					type: 'table',
					tableWidth: blockObject.table.table_width,
					hasColumnHeader: blockObject.table.has_column_header,
					hasRowHeader: blockObject.table.has_row_header,
					rows: []
				};
			}

			break;
		case 'column_list':
			block = {
				...baseBlock,
				type: 'column_list',
				columns: []
			};

			break;
		case 'table_of_contents':
			if (blockObject.table_of_contents) {
				block = {
					...baseBlock,
					type: 'table_of_contents',
					color: blockObject.table_of_contents.color
				};
			}

			break;
		case 'link_to_page':
			if (blockObject.link_to_page && blockObject.link_to_page.page_id) {
				block = {
					...baseBlock,
					type: 'link_to_page',
					linkType: blockObject.link_to_page.type,
					pageId: blockObject.link_to_page.page_id
				};
			}

			break;
		case 'divider':
			block = {
				...baseBlock,
				type: 'divider'
			};

			break;
	}

	return block!;
}

async function _getTableRows(blockId: string): Promise<TableRow[]> {
	let results: responses.BlockObject[] = [];

	const params: requestParams.RetrieveBlockChildren = {
		block_id: blockId
	};

	while (true) {
		const res = await retry(
			async (bail) => {
				try {
					return (await client.blocks.children.list(
						params as any // eslint-disable-line @typescript-eslint/no-explicit-any
					)) as responses.RetrieveBlockChildrenResponse;
				} catch (error: unknown) {
					if (error instanceof APIResponseError) {
						if (error.status && error.status >= 400 && error.status < 500) {
							bail(error);
						}
					}
					throw error;
				}
			},
			{
				retries: NUMBER_OF_RETRY
			}
		);

		results = results.concat(res.results);

		if (!res.has_more) {
			break;
		}

		params['start_cursor'] = res.next_cursor as string;
	}

	return results.map((blockObject) => {
		const tableRow: TableRow = {
			id: blockObject.id,
			type: blockObject.type,
			hasChildren: blockObject.has_children,
			cells: []
		};

		if (blockObject.type === 'table_row' && blockObject.table_row) {
			const cells: TableCell[] = blockObject.table_row.cells.map((cell) => {
				const tableCell: TableCell = {
					richTexts: cell.map(_buildRichText)
				};

				return tableCell;
			});
			tableRow.cells = cells;
		}

		return tableRow;
	});
}

async function _getColumns(blockId: string): Promise<Column[]> {
	let results: responses.BlockObject[] = [];

	const params: requestParams.RetrieveBlockChildren = {
		block_id: blockId
	};

	while (true) {
		const res = await retry(
			async (bail) => {
				try {
					return (await client.blocks.children.list(
						params as any // eslint-disable-line @typescript-eslint/no-explicit-any
					)) as responses.RetrieveBlockChildrenResponse;
				} catch (error: unknown) {
					if (error instanceof APIResponseError) {
						if (error.status && error.status >= 400 && error.status < 500) {
							bail(error);
						}
					}
					throw error;
				}
			},
			{
				retries: NUMBER_OF_RETRY
			}
		);

		results = results.concat(res.results);

		if (!res.has_more) {
			break;
		}

		params['start_cursor'] = res.next_cursor as string;
	}

	return await Promise.all(
		results.map(async (blockObject) => {
			const children = await getAllBlocksByBlockId(blockObject.id);

			const column: Column = {
				id: blockObject.id,
				type: blockObject.type,
				hasChildren: blockObject.has_children,
				children: children
			};

			return column;
		})
	);
}

async function _getSyncedBlockChildren(block: SyncedBlock): Promise<Block[]> {
	let originalBlock: Block = block;
	if (block.syncedFrom && block.syncedFrom.blockId) {
		try {
			originalBlock = await getBlock(block.syncedFrom.blockId);
		} catch (err) {
			console.log(`Could not retrieve the original synced_block. error: ${err}`);
			return [];
		}
	}

	const children = await getAllBlocksByBlockId(originalBlock.id);
	return children;
}

function _buildPost(pageObject: responses.PageObject, database: DatabaseColumn[]): any | null {
	const prop = pageObject.properties;

	let icon: FileObject | Emoji | null = null;
	if (pageObject.icon) {
		if (pageObject.icon.type === 'emoji' && 'emoji' in pageObject.icon) {
			icon = {
				type: pageObject.icon.type,
				emoji: pageObject.icon.emoji
			};
		} else if (pageObject.icon.type === 'external' && 'external' in pageObject.icon) {
			icon = {
				type: pageObject.icon.type,
				url: pageObject.icon.external?.url || ''
			};
		}
	}

	let cover: FileObject | null = null;
	if (pageObject.cover) {
		if (pageObject.cover.type === 'external' && pageObject.cover.external) {
			cover = {
				type: 'external',
				url: pageObject.cover.external.url
			};
		} else if (pageObject.cover.type === 'file' && pageObject.cover.file) {
			cover = {
				type: 'file',
				url: pageObject.cover.file.url
			};
		}
	}

	var result: any = {
		pageId: pageObject.id,
		icon,
		cover
	};

	for (let col of database) {
		const { type, columnName, isRequired } = col;
		switch (type) {
			case 'number':
				if (isRequired && !prop[columnName].number) return null;
				result[columnName] = prop[columnName].number ?? 0;

				break;
			case 'select':
				if (isRequired && !prop[columnName].select?.name) return null;
				result[columnName] = prop[columnName].select?.name ?? '';

				break;
			case 'multi_select':
				if (isRequired && !prop[columnName].multi_select) return null;
				result[columnName] = prop[columnName].multi_select ?? [];

				break;
			case 'date':
				if (isRequired && !prop[columnName].date?.start) return null;
				result[columnName] = prop[columnName].date?.start ?? '';

				break;
			case 'url':
				if (isRequired && !prop[columnName].url) return null;
				result[columnName] = prop[columnName].url ?? '';

				break;
			case 'title':
				if (isRequired && !prop[columnName].title) return null;
				result[columnName] =
					prop[columnName].title.map((richText) => richText.plain_text).join('') ?? '';

				break;
			case 'rich_text':
				if (isRequired && !prop[columnName].rich_text) return null;
				result[columnName] =
					prop[columnName].rich_text?.map((richText) => richText.plain_text).join('') ?? '';

				break;
		}
	}

	return result;
}

function _buildRichText(richTextObject: responses.RichTextObject): RichText {
	const annotation: Annotation = {
		bold: richTextObject.annotations.bold,
		italic: richTextObject.annotations.italic,
		strikethrough: richTextObject.annotations.strikethrough,
		underline: richTextObject.annotations.underline,
		code: richTextObject.annotations.code,
		color: richTextObject.annotations.color
	};

	const richText: RichText = {
		annotation: annotation,
		plainText: richTextObject.plain_text,
		href: richTextObject.href
	};

	if (richTextObject.type === 'text' && richTextObject.text) {
		const text: Text = {
			content: richTextObject.text.content
		};

		if (richTextObject.text.link) {
			text.link = {
				url: richTextObject.text.link.url
			};
		}

		richText.text = text;
	} else if (richTextObject.type === 'equation' && richTextObject.equation) {
		const equation: Equation = {
			id: '',
			hasChildren: false,
			type: 'equation',
			expression: richTextObject.equation.expression
		};
		richText.equation = equation;
	} else if (richTextObject.type === 'mention' && richTextObject.mention) {
		const mention: Mention = {
			type: richTextObject.mention.type
		};

		if (richTextObject.mention.type === 'page' && richTextObject.mention.page) {
			const reference: Reference = {
				id: richTextObject.mention.page.id
			};
			mention.page = reference;
		}

		richText.mention = mention;
	}

	return richText;
}
