import Link from "next/link";
import Image from "next/image";

import MobileButton from "@/common/components/sidebar/MobileButton";
import profile from "@/common/constant/profile";
import { useHooks } from "@/common/context/Provider";
import { cn } from "@/common/libs/utils";
import Title from "@/common/components/elements/Title";
import CommandButton from "@/common/components/command/CommandButton";

function MobileProfile() {
  const { showMenu } = useHooks();

  return (
    <>
      <div className="flex flex-col">
        <Link href="/">
          <figure
            className={cn(
              "relative object-contain h-10 w-10 overflow-hidden rounded-full lg:hidden object-cover object-top duration-500",
              { "h-24 w-24": showMenu }
            )}
          >
            <Image src={profile.imgUrl} alt={profile.name} fill />
          </figure>
        </Link>
        <Title
          variant="title"
          className={cn("text-xl mt-3 hidden", { block: showMenu })}
        >
          {profile.name}
        </Title>
      </div>
      <div
        className={cn("flex gap-2 duration-500", {
          "flex-col-reverse items-center justify-between pt-2 h-full": showMenu,
        })}
      >
        <CommandButton className="lg:hidden" size={20} />
        <MobileButton />
      </div>
    </>
  );
}

export default MobileProfile;
