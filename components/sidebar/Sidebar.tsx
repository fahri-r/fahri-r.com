import DesktopMenu from "@/components/sidebar/DesktopMenu";
import Divider from "@/components/utils/Divider";
import ProfileHeader from "@/components/sidebar/profile/ProfileHeader";
import SidebarFooter from "@/components/sidebar/SidebarFooter";
import MobileMenu from "@/components/sidebar/MobileMenu";

export default function Sidebar() {
  return (
    <header className="sticky top-0 z-10 flex h-20 w-full self-start bg-background lg:h-auto lg:w-1/2 lg:max-w-[230px] lg:flex-col lg:bg-transparent lg:py-8">
      <ProfileHeader />
      <Divider className="my-3 hidden lg:block" />
      <DesktopMenu />
      <Divider className="my-3 hidden lg:block" />
      <SidebarFooter />
      <MobileMenu />
    </header>
  );
}
