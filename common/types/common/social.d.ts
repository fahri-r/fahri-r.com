import { LucideIcon } from "lucide-react";
import { ReactElement } from "react";

type SocialProps = {
  href: string;
  name: string;
  username?: string;
  icon: ReactElement;
};

export default SocialProps;
