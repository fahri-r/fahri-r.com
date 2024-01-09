import profile from "@/common/constant/profile";
import getPages from "@/common/libs/notion/getPages";
import { fetchCache } from "@/common/libs/redisCache";
import Home from "@/modules/home";
import { NextSeo } from "next-seo";

export default function HomePage({ projects }: any) {
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
