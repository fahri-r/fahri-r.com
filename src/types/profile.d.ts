import type { WorkProps } from './work';

type EducationProps = {
	institution: string;
	degree: string;
	major: string;
	entry: number;
	resign: number;
	logoUrl: string;
	initials: string;
	site: string;
};

type SocialProps = {
	href: string;
	label: string;
	icon: IconProps;
};

type ProfileProps = {
	name: string;
	initials: string;
	description: string;
	job: string;
	dob: string;
	location: string;
	socials: SocialProps[];
	imgUrl: string;
	works: WorkProps[];
	education: EducationProps[];
};

export default ProfileProps;
