import DesktopProfile from "@/app/_components/sidebar/profile/DesktopProfile";
import MobileProfile from "@/app/_components/sidebar/profile/MobileProfile";

export default function ProfileHeader() {
  return (
    <div className="flex w-full items-center justify-between gap-2 lg:flex-col lg:items-start lg:gap-0.5">
      <DesktopProfile />
      <MobileProfile />
    </div>
  );
}
