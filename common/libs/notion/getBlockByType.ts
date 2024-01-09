import { NotionMap, Block } from "notion-types";

interface getBlockByTypeProps {
  block: NotionMap<Block>;
  type: string;
}

const getBlockByType = ({ block, type }: getBlockByTypeProps) => {
  return Object.entries(block).filter((x) => x[1].value.type === type);
};

export default getBlockByType;
