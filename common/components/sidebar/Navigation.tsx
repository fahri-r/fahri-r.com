"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/common/libs/utils";
import menu from "@/common/constant/menu";

function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="hidden flex-col gap-1 lg:flex w-full">
      {menu.map(({ path, name, icon }, i) => (
        <Link
          key={i}
          href={path}
          className={cn(
            "flex items-center gap-2 rounded-lg px-2.5 py-2 text-foreground duration-300 hover:bg-neutral-800 group hover:scale-105",
            {
              "bg-neutral-800 text-primary hover:scale-100": pathname === path,
            }
          )}
        >
          <span
            className={cn("group-hover:-rotate-12 duration-300", {
              "-rotate-12": pathname === path,
            })}
          >
            {icon}
          </span>
          <span className="text-sm">{name}</span>
        </Link>
      ))}
    </nav>
  );
}

export default Navigation;
