import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
	return twMerge(clsx(inputs));
};

export const pathJoin = (path: string, subPath: string) => {
	return (
		'/' +
		path
			.split('/')
			.concat(subPath.split('/'))
			.filter((p) => p)
			.join('/')
	);
};
