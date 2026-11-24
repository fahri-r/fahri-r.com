import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '~/libs/utils';

const badgeVariants = cva(
	'inline-flex w-fit shrink-0 items-center justify-center gap-1 whitespace-nowrap rounded-none border px-1.5 py-0.5 font-heading text-[0.55rem] leading-[1.7] [&>svg]:size-3 [&>svg]:pointer-events-none overflow-hidden',
	{
		variants: {
			variant: {
				default: 'border-primary bg-primary text-primary-foreground',
				secondary: 'border-border bg-secondary/30 text-foreground',
				destructive: 'border-destructive bg-destructive text-white',
				outline: 'border-border bg-background text-foreground'
			}
		},
		defaultVariants: {
			variant: 'default'
		}
	}
);

function Badge({
	className,
	variant,
	asChild = false,
	...props
}: React.ComponentProps<'span'> & VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
	const Comp = asChild ? Slot : 'span';

	return (
		<Comp data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />
	);
}

export { Badge, badgeVariants };
