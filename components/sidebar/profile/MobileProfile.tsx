import Link from "next/link";
import Image from "next/image";

import MobileButton from "@/components/sidebar/MobileButton";
import profile from "@/data/profile";

export default function MobileProfile() {
  return (
    <>
      <Link href="/">
        <figure className="relative h-10 w-10 overflow-hidden rounded-full lg:hidden">
          <Image
            src={profile.imgUrl}
            alt={profile.name}
            objectFit="cover"
            objectPosition="top"
            fill
          />
        </figure>
      </Link>
      <MobileButton />
    </>
  );
}
