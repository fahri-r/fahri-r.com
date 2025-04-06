import { Client } from '@notionhq/client';
import { NotionConverter } from 'notion-to-md';
import { config } from 'dotenv';
import { parseArgs } from 'node:util';
import { MDXRenderer } from 'notion-to-md/plugins/renderer';
import type { ChainData, NotionExporter } from 'notion-to-md/types';
import * as fs from 'fs/promises';
import * as path from 'path';
import { sanitizeUrl } from './libs/sanitize';

class FileSystemExporter implements NotionExporter {
	constructor(private outputDir: string) {}

	async export(data: ChainData): Promise<void> {
		// Create output directory if it doesn't exist
		await fs.mkdir(this.outputDir, { recursive: true });

		// Generate filename from slug or title
		const title = data.blockTree.properties.content.title?.[0]?.plain_text;
		const slug = data.blockTree.properties.slug?.rich_text[0]?.plain_text || sanitizeUrl(title);
		const filename = `${slug}.mdx`;

		// Full path for the file
		const filepath = path.join(this.outputDir, filename);

		// Write content to file
		await fs.writeFile(filepath, data.content, 'utf-8');

		console.log(`✓ Exported page to ${filepath}`);
	}
}

// Input Arguments
const ARGUMENT_OPTIONS = {
	published: {
		// Only sync published posts
		type: 'boolean',
		short: 'p'
	}
};
const {
	values: { published }
} = parseArgs({ options: ARGUMENT_OPTIONS });
const isPublished = !!published;
console.log(`Syncing Published Only: ${isPublished}`);

// Load ENV Variables
config();
if (!process.env.NOTION_KEY || !process.env.DATABASE_ID)
	throw new Error('Missing Notion .env data');
const NOTION_KEY = process.env.NOTION_KEY;
const DATABASE_ID = process.env.DATABASE_ID; // TODO: Import from ENV

const POSTS_PATH = `src/pages/posts`;
const ASSETS_PATH = 'src/assets';

const notion = new Client({
	auth: NOTION_KEY
});

// Fetch Notion Posts from Database via Notion API
const queryParams: any = {
	database_id: DATABASE_ID
};

if (isPublished) {
	queryParams['filter'] = {
		and: [
			{
				property: 'status',
				select: {
					equals: 'Published'
				}
			}
		]
	};
}

// Get Page Ids from database
const databaseResponse = await notion.databases.query(queryParams);
const { results } = databaseResponse;
const pageIds = results.map((page) => page.id);

// Notion Custom Block Transform START
const n2m = new NotionConverter(notion)
	.withExporter(new FileSystemExporter(POSTS_PATH))
	.downloadMediaTo({
		outputDir: ASSETS_PATH,
		transformPath: (localPath) => path.basename(localPath)
	})
	.withRenderer(
		new MDXRenderer()
			.createBlockTransformers({
				image: {
					transform: async ({ block }) => {
						return `<Image src="/${ASSETS_PATH}/${block.image.file.url}" />`;
					}
				},
				video: {
					transform: async ({ block }) => {
						const { file, external } = block.video;

						let url = file?.url ? `/${ASSETS_PATH}/${file.url}` : external?.url;
						if (url?.includes('youtube.com')) {
							if (url.includes('/watch')) {
								// Youtube URLs with the /watch format don't work, need to be replaced with /embed
								const videoId = url.split('&')[0].split('?v=')[1];
								url = `https://www.youtube.com/embed/${videoId}`;
							}
						}

						return `<iframe width="100%" height="480" src="${url}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
					}
				}
			})
			.addImports("import Image from '~/components/image.astro';")
			.addVariable('frontmatter', async (name, context) => {
				const {
					repository, 
					site, 
					tools, 
					slug, 
					description, 
					status, 
					date, 
					category, 
					content
				} = context.pageProperties;
				
				const title = content.title[0].plain_text;
				const cover = context.blockTree.find(x => x.type == 'image')?.image?.file.url;

				return `---
layout: ~/layouts/PostLayout.astro
id: ${context.pageId}
repository: ${repository?.url}
site: ${site?.url}
category: ${category?.select?.name}
slug: ${slug?.rich_text[0]?.plain_text || sanitizeUrl(title)}
cover: /${ASSETS_PATH}/${cover}
tools: ${JSON.stringify(tools.multi_select)}
status: ${status?.select?.name}
description: ${description?.rich_text[0]?.plain_text ?? null}
title: ${title}
date: ${date?.date?.start}
---
`;
			})
	);

for (let pageId of pageIds) {
	await n2m.convert(pageId);
}

console.info('Successfully synced posts with Notion');
