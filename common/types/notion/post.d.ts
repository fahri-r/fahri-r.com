import ToolProps from "./tool";
import { ExtendedRecordMap } from "notion-types";

type PostProps = {
  category: string;
  description: string;
  date: {
    start_date: string;
  };
  fullWidth: boolean;
  id: string;
  lastEditedDate: string;
  lastEditedDay: string;
  pageCover: string;
  pageCoverThumbnail: string;
  pageIcon: string;
  publishDate: number;
  publishDay: number;
  repository: string;
  site: string;
  slug: string;
  status: string;
  title: string;
  toolItems: ToolProps[];
  tools: string[];
  blockMap: ExtendedRecordMap;
};

export default PostProps;
