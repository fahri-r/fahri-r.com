import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
	return twMerge(clsx(inputs));
};

export function getHeadingMargin(depth: number): string {
	const margins: Record<number, string> = {
		3: 'ml-4',
		4: 'ml-8',
		5: 'ml-12',
		6: 'ml-16'
	};
	return margins[depth] || '';
}
