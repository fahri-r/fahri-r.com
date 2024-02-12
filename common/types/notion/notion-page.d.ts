import CategoryProps from "./category";
import PostProps from "./post";
import SiteInfoProps from "./site-info";
import ToolProps from "./tool";

type NotionPageProps = {
  allPages: PostProps[];
  categoryOptions: CategoryProps[];
  latestPosts: PostProps[];
  postCount: number;
  posts: PostProps[];
  siteInfo: SiteInfoProps;
  toolOptions: ToolProps[];
};

export default NotionPageProps;
