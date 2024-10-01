"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/common/components/elements/avatar";
import { Card, CardHeader } from "@/common/components/elements/card";
import { cn } from "@/common/libs/utils";
import { motion } from "framer-motion";
import { ChevronRightIcon } from "lucide-react";
import React from "react";

interface ResumeCardProps {
    logoUrl?: string;
    altText: string;
    title: string;
    subtitle?: string;
    period: string;
    description?: string;
    initials: string;
}
export const ResumeCard = ({
    logoUrl,
    altText,
    title,
    subtitle,
    period,
    description,
    initials,
}: ResumeCardProps) => {
    const [isExpanded, setIsExpanded] = React.useState(false);

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (description) {
            e.preventDefault();
            setIsExpanded(!isExpanded);
        }
    };

    return (
        <div
            className={cn("block cursor-default", {
                "cursor-pointer": description
            })}
            onClick={handleClick}
        >
            <Card className="flex">
                <div className="flex-none">
                    <Avatar className="size-12 m-auto bg-muted-background dark:bg-foreground">
                        <AvatarImage
                            src={logoUrl}
                            alt={altText}
                            className="object-contain"
                        />
                        <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                </div>
                <div className="flex-grow ml-4 items-center flex-col group">
                    <CardHeader>
                        <div className="flex items-center justify-between gap-x-2 text-base">
                            <h3 className="inline-flex items-center justify-center font-semibold leading-none text-xs sm:text-sm">
                                {title}
                                <ChevronRightIcon
                                    className={cn(
                                        "size-4 translate-x-0 transform opacity-0 transition-all duration-300 ease-out rotate-0",
                                        {
                                            "rotate-90": isExpanded,
                                            "group-hover:translate-x-1 group-hover:opacity-100": description,
                                        }
                                    )}
                                />
                            </h3>
                            <div className="text-xs sm:text-sm tabular-nums text-muted-foreground text-right font-sans">
                                {period}
                            </div>
                        </div>
                        {subtitle && <div className="font-sans text-xs">{subtitle}</div>}
                    </CardHeader>
                    {description && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{
                                opacity: isExpanded ? 1 : 0,
                                height: isExpanded ? "auto" : 0,
                            }}
                            transition={{
                                duration: 0.7,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                            className="mt-2 text-xs sm:text-sm"
                        >
                            {description}
                        </motion.div>
                    )}
                </div>
            </Card>
        </div>
    );
};
