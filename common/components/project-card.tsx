import { Badge } from "@/common/components/elements/badge";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/common/components/elements/card";
import { cn } from "@/common/libs/utils";
import Link from "next/link";
import Markdown from "react-markdown";
import LazyImage from "@/common/components/notion/lazy-image";

interface Props {
    title: string;
    href: string;
    description: string;
    dates: string;
    tags: readonly string[];
    image?: string;
    className?: string;
}

export function ProjectCard({
    title,
    href,
    description,
    dates,
    tags,
    image,
    className,
}: Props) {
    return (
        <Link
            href={`/projects/${href}`}
            className={cn("h-full", className)}
        >
            <Card
                className={
                    "flex flex-col overflow-hidden border hover:shadow-lg transition-all duration-300 ease-out group hover:bg-accent hover:scale-[102%] pb-2 h-full"
                }
            >
                {image && (
                    <LazyImage
                        src={image}
                        className="h-40 w-full overflow-hidden object-cover object-top group-hover:brightness-50 transition-all duration-300 ease-out"
                        alt={title}
                        priority={true}
                    />
                )}
                <CardHeader className="px-2">
                    <div className="space-y-1">
                        <CardTitle className="mt-1 text-base">{title}</CardTitle>
                        <time className="font-sans text-xs">{dates}</time>
                        <Markdown className="prose max-w-full text-pretty font-sans text-xs text-muted-foreground dark:prose-invert line-clamp-3">
                            {description}
                        </Markdown>
                    </div>
                </CardHeader>
                <CardContent className="mt-auto flex flex-col px-2">
                    {tags && tags.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                            {tags?.map((tag) => (
                                <Badge
                                    className="px-1 py-0 text-[10px]"
                                    variant="secondary"
                                    key={tag}
                                >
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </Link>
    );
}
