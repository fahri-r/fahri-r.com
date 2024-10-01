import { Avatar, AvatarFallback, AvatarImage } from "@/common/components/elements/avatar";
import BlurFade from "@/common/components/elements/blur-fade";
import BlurFadeText from "@/common/components/elements/blur-fade-text";
import profile from "@/common/constant/profile";

function HeroSection({ delay }: { delay: number }) {
    return (
        <section id="hero">
            <div className="mx-auto w-full max-w-2xl space-y-8">
                <div className="gap-2 flex justify-between items-center">
                    <div className="flex-col flex flex-1 space-y-1.5 md:gap-4">
                        <BlurFadeText
                            delay={delay}
                            className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
                            yOffset={8}
                            text={profile.name}
                        />
                        <BlurFadeText
                            className="max-w-[600px] md:text-xl"
                            delay={delay}
                            text={profile.job}
                        />
                    </div>
                    <BlurFade delay={delay}>
                        <Avatar className="size-28 border">
                            <AvatarImage alt={profile.name} src={profile.imgUrl} />
                            <AvatarFallback>{profile.initials}</AvatarFallback>
                        </Avatar>
                    </BlurFade>
                </div>
            </div>
        </section>
    )
}

export default HeroSection;