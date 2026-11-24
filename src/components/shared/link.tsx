import * as React from 'react';
import { cn } from '~/libs/utils';

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
	href: string;
	external?: boolean;
	underline?: boolean;
}

export function Link({ href, external, underline, className, children, ...props }: LinkProps) {
	return (
		<a
			href={href}
			target={external ? '_blank' : '_self'}
			rel={external ? 'noopener noreferrer' : undefined}
			className={cn(
				'text-primary inline-flex items-center justify-center gap-2 underline-offset-2',
				className,
				{
					'underline decoration-1': underline
				}
			)}
			{...props}
		>
			{children}
		</a>
	);
}
