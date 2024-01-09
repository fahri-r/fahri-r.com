import Link from "next/link";

import { cn } from "@/common/libs/utils";

import { useHooks } from "@/common/context/Provider";

import menu from "@/common/constant/menu";
import { usePathname } from "next/navigation";
import Divider from "../elements/Divider";

function MobileMenu() {
  const { showMenu, setShowMenu } = useHooks();
  const pathname = usePathname();

  const handleCloseMenu = () => {
    document.documentElement.style.overflow = "";

    setShowMenu(false);
  };

  return (
    <>
      {showMenu && <Divider className="my-3" />}
      <div
        className={cn(
          "flex flex-col bg-background duration-300 w-full space-y-1",
          {
            "block top-0 scale-100 opacity-100": showMenu,
            "hidden scale-50 opacity-0": !showMenu,
          }
        )}
      >
        {menu.map(({ path, icon, name }) => (
          <Link
            key={name}
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
      </div>
    </>
  );
}

export default MobileMenu;
