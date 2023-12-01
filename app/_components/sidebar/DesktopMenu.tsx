"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/app/_lib/utils";
import  menu  from "@/app/_data/menu";

export default function DesktopMenu() {
  const pathname = usePathname();

  return (
    <nav className="hidden flex-col gap-1 lg:flex">
      {menu.map(({ path, name, icon }, i) => (
        <Link
          href={path}
          className={cn(
            "flex items-center gap-2 rounded-lg px-2.5 py-2 text-foreground duration-300 hover:bg-neutral-800",
            {
              "bg-neutral-800 text-primary": pathname === path,
            }
          )}
        >
          <span>{icon}</span>
          <span className="text-sm">{name}</span>
        </Link>
      ))}
    </nav>
  );
}
