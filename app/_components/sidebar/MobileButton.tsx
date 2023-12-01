"use client";

import { Equal, X } from "lucide-react";

import { useHooks } from "@/app/_context/Provider";

export default function MobileButton() {
  const { showMenu, setShowMenu } = useHooks();

  const handleMenu = () => {
    setShowMenu((prevstate: any) => !prevstate);

    if (!showMenu) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }
  };

  return (
    <button
      onClick={handleMenu}
      className="text-neutral-400 transition-transform active:scale-75 lg:hidden"
    >
      {showMenu ? <X size={28} /> : <Equal size={28} />}
    </button>
  );
}
