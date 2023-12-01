import { cn } from "@/lib/utils";

export default function Divider({ className }: { className?: string }) {
  return <div className={cn("my-6 h-px w-full bg-neutral-800", className)} />;
}
