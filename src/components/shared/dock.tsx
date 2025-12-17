import React from 'react';
import { cn } from '~/libs/utils';

type Props = React.HTMLAttributes<HTMLDivElement> & {
	children?: React.ReactNode;
};

function Dock({ className, children, ...props }: Props) {
	return (
		<div
			{...props}
			className={cn('mx-auto flex h-full w-max items-end rounded-full border p-2', className)}
		>
			{children}
		</div>
	);
}

function DockIcon({ children, className, ...props }: Props) {
	return (
		<div
			{...props}
			className={cn(
				'flex aspect-square cursor-pointer items-center justify-center rounded-full',
				className
			)}
		>
			{children}
		</div>
	);
}

export { DockIcon, Dock };
