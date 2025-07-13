export type BlockType =
	| 'paragraph'
	| 'heading_1'
	| 'heading_2'
	| 'heading_3'
	| 'divider'
	| 'quote'
	| 'embed'
	| 'bookmark'
	| 'link_preview'
	| 'callout'
	| 'video'
	| 'image'
	| 'file'
	| 'toggle'
	| 'table'
	| 'table_of_contents'
	| 'synced_block'
	| 'link_to_page'
	| 'code'
	| 'equation'
	| 'bulleted_list_item'
	| 'numbered_list_item'
	| 'to_do'
	| 'column_list'
	| 'divider';

export type Block =
	| Paragraph
	| Heading1
	| Heading2
	| Heading3
	| Image
	| Video
	| File
	| Code
	| Quote
	| Equation
	| Toggle
	| Embed
	| Bookmark
	| LinkPreview
	| BulletedListItem
	| NumberedListItem
	| ToDo
	| Table
	| ColumnList
	| TableOfContents
	| LinkToPage
	| Callout
	| SyncedBlock
 	| Divider;

interface BaseBlock {
	id: string;
	type: BlockType;
	hasChildren: boolean;
}

export interface Divider extends BaseBlock {
	type: 'divider';
}

export interface Paragraph extends BaseBlock {
	type: 'paragraph';
	richTexts: RichText[];
	color: string;
	children?: Block[];
}

export interface Heading1 extends BaseBlock {
	type: 'heading_1';
	richTexts: RichText[];
	color: string;
	isToggleable: boolean;
	children?: Block[];
}

export interface Heading2 extends BaseBlock {
	type: 'heading_2';
	richTexts: RichText[];
	color: string;
	isToggleable: boolean;
	children?: Block[];
}

export interface Heading3 extends BaseBlock {
	type: 'heading_3';
	richTexts: RichText[];
	color: string;
	isToggleable: boolean;
	children?: Block[];
}

export interface BulletedListItem extends BaseBlock {
	type: 'bulleted_list_item';
	richTexts: RichText[];
	color: string;
	children?: Block[];
}

export interface NumberedListItem extends BaseBlock {
	type: 'numbered_list_item';
	richTexts: RichText[];
	color: string;
	children?: Block[];
}

export interface ToDo extends BaseBlock {
	type: 'to_do';
	richTexts: RichText[];
	checked: boolean;
	color: string;
	children?: Block[];
}

type MediaType = 'external' | 'file';

interface MediaBlock extends BaseBlock {
	caption: RichText[];
	mediaType: MediaType;
}

export interface FileObject {
	type: string;
	url: string;
	expiryTime?: string;
}

interface External {
	url: string;
}

interface FileMedia extends MediaBlock {
	mediaType: 'file';
	file: FileObject;
}

interface ExternalMedia extends MediaBlock {
	mediaType: 'external';
	external: External;
}

export type Image = (FileMedia | ExternalMedia) & {
	type: 'image';
	width?: number;
	height?: number;
};

export type Video = (FileMedia | ExternalMedia) & {
	type: 'video';
};

export type File = (FileMedia | ExternalMedia) & {
	type: 'file';
};

export interface Code extends BaseBlock {
	type: 'code';
	caption: RichText[];
	richTexts: RichText[];
	language: string;
}

export interface Quote extends BaseBlock {
	type: 'quote';
	richTexts: RichText[];
	color: string;
	children?: Block[];
}

export interface Equation extends BaseBlock {
	type: 'equation';
	expression: string;
}

export interface Callout extends BaseBlock {
	type: 'callout';
	richTexts: RichText[];
	icon: FileObject | Emoji | null;
	color: string;
	children?: Block[];
}

export interface SyncedBlock extends BaseBlock {
	type: 'synced_block';
	syncedFrom: SyncedFrom | null;
	children?: Block[];
}

export interface SyncedFrom {
	blockId: string;
}

export interface Toggle extends BaseBlock {
	type: 'toggle';
	richTexts: RichText[];
	color: string;
	children: Block[];
}

export interface Embed extends BaseBlock {
	type: 'embed';
	url: string;
}

export interface Bookmark extends BaseBlock {
	type: 'bookmark';
	url: string;
}

export interface LinkPreview extends BaseBlock {
	type: 'link_preview';
	url: string;
}

export interface Table extends BaseBlock {
	type: 'table';
	tableWidth: number;
	hasColumnHeader: boolean;
	hasRowHeader: boolean;
	rows: TableRow[];
}

export interface TableRow {
	id: string;
	type: string;
	hasChildren: boolean;
	cells: TableCell[];
}

export interface TableCell {
	richTexts: RichText[];
}

export interface ColumnList extends BaseBlock {
	type: 'column_list';
	columns: Column[];
}

export interface Column {
	id: string;
	type: string;
	hasChildren: boolean;
	children: Block[];
}

export interface List {
	type: 'bulleted_list' | 'numbered_list' | 'to_do_list';
	listItems: Block[];
}

export interface BulletedList extends List{
	type: 'bulleted_list';
	listItems: BulletedListItem[];
}

export interface NumberedList extends List{
	type: 'numbered_list';
	listItems: NumberedListItem[];
}

export interface ToDoList extends List{
	type: 'to_do_list';
	listItems: ToDo[];
}

export interface TableOfContents extends BaseBlock {
	type: 'table_of_contents';
	color: string;
}

export interface RichText {
	text?: Text;
	annotation: Annotation;
	plainText: string;
	href?: string;
	equation?: Equation;
	mention?: Mention;
}

export interface Text {
	content: string;
	link?: Link;
}

export interface Emoji {
	type: string;
	emoji: string;
}

export interface Annotation {
	bold: boolean;
	italic: boolean;
	strikethrough: boolean;
	underline: boolean;
	code: boolean;
	color: string;
}

export interface Link {
	url: string;
}

export interface LinkToPage extends BaseBlock {
	type: 'link_to_page';
	linkType: string;
	pageId: string;
}

export interface Mention {
	type: string;
	page?: Reference;
}

export interface Reference {
	id: string;
}
