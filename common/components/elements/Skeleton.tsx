import { cn } from "@/common/libs/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-white/20", className)}
      {...props}
    />
  );
}

export { Skeleton };
