import Link from "next/link";
import Image from "next/image";

import MobileButton from "@/components/sidebar/MobileButton";
import profile from "@/data/profile";
import { useHooks } from "@/context/Provider";
import { cn } from "@/lib/utils";
import Title from "@/components/utils/Title";
import CommandButton from "@/components/ui/CommandButton";

export default function MobileProfile() {
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
