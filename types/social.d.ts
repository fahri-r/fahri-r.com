import { LucideIcon } from "lucide-react";
import { ReactElement } from "react";

export default interface Social {
  href: string;
  name: string;
  username?: string;
  icon: ReactElement;
}
