import BlurFade from "@/common/components/elements/blur-fade";
import PostProps from "@/common/types/notion/post";
import { ProjectCard } from "@/common/components/project-card";
import moment from "moment";
import Link from "next/link";

function ProjectSection({ delay, projects }: { delay: number, projects: PostProps[] }) {
    return (
        <section id="projects">
            <div className="flex min-h-0 flex-col gap-y-4">
                <BlurFade delay={delay * 7} className="flex justify-between items-center">
                    <h2 className="text-xl font-bold">Latest Project</h2>
                    <Link href={"/projects"} className="hover:underline font-sans">View All</Link>
                </BlurFade>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto">
                    {projects.map((x, id) => (
                        <BlurFade
                            key={x.title}
                            delay={delay * 12 + id * 0.05}
                        >
                            <ProjectCard
                                href={x.slug}
                                key={x.title}
                                title={x.title}
                                description={x.description}
                                dates={moment(x.date.start_date).format("LL")}
                                tags={x.tools}
                                image={x.pageCoverThumbnail}
                            />
                        </BlurFade>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default ProjectSection;