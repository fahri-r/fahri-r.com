import { PROJECT_DATABASE_ID } from '~/constants/global';
import type { DatabaseColumn } from '~/interfaces/notion/database-column.interface';

export const DATABASE_ID = PROJECT_DATABASE_ID;

export const DATABASE: DatabaseColumn[] = [
	{
		type: 'title',
		columnName: 'content',
		isRequired: true
	},
	{
		type: 'rich_text',
		columnName: 'slug',
		isRequired: true,
		isFilename: true
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
