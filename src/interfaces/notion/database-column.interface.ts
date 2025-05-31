export interface DatabaseColumn {
	type: 'number' | 'select' | 'multi_select' | 'date' | 'url' | 'title' | 'rich_text';
	columnName: string;
	isRequired: boolean;
	isFilename?: boolean;
}
