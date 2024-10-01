import BlurFade from "@/common/components/elements/blur-fade";
import { ResumeCard } from "@/common/components/resume-card";
import profile from "@/common/constant/profile";
import moment from "moment";

function WorkSection({ delay }: { delay: number }) {
    return (
        <section id="work">
            <div className="flex min-h-0 flex-col gap-y-4">
                <BlurFade delay={delay * 5}>
                    <h2 className="text-xl font-bold">Work Experience</h2>
                </BlurFade>
                {profile.works.map((work, id) => {
                    const dateOut = work.resign ? new Date(work.resign.year, work.resign.month - 1) : "Present";
                    const dateIn = new Date(work.entry.year, work.entry.month - 1);
                    return (
                        <BlurFade
                            key={work.company}
                            delay={delay * 6 + id * 0.05}
                        >
                            <ResumeCard
                                key={work.company}
                                initials={work.initials}
                                logoUrl={work.logoUrl}
                                altText={work.company}
                                title={work.company}
                                subtitle={work.role}
                                period={`${moment(dateIn).format("MMM yyyy")} - ${dateOut instanceof Date ? moment(dateOut).format("MMM yyyy") : dateOut}`}
                                description={work.description}
                            />
                        </BlurFade>
                    )
                })}
            </div>
        </section>
    )
}

export default WorkSection;