export interface Work {
	company: string;
	role: string;
	entry: WorkDate;
	resign?: WorkDate;
	description?: string;
	logoUrl?: string;
	initials: string;
}

export interface WorkDate {
	month: number;
	year: number;
}
