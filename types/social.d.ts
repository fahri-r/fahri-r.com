import { LucideIcon } from "lucide-react";
import { ReactElement } from "react";

export default interface SocialProps {
  href: string;
  name: string;
  username?: string;
  icon: ReactElement;
}
