import { getGlobalData } from "@/common/libs/dev/notion/getNotionData";
import BLOG from "@/blog.config";
import { ProjectItem } from "@/common/components/dev/ProjectItem";

const Index = (props) => {
  const { posts, postCount } = props;

  return (
    <div className={`w-full md:pr-12 mb-12`}>
      <ul className="grid place-items-center gap-4 md:grid-cols-2">
        {posts?.map((post) => (
          <ProjectItem key={post.id} post={post} />
        ))}
      </ul>
    </div>
  );
};

export async function getStaticProps() {
  const from = "index";
  const props = await getGlobalData({ from });

  props.posts = props.allPages?.filter((page) => page.status === BLOG.NOTION_PROPERTY_NAME.status_publish);

  return {
    props,
    revalidate: parseInt(BLOG.NEXT_REVALIDATE_SECOND),
  };
}

export default Index;
