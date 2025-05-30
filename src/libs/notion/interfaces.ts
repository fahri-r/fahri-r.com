import type { SelectProperty } from './responses';

export interface Post {
	pageId: string;
	title: string;
	icon: FileObject | Emoji | null;
	cover: FileObject | null;
	slug: string;
	date: string;
	repository: string | null;
	site: string | null;
	tools: SelectProperty[];
	category: string;
	description: string;
}

export interface Block {
	id: string;
	type: string;
	hasChildren: boolean;

	paragraph?: Paragraph;
	heading1?: Heading1;
	heading2?: Heading2;
	heading3?: Heading3;
	bulletedListItem?: BulletedListItem;
	numberedListItem?: NumberedListItem;
	toDo?: ToDo;
	image?: Image;
	file?: File;
	code?: Code;
	quote?: Quote;
	equation?: Equation;
	callout?: Callout;
	syncedBlock?: SyncedBlock;
	toggle?: Toggle;
	embed?: Embed;
	video?: Video;
	bookmark?: Bookmark;
	linkPreview?: LinkPreview;
	table?: Table;
	columnList?: ColumnList;
	tableOfContents?: TableOfContents;
	linkToPage?: LinkToPage;
}

export interface Paragraph {
	richTexts: RichText[];
	color: string;
	children?: Block[];
}

export interface Heading1 {
	richTexts: RichText[];
	color: string;
	isToggleable: boolean;
	children?: Block[];
}

export interface Heading2 {
	richTexts: RichText[];
	color: string;
	isToggleable: boolean;
	children?: Block[];
}

export interface Heading3 {
	richTexts: RichText[];
	color: string;
	isToggleable: boolean;
	children?: Block[];
}

export interface BulletedListItem {
	richTexts: RichText[];
	color: string;
	children?: Block[];
}

export interface NumberedListItem {
	richTexts: RichText[];
	color: string;
	children?: Block[];
}

export interface ToDo {
	richTexts: RichText[];
	checked: boolean;
	color: string;
	children?: Block[];
}

export interface Image {
	caption: RichText[];
	type: string;
	file?: FileObject;
	external?: External;
	width?: number;
	height?: number;
}

export interface Video {
	caption: RichText[];
	type: string;
	file?: FileObject;
	external?: External;
}

export interface File {
	caption: RichText[];
	type: string;
	file?: FileObject;
	external?: External;
}

export interface FileObject {
	type: string;
	url: string;
	expiryTime?: string;
}

export interface External {
	url: string;
}

export interface Code {
	caption: RichText[];
	richTexts: RichText[];
	language: string;
}

export interface Quote {
	richTexts: RichText[];
	color: string;
	children?: Block[];
}

export interface Equation {
	expression: string;
}

export interface Callout {
	richTexts: RichText[];
	icon: FileObject | Emoji | null;
	color: string;
	children?: Block[];
}

export interface SyncedBlock {
	syncedFrom: SyncedFrom | null;
	children?: Block[];
}

export interface SyncedFrom {
	blockId: string;
}

export interface Toggle {
	richTexts: RichText[];
	color: string;
	children: Block[];
}

export interface Embed {
	url: string;
}

export interface Bookmark {
	url: string;
}

export interface LinkPreview {
	url: string;
}

export interface Table {
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

export interface ColumnList {
	columns: Column[];
}

export interface Column {
	id: string;
	type: string;
	hasChildren: boolean;
	children: Block[];
}

export interface List {
	type: string;
	listItems: Block[];
}

export interface TableOfContents {
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

export interface LinkToPage {
	type: string;
	pageId: string;
}

export interface Mention {
	type: string;
	page?: Reference;
}

export interface Reference {
	id: string;
}
