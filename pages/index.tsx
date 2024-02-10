import profile from "@/common/constant/profile";
import getPages from "@/common/libs/notion/getPages";
import { fetchCache } from "@/common/libs/redisCache";
import PostProps from "@/common/types/notion/post";
import Home from "@/modules/home";
import { NextSeo } from "next-seo";

type HomePageProps = {
  projects: PostProps[];
};

export default function HomePage({ projects }: HomePageProps) {
  return (
    <>
      <NextSeo title={`${profile.name} - Personal Website`} />
      <Home projects={projects} />
    </>
  );
}

export async function getServerSideProps() {
  const fetchData = async () => {
    const response = await getPages();
    return response;
  };

  const projects = await fetchCache("projects", fetchData, 60 * 60 * 24);

  return {
    props: {
      projects,
    },
  };
}
