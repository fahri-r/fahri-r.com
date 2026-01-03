import * as React from 'react';
import { cn } from '~/lib/utils';

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
	href: string;
	external?: boolean;
	underline?: boolean;
}

export function Link({ href, external, underline, className, ...rest }: LinkProps) {
	return (
		<a
			href={href}
			target={external ? '_blank' : '_self'}
			rel={external ? 'noopener noreferrer' : undefined}
			className={cn(
				'text-primary inline-flex items-center justify-center gap-2 transition-colors duration-300 ease-in-out',
				className,
				{
					'decoration-muted-foreground underline-offset-4 hover:underline':
						underline
				}
			)}
			{...rest}
		>
			{rest.children}
		</a>
	);
}
