import { Dock, DockIcon } from "@/common/components/elements/dock";
import { ModeToggle } from "@/common/components/mode-toggle";
import { buttonVariants } from "@/common/components/elements/button";
import { Separator } from "@/common/components/elements/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/common/components/elements/tooltip";
import { cn } from "@/common/libs/utils";
import Link from "next/link";
import menu from "@/common/constant/menu";
import profile from "@/common/constant/profile";
import LucideIcon from "./elements/lucide-icon";

export default function Navbar() {

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 mx-auto mb-4 flex origin-bottom h-full max-h-14">
      <div className="fixed bottom-0 inset-x-0 h-16 w-full bg-background to-transparent backdrop-blur-lg [-webkit-mask-image:linear-gradient(to_top,black,transparent)] dark:bg-background"></div>
      <Dock className="z-50 pointer-events-auto relative mx-auto flex min-h-full h-full items-center px-1 bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] ">
        {menu.map((item, index) => (
          <DockIcon key={index}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={item.path}
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "size-12"
                  )}
                >
                  <LucideIcon name={item.icon} className="size-4" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>{item.name}</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>)
        )}
        <Separator orientation="vertical" className="h-full" />
        {profile.socials.map((item, index) => (
          <DockIcon key={index}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "size-12"
                  )}
                >
                  <LucideIcon name={item.icon} className="size-4" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>{item.label}</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
        ))}
        <Separator orientation="vertical" className="h-full py-2" />
        <DockIcon>
          <Tooltip>
            <TooltipTrigger asChild>
              <ModeToggle />
            </TooltipTrigger>
            <TooltipContent>
              <p>Theme</p>
            </TooltipContent>
          </Tooltip>
        </DockIcon>
      </Dock>
    </div>
  );
}