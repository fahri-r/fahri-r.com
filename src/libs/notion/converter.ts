import fs from 'node:fs';
import { NOTION_KEY } from '~/constants/global';
import { downloadFile, getAllBlocksByBlockId, getAllPosts, getFileExtension } from './utils';
import type { Block } from '~/interfaces/notion/block.interface';
import args from 'args';
import path from 'path';
import type { DatabaseColumn } from '~/interfaces/notion/database-column.interface';
import { Heading1, Heading2, Heading3, Paragraph } from '~/constants/notion-block';

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

const importComponent = (componentName: string, isAnnotation = false) => {
	const notionComponentPath = '~/components/shared/notion-blocks';
	const sanitizedComponentName = componentName.replace(/_/g, '') // Replace all underscores with empty string
	const sanitizedTitle = sanitizedComponentName.replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of each word

	componentName = isAnnotation ? `annotations/${sanitizedComponentName}` : sanitizedComponentName;
	var component = `import ${sanitizedTitle} from '${notionComponentPath}/${componentName}.svelte'`;

	if (!header.includes(component)) {
		header.push(component);
	}
};

var posts = await getAllPosts(databaseId, database);
let header: string[] = [];
for (let post of posts) {
	let metadata = '---\n';
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
			case Paragraph:
				importComponent(Paragraph);
				body += `<Paragraph block={${JSON.stringify(block)}} />\n`;

				break;
			case Heading1:
				importComponent(Heading1);
				body += `<Heading1 block={${JSON.stringify(block)}} />\n`;

				break;
			case Heading2:
				importComponent(Heading2);
				body += `<Heading2 block={${JSON.stringify(block)}} />\n`;

				break;
			case Heading3:
				importComponent(Heading3);
				body += `<Heading3 block={${JSON.stringify(block)}} />\n`;

				break;

			case 'image':
				if (block.image?.file?.url) {
					var component = "import Image from '~/components/image.astro'";
					if (!header.includes(component)) {
						header.push(component);
					}

					var url = block.image.file.url;
					const fileExtension = getFileExtension(url);
					downloadFile(outputDir, url, block.id, fileExtension);

					body += `<Image src="/src/assets/${outputDir}/${block.id}${fileExtension}" />\n`;

					if (!metadata.includes('cover')) {
						metadata += `cover: "/src/assets/${outputDir}/${block.id}${fileExtension}"\n`;
					}
				}

				break;
			case 'video':
				if (block.video?.file?.url) {
					var url = block.video.file.url;
					const fileExtension = getFileExtension(url);
					downloadFile(outputDir, url, block.id, fileExtension);
					body += `<iframe width="100%" height="480" src="/src/assets/${outputDir}/${block.id}${fileExtension}" title="Preview" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen />\n`;
				}

				break;

			default:
				console.log(block.type);
				break;
		}
	});

	metadata += '---\n';
	body += '\n';

	var data = metadata + header.join('\n') + '\n\n' + body;
	fs.writeFileSync(`src/pages/${outputDir}/${post.slug}.mdx`, data);
}
