import BlurFade from "@/common/components/elements/blur-fade";
import profile from "@/common/constant/profile";
import Markdown from "react-markdown";

function AboutSection({ delay }: { delay: number }) {
    return (
        <section id="about">
            <div className="flex flex-col gap-y-2">
                <BlurFade delay={delay * 3}>
                    <h2 className="text-xl font-bold">About</h2>
                </BlurFade>
                <BlurFade delay={delay * 4}>
                    <Markdown className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert">
                        {profile.description}
                    </Markdown>
                </BlurFade></div>
        </section>
    )
}

export default AboutSection;