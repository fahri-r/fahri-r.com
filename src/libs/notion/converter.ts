import { NOTION_KEY } from '~/constants/global';
import { downloadFile, getAllBlocksByBlockId, getAllPosts } from './utils';
import type { DatabaseColumn } from '~/interfaces/notion/database-column.interface';
import fs from 'node:fs';
import args from 'args';
import path from 'path';

async function main() {
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

	const posts = await getAllPosts(databaseId, database);
	const header: string[] = [];

	for (const post of posts) {
		let metadata = ['---'];
		const blocks = await getAllBlocksByBlockId(post.pageId);

		metadata.push(`layout: "~/layouts/${outputDir}/layout.astro"\n`);

		// Loop through each property and add "key: value\n"
		for (const [key, value] of Object.entries(post)) {
			// if (key === 'cover' && value instanceof Object && 'url' in value) {
			// 	console.log(value!.url)
			// 	var url = await downloadFile(outputDir, `cover-${post.slug}`, value!.url as string)
			// 	metadata.push(`${key}: ${url}\n`);
			// 	continue;
			// }

			if (key === 'content') {
				metadata.push(`title: ${value}\n`);
				continue;
			}

			if (!value) {
				metadata.push(`${key}: null\n`);
				continue;
			}

			const stringValue = value instanceof Object ? JSON.stringify(value) : `"${value}"`;
			metadata.push(`${key}: ${stringValue}\n`);
		}

		var isFirstFile = true;
		var url = '';
		for (const block of blocks) {
			//download file to server
			if (
				(block.type === 'file' || block.type === 'image' || block.type === 'video') &&
				block.mediaType === 'file'
			) {
				var url = await downloadFile(outputDir, block.file.url, block.id)
				block.file.url = url;
				if(isFirstFile) {
					metadata.push(`cover: ${url}\n`);
					isFirstFile = false;
				};
			}

			metadata.push(`${block.id}: ${JSON.stringify(block)}`);
		}

		metadata.push('---\n');

		const data = metadata.join('\n') + header.join('\n');
		fs.writeFileSync(`src/pages/${outputDir}/${post.slug}.mdx`, data);
	}
}

// Run the async function
main().catch((error) => {
	console.error('Error in main function:', error);
	process.exit(1);
});
