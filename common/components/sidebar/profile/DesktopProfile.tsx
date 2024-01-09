"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

import { cn } from "@/common/libs/utils";

import Title from "@/common/components/elements/Title";
import Typography from "@/common/components/elements/Typography";
import profile from "@/common/constant/profile";
import Link from "next/link";

function DesktopProfile() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.scrollY;

      setIsScrolled(scrollTop > 0);
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div
        className={cn("-ml-1 mb-2 duration-500 ease-in-out max-lg:hidden", {
          "scale-90": isScrolled,
          "scale-100": !isScrolled,
        })}
      >
        <figure className="relative h-[100px] w-[100px] overflow-hidden rounded-full">
          <Image
            src={profile.imgUrl}
            alt={profile.name}
            className="duration-500 ease-in-out hover:scale-105 object-cover object-top"
            fill
          />
        </figure>
      </div>
      <div className="hidden lg:block">
        <Title variant="title" className="text-md lg:text-xl">
          {profile.name}
        </Title>
        <Link
          href={
            profile.socials.find((social) => social.name == "GitHub")?.href!
          }
          legacyBehavior
        >
          <a target="_blank" rel="noreferrer" className="block w-fit">
            <Typography
              variant="muted"
              className="select-none text-sm duration-300 hover:text-foreground"
            >
              @
              {
                profile.socials.find((social) => social.name == "GitHub")
                  ?.username
              }
            </Typography>
          </a>
        </Link>
      </div>
      <div className="mb-1 mt-3 flex items-center gap-2 max-lg:hidden">
        <div>
          <div className="h-2.5 w-2.5 rounded-full bg-emerald-600">
            <div className="z-[11] h-2.5 w-2.5 animate-ping rounded-full bg-emerald-600 transition-[4s]" />
          </div>
        </div>
        <Typography size="sm" variant="muted" className="font-mono">
          available for hire
        </Typography>
      </div>
    </>
  );
}

export default DesktopProfile;
