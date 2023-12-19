import ThumbnailProps from "./thumbnail";

export default interface ProjectProps {
  id: string;
  title: string;
  slug: string;
  repository?: string;
  site?: string;
  category: string;
  tools: string[];
  status: string;
  thumbnail: ThumbnailProps;
}
