import Link from "next/link";
import Image from "next/image";

import MobileButton from "@/components/sidebar/MobileButton";
import profile from "@/data/profile";

export default function MobileProfile() {
  return (
    <>
      <Link href="/">
        <figure className="relative object-contain h-10 w-10 overflow-hidden rounded-full lg:hidden object-cover object-top">
          <Image
            src={profile.imgUrl}
            alt={profile.name}
            fill
          />
        </figure>
      </Link>
      <MobileButton />
    </>
  );
}
