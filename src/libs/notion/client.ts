import fs from 'node:fs';
import { pipeline } from 'node:stream/promises';
import axios from 'axios';
import retry from 'async-retry';
import { config } from 'dotenv';
import type * as responses from '~/interfaces/notion/responses.interface';
import type * as requestParams from '~/interfaces/notion/request-params.interface';
import type {
	Block,
	Paragraph,
	Heading1,
	Heading2,
	Heading3,
	BulletedListItem,
	NumberedListItem,
	ToDo,
	Image,
	Code,
	Quote,
	Equation,
	Callout,
	Embed,
	Video,
	File,
	Bookmark,
	LinkPreview,
	SyncedBlock,
	SyncedFrom,
	Table,
	TableRow,
	TableCell,
	Toggle,
	ColumnList,
	Column,
	TableOfContents,
	RichText,
	Text,
	Annotation,
	Emoji,
	FileObject,
	LinkToPage,
	Mention,
	Reference
} from '~/interfaces/notion/block.interface';
import { Client, APIResponseError } from '@notionhq/client';
import type { DatabaseColumn } from '~/interfaces/notion/database-column.interface';

config();
const NOTION_KEY = process.env.NOTION_KEY || '';
const DATABASE_ID = process.env.DATABASE_ID || '';
const NUMBER_OF_RETRY = 2;

if (!NOTION_KEY || !DATABASE_ID) throw new Error('Missing Notion .env data');

const client = new Client({
	auth: NOTION_KEY
});

var posts = await getAllPosts();
for (let post of posts) {
	let metadata = '---\n';
	let header = '';
	var body = '';
	var blocks = await getAllBlocksByBlockId(post.pageId);

	metadata += 'layout: "~/layouts/project-layout.astro"\n';
	// Loop through each property and add "key: value\n"
	for (const [key, value] of Object.entries(post)) {
		if (key == 'cover') continue;

		if (!value) {
			metadata += `${key}: null\n`;
			continue;
		}

		var stringValue = value instanceof Object ? JSON.stringify(value) : `"${value}"`;
		metadata += `${key}: ${stringValue}\n`;
	}

	blocks.map((block: Block) => {
		switch (block.type) {
			case 'paragraph':
				body += block.paragraph?.richTexts.map((richText) => richText.plainText).join('');
				body += '\n';

				break;
			case 'image':
				if (block.image?.file?.url) {
					var url = block.image.file.url;
					const fileExtension = getFileExtension(url);
					downloadFile(url, block.id, fileExtension);

					var component = "import Image from '~/components/image.astro'";
					if (!header.includes(component)) {
						header += "import Image from '~/components/image.astro';\n";
					}

					body += `<Image src="/src/assets/projects/${block.id}${fileExtension}" />\n`;

					if (!metadata.includes('cover')) {
						metadata += `cover: "/src/assets/projects/${block.id}${fileExtension}"\n`;
					}
				}

				break;
			case 'video':
				if (block.video?.file?.url) {
					var url = block.video.file.url;
					const fileExtension = getFileExtension(url);
					downloadFile(url, block.id, fileExtension);
					body += `<iframe width="100%" height="480" src="/src/assets/projects/${block.id}${fileExtension}" title="Preview" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen />\n`;
				}

				break;

			default:
				break;
		}
	});

	metadata += '---\n';
	header += '\n';
	body += '\n';

	var data = metadata + header + body;
	fs.writeFileSync(`src/pages/projects/${post.slug}.mdx`, data);
}

export async function getAllPosts(): Promise<any[]> {
	const params: requestParams.QueryDatabase = {
		database_id: DATABASE_ID,
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

	var post = results.map((pageObject) => _buildPost(pageObject)).filter((post) => post);

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

		if (block.type === 'table' && block.table) {
			block.table.rows = await _getTableRows(block.id);
		} else if (block.type === 'column_list' && block.columnList) {
			block.columnList.columns = await _getColumns(block.id);
		} else if (block.type === 'bulleted_list_item' && block.bulletedListItem && block.hasChildren) {
			block.bulletedListItem.children = await getAllBlocksByBlockId(block.id);
		} else if (block.type === 'numbered_list_item' && block.numberedListItem && block.hasChildren) {
			block.numberedListItem.children = await getAllBlocksByBlockId(block.id);
		} else if (block.type === 'to_do' && block.toDo && block.hasChildren) {
			block.toDo.children = await getAllBlocksByBlockId(block.id);
		} else if (block.type === 'synced_block' && block.syncedBlock) {
			block.syncedBlock.children = await _getSyncedBlockChildren(block);
		} else if (block.type === 'toggle' && block.toggle) {
			block.toggle.children = await getAllBlocksByBlockId(block.id);
		} else if (block.type === 'paragraph' && block.paragraph && block.hasChildren) {
			block.paragraph.children = await getAllBlocksByBlockId(block.id);
		} else if (block.type === 'heading_1' && block.heading1 && block.hasChildren) {
			block.heading1.children = await getAllBlocksByBlockId(block.id);
		} else if (block.type === 'heading_2' && block.heading2 && block.hasChildren) {
			block.heading2.children = await getAllBlocksByBlockId(block.id);
		} else if (block.type === 'heading_3' && block.heading3 && block.hasChildren) {
			block.heading3.children = await getAllBlocksByBlockId(block.id);
		} else if (block.type === 'quote' && block.quote && block.hasChildren) {
			block.quote.children = await getAllBlocksByBlockId(block.id);
		} else if (block.type === 'callout' && block.callout && block.hasChildren) {
			block.callout.children = await getAllBlocksByBlockId(block.id);
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

function getFileExtension(url: string): string | null {
	const match = url.match(/\.([a-zA-Z0-9]+)(?:[?#]|$)/);
	return match ? `.${match[1]}` : null;
}

async function downloadFile(url: string, filename: string, fileExtension: string | null) {
	try {
		const response = await axios({
			method: 'GET',
			url,
			responseType: 'stream'
		});

		const writer = fs.createWriteStream(`src/assets/projects/${filename}${fileExtension}`);
		await pipeline(response.data, writer);
	} catch (error) {
		console.error('Download failed:', error);
	}
}

function _buildBlock(blockObject: responses.BlockObject): Block {
	const block: Block = {
		id: blockObject.id,
		type: blockObject.type,
		hasChildren: blockObject.has_children
	};

	switch (blockObject.type) {
		case 'paragraph':
			if (blockObject.paragraph) {
				const paragraph: Paragraph = {
					richTexts: blockObject.paragraph.rich_text.map(_buildRichText),
					color: blockObject.paragraph.color
				};
				block.paragraph = paragraph;
			}
			break;
		case 'heading_1':
			if (blockObject.heading_1) {
				const heading1: Heading1 = {
					richTexts: blockObject.heading_1.rich_text.map(_buildRichText),
					color: blockObject.heading_1.color,
					isToggleable: blockObject.heading_1.is_toggleable
				};
				block.heading1 = heading1;
			}
			break;
		case 'heading_2':
			if (blockObject.heading_2) {
				const heading2: Heading2 = {
					richTexts: blockObject.heading_2.rich_text.map(_buildRichText),
					color: blockObject.heading_2.color,
					isToggleable: blockObject.heading_2.is_toggleable
				};
				block.heading2 = heading2;
			}
			break;
		case 'heading_3':
			if (blockObject.heading_3) {
				const heading3: Heading3 = {
					richTexts: blockObject.heading_3.rich_text.map(_buildRichText),
					color: blockObject.heading_3.color,
					isToggleable: blockObject.heading_3.is_toggleable
				};
				block.heading3 = heading3;
			}
			break;
		case 'bulleted_list_item':
			if (blockObject.bulleted_list_item) {
				const bulletedListItem: BulletedListItem = {
					richTexts: blockObject.bulleted_list_item.rich_text.map(_buildRichText),
					color: blockObject.bulleted_list_item.color
				};
				block.bulletedListItem = bulletedListItem;
			}
			break;
		case 'numbered_list_item':
			if (blockObject.numbered_list_item) {
				const numberedListItem: NumberedListItem = {
					richTexts: blockObject.numbered_list_item.rich_text.map(_buildRichText),
					color: blockObject.numbered_list_item.color
				};
				block.numberedListItem = numberedListItem;
			}
			break;
		case 'to_do':
			if (blockObject.to_do) {
				const toDo: ToDo = {
					richTexts: blockObject.to_do.rich_text.map(_buildRichText),
					checked: blockObject.to_do.checked,
					color: blockObject.to_do.color
				};
				block.toDo = toDo;
			}
			break;
		case 'video':
			if (blockObject.video) {
				const video: Video = {
					caption: blockObject.video.caption?.map(_buildRichText) || [],
					type: blockObject.video.type
				};
				if (blockObject.video.type === 'external' && blockObject.video.external) {
					video.external = { url: blockObject.video.external.url };
				} else if (blockObject.video.type === 'file' && blockObject.video.file) {
					video.file = {
						type: blockObject.video.type,
						url: blockObject.video.file.url,
						expiryTime: blockObject.video.file.expiry_time
					};
				}
				block.video = video;
			}
			break;
		case 'image':
			if (blockObject.image) {
				const image: Image = {
					caption: blockObject.image.caption?.map(_buildRichText) || [],
					type: blockObject.image.type
				};
				if (blockObject.image.type === 'external' && blockObject.image.external) {
					image.external = { url: blockObject.image.external.url };
				} else if (blockObject.image.type === 'file' && blockObject.image.file) {
					image.file = {
						type: blockObject.image.type,
						url: blockObject.image.file.url,
						expiryTime: blockObject.image.file.expiry_time
					};
				}
				block.image = image;
			}
			break;
		case 'file':
			if (blockObject.file) {
				const file: File = {
					caption: blockObject.file.caption?.map(_buildRichText) || [],
					type: blockObject.file.type
				};
				if (blockObject.file.type === 'external' && blockObject.file.external) {
					file.external = { url: blockObject.file.external.url };
				} else if (blockObject.file.type === 'file' && blockObject.file.file) {
					file.file = {
						type: blockObject.file.type,
						url: blockObject.file.file.url,
						expiryTime: blockObject.file.file.expiry_time
					};
				}
				block.file = file;
			}
			break;
		case 'code':
			if (blockObject.code) {
				const code: Code = {
					caption: blockObject.code.caption?.map(_buildRichText) || [],
					richTexts: blockObject.code.rich_text.map(_buildRichText),
					language: blockObject.code.language
				};
				block.code = code;
			}
			break;
		case 'quote':
			if (blockObject.quote) {
				const quote: Quote = {
					richTexts: blockObject.quote.rich_text.map(_buildRichText),
					color: blockObject.quote.color
				};
				block.quote = quote;
			}
			break;
		case 'equation':
			if (blockObject.equation) {
				const equation: Equation = {
					expression: blockObject.equation.expression
				};
				block.equation = equation;
			}
			break;
		case 'callout':
			if (blockObject.callout) {
				let icon: FileObject | Emoji | null = null;
				if (blockObject.callout.icon) {
					if (blockObject.callout.icon.type === 'emoji' && 'emoji' in blockObject.callout.icon) {
						icon = {
							type: blockObject.callout.icon.type,
							emoji: blockObject.callout.icon.emoji
						};
					} else if (
						blockObject.callout.icon.type === 'external' &&
						'external' in blockObject.callout.icon
					) {
						icon = {
							type: blockObject.callout.icon.type,
							url: blockObject.callout.icon.external?.url || ''
						};
					}
				}

				const callout: Callout = {
					richTexts: blockObject.callout.rich_text.map(_buildRichText),
					icon: icon,
					color: blockObject.callout.color
				};
				block.callout = callout;
			}
			break;
		case 'synced_block':
			if (blockObject.synced_block) {
				let syncedFrom: SyncedFrom | null = null;
				if (blockObject.synced_block.synced_from && blockObject.synced_block.synced_from.block_id) {
					syncedFrom = {
						blockId: blockObject.synced_block.synced_from.block_id
					};
				}

				const syncedBlock: SyncedBlock = {
					syncedFrom: syncedFrom
				};
				block.syncedBlock = syncedBlock;
			}
			break;
		case 'toggle':
			if (blockObject.toggle) {
				const toggle: Toggle = {
					richTexts: blockObject.toggle.rich_text.map(_buildRichText),
					color: blockObject.toggle.color,
					children: []
				};
				block.toggle = toggle;
			}
			break;
		case 'embed':
			if (blockObject.embed) {
				const embed: Embed = {
					url: blockObject.embed.url
				};
				block.embed = embed;
			}
			break;
		case 'bookmark':
			if (blockObject.bookmark) {
				const bookmark: Bookmark = {
					url: blockObject.bookmark.url
				};
				block.bookmark = bookmark;
			}
			break;
		case 'link_preview':
			if (blockObject.link_preview) {
				const linkPreview: LinkPreview = {
					url: blockObject.link_preview.url
				};
				block.linkPreview = linkPreview;
			}
			break;
		case 'table':
			if (blockObject.table) {
				const table: Table = {
					tableWidth: blockObject.table.table_width,
					hasColumnHeader: blockObject.table.has_column_header,
					hasRowHeader: blockObject.table.has_row_header,
					rows: []
				};
				block.table = table;
			}
			break;
		case 'column_list':
			const columnList: ColumnList = {
				columns: []
			};
			block.columnList = columnList;
			break;
		case 'table_of_contents':
			if (blockObject.table_of_contents) {
				const tableOfContents: TableOfContents = {
					color: blockObject.table_of_contents.color
				};
				block.tableOfContents = tableOfContents;
			}
			break;
		case 'link_to_page':
			if (blockObject.link_to_page && blockObject.link_to_page.page_id) {
				const linkToPage: LinkToPage = {
					type: blockObject.link_to_page.type,
					pageId: blockObject.link_to_page.page_id
				};
				block.linkToPage = linkToPage;
			}
			break;
	}

	return block;
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

async function _getSyncedBlockChildren(block: Block): Promise<Block[]> {
	let originalBlock: Block = block;
	if (block.syncedBlock && block.syncedBlock.syncedFrom && block.syncedBlock.syncedFrom.blockId) {
		try {
			originalBlock = await getBlock(block.syncedBlock.syncedFrom.blockId);
		} catch (err) {
			console.log(`Could not retrieve the original synced_block. error: ${err}`);
			return [];
		}
	}

	const children = await getAllBlocksByBlockId(originalBlock.id);
	return children;
}

function _buildPost(pageObject: responses.PageObject): any | null {
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
		cover = {
			type: pageObject.cover.type,
			url: pageObject.cover.file?.url || ''
		};
	}

	const projectDatabase: DatabaseColumn[] = [
		{
			type: 'title',
			columnName: 'content',
			isRequired: true
		},
		{
			type: 'rich_text',
			columnName: 'slug',
			isRequired: true
		},
		{
			type: 'date',
			columnName: 'date',
			isRequired: true
		},
		{
			type: 'url',
			columnName: 'repository',
			isRequired: false
		},
		{
			type: 'url',
			columnName: 'site',
			isRequired: false
		},
		{
			type: 'multi_select',
			columnName: 'tools',
			isRequired: false
		},
		{
			type: 'select',
			columnName: 'category',
			isRequired: false
		},
		{
			type: 'rich_text',
			columnName: 'description',
			isRequired: false
		}
	];

	var result: any = {
		pageId: pageObject.id,
		icon,
		cover
	};

	for (let col of projectDatabase) {
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
