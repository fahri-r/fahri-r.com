"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";

import { useHooks } from "@/context/Provider";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./CommandComponents";
import menu from "@/data/menu";
import MenuProps from "@/types/menu";

type Groups = Array<{
  heading: string;
  actions: Array<MenuProps>;
}>;

const Command = () => {
  const { showCommand, setShowCommand } = useHooks();

  const router = useRouter();

  const openLink = useCallback((url: string) => {
    window.open(url, "_blank");
  }, []);

  const forwardToRoute = (route: string) => {
    router.push(route);
    setShowCommand(false);
  };

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setShowCommand((prevState) => !prevState);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [setShowCommand]);

  const groups: Groups = [
    {
      heading: "Pages",
      actions: menu,
    },
  ];

  return (
    <CommandDialog open={showCommand} onOpenChange={setShowCommand}>
      <CommandInput placeholder="Start typing to search..." />
      <CommandList>
        <CommandEmpty>No result found.</CommandEmpty>
        {groups.map((group) => (
          <CommandGroup key={group.heading} heading={group.heading}>
            {group.actions.map((action) => (
              <CommandItem
                key={action.name}
                onSelect={() => forwardToRoute(action.path)}
              >
                {action.icon}
                {action.name}
              </CommandItem>
            ))}
          </CommandGroup>
        ))}
      </CommandList>
    </CommandDialog>
  );
};

export { Command };
