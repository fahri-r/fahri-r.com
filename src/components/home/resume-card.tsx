import { useState } from 'react';
import { ChevronRight, ChevronRightIcon } from 'lucide-react';
import { Card, CardHeader } from '~/components/shared/card';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/shared/avatar';
import { cn } from '~/libs/utils';

type ResumeCardProps = {
	logoUrl?: string;
	altText?: string;
	title: string;
	subtitle?: string;
	period?: string;
	description?: string;
	initials?: string;
};

export default function ResumeCard({
	logoUrl,
	altText,
	title,
	subtitle,
	period,
	description,
	initials
}: ResumeCardProps) {
	const [isExpanded, setIsExpanded] = useState(false);

	const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		if (!description) return;
		e.preventDefault();
		setIsExpanded((prev) => !prev);
	};

	return (
		<button
			type="button"
			onClick={onClick}
			className={cn('block w-full cursor-default', {
				'cursor-pointer': !!description
			})}
		>
			<Card className="flex-row px-4">
				<div className="flex-none">
					<Avatar className="bg-muted-background dark:bg-foreground m-auto size-12">
						<AvatarImage src={logoUrl} alt={altText} className="object-contain" />
						<AvatarFallback>{initials}</AvatarFallback>
					</Avatar>
				</div>
				<div className="group ml-4 flex-grow flex-col items-center">
					<CardHeader className='px-0'>
						<div className="flex items-center justify-between gap-x-2 text-base">
							<h3 className="inline-flex items-center justify-center text-xs leading-none font-semibold sm:text-sm">
								{title}
								<ChevronRightIcon
									className={cn(
										'size-4 translate-x-0 rotate-0 transform opacity-0 transition-all duration-300 ease-out',
										{
											'rotate-90': isExpanded,
											'group-hover:translate-x-1 group-hover:opacity-100': description
										}
									)}
								/>
							</h3>
							<div className="text-muted-foreground text-right font-sans text-xs tabular-nums sm:text-sm">
								{period}
							</div>
						</div>
						{subtitle && <div className="font-sans text-xs">{subtitle}</div>}
					</CardHeader>
					{description && isExpanded && <div className="mt-2 text-xs sm:text-sm">{description}</div>}
				</div>
			</Card>
		</button>
	);
}
