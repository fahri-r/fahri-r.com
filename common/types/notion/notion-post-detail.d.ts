import CategoryProps from "./category";
import PostProps from "./post";
import SiteInfoProps from "./site-info";
import ToolProps from "./tool";

type NotionPageDetailProps = {
  categoryOptions: CategoryProps[];
  latestPosts: PostProps[];
  postCount: number;
  post: PostProps;
  siteInfo: SiteInfoProps;
  toolOptions: ToolProps[];
};

export default NotionPageDetailProps;
