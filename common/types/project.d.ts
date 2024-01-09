import ThumbnailProps from "./thumbnail";

type ProjectProps = {
  id: string;
  title: string;
  slug: string;
  repository?: string;
  site?: string;
  category: string;
  tools: string[];
  status: string;
  thumbnail: ThumbnailProps;
  date: Date;
};

export default ProjectProps;
