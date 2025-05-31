export interface QueryDatabase {
	database_id: string;
	page_size?: number;
	start_cursor?: string;
}

export interface RetrieveBlock {
	block_id: string;
}

export interface RetrieveBlockChildren {
	block_id: string;
	page_size?: number;
	start_cursor?: string;
}
