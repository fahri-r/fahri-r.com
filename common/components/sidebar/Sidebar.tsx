import Navigation from "@/common/components/sidebar/Navigation";
import Divider from "@/common/components/elements/Divider";
import ProfileHeader from "@/common/components/sidebar/profile/ProfileHeader";
import SidebarFooter from "@/common/components/sidebar/SidebarFooter";
import MobileMenu from "@/common/components/sidebar/MobileMenu";
import useIsMobile from "@/common/hooks/useIsMobile";
import { cn } from "@/common/libs/utils";
import { useHooks } from "@/common/context/Provider";

function Sidebar() {
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

export default Sidebar;
