import DesktopMenu from "@/components/sidebar/DesktopMenu";
import Divider from "@/components/utils/Divider";
import ProfileHeader from "@/components/sidebar/profile/ProfileHeader";
import SidebarFooter from "@/components/sidebar/SidebarFooter";
import MobileMenu from "@/components/sidebar/MobileMenu";
import menu from "@/data/menu";
import Link from "next/link";
import { useHooks } from "@/context/Provider";
import { cn } from "@/lib/utils";

export default function Sidebar() {
  const { showMenu, setShowMenu } = useHooks();

  return (
    <header
      className={cn(
        "sticky h-20 top-0 z-50 flex w-full self-start bg-background lg:h-auto lg:w-1/2 lg:max-w-[230px] flex-col lg:bg-transparent py-8 duration-300",
        { "h-screen": showMenu }
      )}
    >
      <ProfileHeader />
      <Divider className="my-3 lg:hidden block" />
      <MobileMenu />
      <Divider className="my-3 hidden lg:block" />
      <DesktopMenu />
      <Divider className="my-3 hidden lg:block" />
      <SidebarFooter />
    </header>
  );
}
