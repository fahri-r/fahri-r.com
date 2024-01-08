import Navigation from "@/components/sidebar/Navigation";
import Divider from "@/components/utils/Divider";
import ProfileHeader from "@/components/sidebar/profile/ProfileHeader";
import SidebarFooter from "@/components/sidebar/SidebarFooter";
import MobileMenu from "@/components/sidebar/MobileMenu";
import useIsMobile from "@/hooks/useIsMobile";
import { cn } from "@/lib/utils";
import { useHooks } from "@/context/Provider";

export default function Sidebar() {
  const isMobile = useIsMobile();
  const { showMenu } = useHooks();

  return (
    <header
      className={cn(
        "sticky top-0 z-50 flex h-20 w-full self-start bg-background lg:h-auto lg:w-full lg:max-w-[250px] lg:flex-col lg:bg-transparent lg:py-8",
        { "h-screen items-start flex-col": showMenu }
      )}
    >
      <ProfileHeader />
      {!isMobile ? (
        <>
          <Divider className="my-3 hidden lg:block" />
          <Navigation />
          <Divider className="my-3 hidden lg:block" />
          <SidebarFooter />
        </>
      ) : (
        <MobileMenu />
      )}
    </header>
  );
}
