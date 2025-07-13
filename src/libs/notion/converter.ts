import fs from 'node:fs';
import { NOTION_KEY } from '~/constants/global';
import { getAllBlocksByBlockId, getAllPosts, getFileExtension } from './utils';
import type { Block } from '~/interfaces/notion/block.interface';
import args from 'args';
import path from 'path';
import type { DatabaseColumn } from '~/interfaces/notion/database-column.interface';

if (!NOTION_KEY) throw new Error('Missing Notion .env data');

// Configure arguments
args
	.option(['d', 'database'], 'Database configuration file')
	.option(['o', 'output'], 'Directory for generated output files')
	.example(
		'--database src/libs/notion/databases/project.database.ts',
		'Run with custom config file'
	)
	.example(
		'--output projects',
		'Generate mdx in src/pages/projects and download file to src/assets/projects directory'
	);

// Parse the arguments
const flags = args.parse(process.argv);

let database: DatabaseColumn[] = [];
let databaseId = '';
let outputDir = '';

try {
	const configPath = path.resolve(process.cwd(), flags.database);

	// Dynamic import
	const config = await import(configPath);

	database = config.DATABASE;
	databaseId = config.DATABASE_ID;
	outputDir = flags.output;

	console.log('Application running with config:', config);
} catch (error) {
	console.error('Failed to load config:', error);
	process.exit(1);
}

if (!databaseId || !database.length) throw new Error('Missing database or database id');

var posts = await getAllPosts(databaseId, database);
let header: string[] = [];
for (let post of posts) {
	let metadata = ['---'];
	var blocks = await getAllBlocksByBlockId(post.pageId);

	metadata.push('layout: "~/layouts/project-layout.astro"\n');
	// Loop through each property and add "key: value\n"
	for (const [key, value] of Object.entries(post)) {
		if (key == 'cover') continue;

		if (!value) {
			metadata.push(`${key}: null\n`);
			continue;
		}

		var stringValue = value instanceof Object ? JSON.stringify(value) : `"${value}"`;
		metadata.push(`${key}: ${stringValue}\n`);
	}
	
	blocks.map((block: Block) => metadata.push(`${block.id}: ${JSON.stringify(block)}`));

	metadata.push('---\n');

	var data = metadata.join('\n') + header.join('\n');
	fs.writeFileSync(`src/pages/${outputDir}/${post.slug}.mdx`, data);
}
