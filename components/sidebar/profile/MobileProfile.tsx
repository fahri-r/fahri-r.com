import Link from "next/link";
import Image from "next/image";

import MobileButton from "@/components/sidebar/MobileButton";
import profile from "@/data/profile";
import { useHooks } from "@/context/Provider";
import { cn } from "@/lib/utils";
import Title from "@/components/utils/Title";
import CommandButton from "@/components/command/CommandButton";

export default function MobileProfile() {
  const { showMenu } = useHooks();

  return (
    <>
      <div className="flex flex-col">
        <Link href="/">
          <figure
            className={cn(
              "relative object-contain h-10 w-10 overflow-hidden rounded-full lg:hidden object-cover object-top duration-300",
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
      <div className="flex gap-2">
        <CommandButton />
        <MobileButton />
      </div>
    </>
  );
}
