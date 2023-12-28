"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";

import { useHooks } from "@/context/Provider";
import menu from "@/data/menu";
import { usePathname } from "next/navigation";

export default function MobileMenu() {
  const { showMenu, setShowMenu } = useHooks();
  const pathname = usePathname();

  const handleCloseMenu = () => {
    document.documentElement.style.overflow = "";

    setShowMenu(false);
  };

  return (
    <div
      className={cn("flex flex-col rounded-lg duration-300 lg:hidden", {
        "visible top-0 opacity-100": showMenu,
        "invisible opacity-0": !showMenu,
      })}
    >
      <ul
        className={`${
          showMenu ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {menu.map(({ path, icon, name }, i) => (
          <Link
            key={i}
            href={path}
            className={cn(
              "rounded-lg px-2.5 flex gap-4 py-2.5 text-sm text-primary",
              {
                "bg-neutral-800 text-primary hover:scale-100":
                  pathname === path,
              }
            )}
            onClick={handleCloseMenu}
          >
            <span className={pathname === path ? "-rotate-12" : ""}>
              {icon}
            </span>

            {name}
          </Link>
        ))}
      </ul>
    </div>
  );
}
