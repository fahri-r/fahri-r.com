import type { Work } from './work.interface';

interface Education {
	institution: string;
	degree: string;
	major: string;
	entry: number;
	resign: number;
	logoUrl: string;
	initials: string;
	site: string;
}

interface Social {
	href: string;
	label: string;
	icon: string;
}

export default interface Profile {
	name: string;
	initials: string;
	description: string;
	job: string;
	dob: string;
	location: string;
	socials: Social[];
	imgUrl: string;
	works: Work[];
	education: Education[];
}
