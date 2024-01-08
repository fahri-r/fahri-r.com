"use client";

import { CommandIcon, Search, X } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "../utils/Dialog";
import MenuProps from "@/types/menu";
import menu from "@/data/menu";
import { useEffect, useState } from "react";
import { useHooks } from "@/context/Provider";
import Link from "next/link";
import social from "@/data/social";

type Groups = Array<{
  heading: string;
  external: boolean;
  actions: Array<MenuProps>;
}>;

const INITIAL_GROUPS: Groups = [
  {
    heading: "Pages",
    external: false,
    actions: menu,
  },
  {
    heading: "Socials",
    external: true,
    actions: social,
  },
];

export default function Command() {
  const { showCommand, setShowCommand } = useHooks();
  const [search, setSearch] = useState("");
  const [groups, setGroups] = useState(INITIAL_GROUPS);

  useEffect(() => {
    if (!showCommand) {
      setTimeout(() => {
        setSearch("");
      }, 1000);
    }

    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setShowCommand((prevState) => !prevState);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [showCommand]);

  useEffect(() => {
    if (search != "") {
      setGroups([]);
      INITIAL_GROUPS.forEach((group) => {
        const filteredAction = group.actions.filter((action) =>
          action.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        );

        if (filteredAction.length > 0) {
          setGroups((prevGroups) => [
            ...prevGroups,
            {
              heading: group.heading,
              external: group.external,
              actions: filteredAction,
            },
          ]);
        }
      });
    } else {
      setGroups(INITIAL_GROUPS);
    }
  }, [search]);

  return (
    <Dialog open={showCommand} onOpenChange={setShowCommand}>
      <DialogContent>
        <DialogHeader className="flex items-center border-b border-neutral-800 px-3 text-primary/50">
          <Search className="mr-2 h-5 w-5 shrink-0" />
          <input
            className="flex h-11 w-full rounded-lg bg-transparent py-3 text-sm outline-none text-primary/60 placeholder:text-primary/60 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Start typing to search..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <DialogClose>
            <X className="h-4 w-4 text-primary/50" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogHeader>
        <div className="max-h-[300px] overflow-y-auto overflow-x-hidden">
          {groups.length < 1 && (
            <div className="py-6 text-center text-sm text-foreground">
              {`No result found about "${search}" in this website.`}
            </div>
          )}
          {groups.map((group, i) => (
            <div key={i} className="overflow-hidden px-3 py-2">
              <div className="px-2 py-2 text-xs font-medium text-neutral-500">
                {group.heading}
              </div>
              {group.actions.map((action, i) => (
                <Link
                  target={group.external ? "_blank" : "_self"}
                  key={i}
                  href={action.path}
                  onClick={() => setShowCommand(false)}
                  className="relative flex cursor-pointer select-none items-center gap-2.5 rounded-md px-2 py-3 text-sm font-medium text-neutral-400 outline-none duration-300 hover:bg-neutral-800 hover:text-neutral-50 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                >
                  {action.icon}
                  {action.name}
                </Link>
              ))}
            </div>
          ))}
        </div>
        <DialogFooter className="flex justify-end items-center text-xs py-3 px-3 border-t border-neutral-800 text-neutral-400">
          <div className="p-1 rounded-sm bg-neutral-800 h-5 w-5">
            <CommandIcon size={12} />
          </div>
          <span>+</span>
          <div className="flex items-center justify-center p-1 rounded-sm bg-neutral-800 h-5 w-5">
            k
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
