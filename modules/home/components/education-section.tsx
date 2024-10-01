import BlurFade from "@/common/components/elements/blur-fade";
import { ResumeCard } from "@/common/components/resume-card";
import profile from "@/common/constant/profile";

function EducationSection({ delay }: { delay: number }) {
    return (
        <section id="education">
            <div className="flex min-h-0 flex-col gap-y-4">
                <BlurFade delay={delay * 7}>
                    <h2 className="text-xl font-bold">Education</h2>
                </BlurFade>
                {profile.education.map((education, id) => (
                    <BlurFade
                        key={education.institution}
                        delay={delay * 8 + id * 0.05}
                    >
                        <ResumeCard
                            key={education.institution}
                            initials={education.initials}
                            logoUrl={education.logoUrl}
                            altText={education.institution}
                            title={education.institution}
                            subtitle={`${education.degree} - ${education.major}`}
                            period={`${education.entry} - ${education.resign}`}
                        />
                    </BlurFade>
                ))}
            </div>
        </section>
    )
}

export default EducationSection;