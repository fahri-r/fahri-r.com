import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '~/libs/utils';

const buttonVariants = cva(
	"cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-none font-heading text-[0.6rem] leading-[1.8] disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary aria-invalid:outline-destructive",
	{
		variants: {
			variant: {
				default:
					'border border-primary bg-primary text-primary-foreground hover:border-foreground hover:bg-foreground hover:text-background',
				destructive: 'border border-destructive bg-destructive text-white hover:bg-destructive/90',
				outline: 'border border-border bg-card text-foreground hover:bg-secondary/40',
				secondary:
					'border border-secondary bg-secondary text-secondary-foreground hover:border-primary hover:bg-primary hover:text-primary-foreground',
				ghost: 'border border-transparent hover:border-border hover:bg-card'
			},
			size: {
				default: 'h-9 px-3 py-2 has-[>svg]:px-3',
				sm: 'h-8 gap-1.5 px-2.5 has-[>svg]:px-2',
				lg: 'h-10 px-5 has-[>svg]:px-4',
				icon: 'size-9',
				'icon-sm': 'size-8',
				'icon-lg': 'size-10'
			}
		},
		defaultVariants: {
			variant: 'default',
			size: 'default'
		}
	}
);

function Button({
	className,
	variant = 'default',
	size = 'default',
	asChild = false,
	...props
}: React.ComponentProps<'button'> &
	VariantProps<typeof buttonVariants> & {
		asChild?: boolean;
	}) {
	const Comp = asChild ? Slot : 'button';

	return (
		<Comp
			data-slot="button"
			data-variant={variant}
			data-size={size}
			className={cn(buttonVariants({ variant, size, className }))}
			{...props}
		/>
	);
}

export { Button, buttonVariants };
