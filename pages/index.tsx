import BLOG from "@/blog.config";
import profile from "@/common/constant/profile";
import { getGlobalData } from "@/common/libs/notion/getNotionData";
import NotionPageProps from "@/common/types/notion/notion-page";
import PostProps from "@/common/types/notion/post";
import { NextSeo } from "next-seo";
import { ResumeCard } from "@/common/components/elements/resume-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/common/components/elements/avatar";
import BlurFade from "@/common/components/elements/blur-fade";
import BlurFadeText from "@/common/components/elements/blur-fade-text";
import Markdown from "react-markdown";
import moment from "moment";
import Link from "next/link";
import { ProjectCard } from "@/common/components/elements/project-card";

const BLUR_FADE_DELAY = 0.04;

export default function HomePage(props: NotionPageProps) {
  const { posts } = props;

  return (
    <>
      <NextSeo title={`${profile.name} - Personal Website`} />
      <main className="flex flex-col min-h-[100dvh] space-y-10">
        <section id="hero">
          <div className="mx-auto w-full max-w-2xl space-y-8">
            <div className="gap-2 flex justify-between items-center">
              <div className="flex-col flex flex-1 space-y-1.5 md:gap-4">
                <BlurFadeText
                  delay={BLUR_FADE_DELAY}
                  className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
                  yOffset={8}
                  text={profile.name}
                />
                <BlurFadeText
                  className="max-w-[600px] md:text-xl"
                  delay={BLUR_FADE_DELAY}
                  text={profile.job}
                />
              </div>
              <BlurFade delay={BLUR_FADE_DELAY}>
                <Avatar className="size-28 border">
                  <AvatarImage alt={profile.name} src={profile.imgUrl} />
                  <AvatarFallback>{profile.initials}</AvatarFallback>
                </Avatar>
              </BlurFade>
            </div>
          </div>
        </section>
        <section id="about">
          <div className="flex flex-col gap-y-2">
            <BlurFade delay={BLUR_FADE_DELAY * 3}>
              <h2 className="text-xl font-bold">About</h2>
            </BlurFade>
            <BlurFade delay={BLUR_FADE_DELAY * 4}>
              <Markdown className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert">
                {profile.description}
              </Markdown>
            </BlurFade></div>
        </section>
        <section id="work">
          <div className="flex min-h-0 flex-col gap-y-4">
            <BlurFade delay={BLUR_FADE_DELAY * 5}>
              <h2 className="text-xl font-bold">Work Experience</h2>
            </BlurFade>
            {profile.works.map((work, id) => {
              const dateOut = work.resign ? new Date(work.resign.year, work.resign.month - 1) : "Present";
              const dateIn = new Date(work.entry.year, work.entry.month - 1);
              return (
                <BlurFade
                  key={work.company}
                  delay={BLUR_FADE_DELAY * 6 + id * 0.05}
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
        <section id="education">
          <div className="flex min-h-0 flex-col gap-y-4">
            <BlurFade delay={BLUR_FADE_DELAY * 7}>
              <h2 className="text-xl font-bold">Education</h2>
            </BlurFade>
            {profile.education.map((education, id) => (
              <BlurFade
                key={education.institution}
                delay={BLUR_FADE_DELAY * 8 + id * 0.05}
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
        <section id="projects">
          <div className="flex min-h-0 flex-col gap-y-4">
            <BlurFade delay={BLUR_FADE_DELAY * 7} className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Latest Project</h2>
              <Link href={"/projects"} className="hover:underline">View All</Link>
            </BlurFade>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto">
              {posts.map((x, id) => (
                <BlurFade
                  key={x.title}
                  delay={BLUR_FADE_DELAY * 12 + id * 0.05}
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
      </main>
    </>
  );
}

export async function getStaticProps() {
  const from = "index";
  const props = await getGlobalData({ from });

  props.posts = props.allPages?.filter(
    (page: PostProps) =>
      page.status === BLOG.NOTION_PROPERTY_NAME.status_publish
  ).slice(0, 4);

  return {
    props,
    revalidate: parseInt(BLOG.NEXT_REVALIDATE_SECOND as string),
  };
}
