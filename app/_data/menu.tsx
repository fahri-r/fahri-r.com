import { Braces, Home, Mail, User2 } from "lucide-react";
import MenuProps from "@/app/_types/menu";

const menu: MenuProps[] = [
  {
    path: "/",
    name: "Home",
    icon: <Home size={16} />,
  },
  {
    path: "/about",
    name: "About",
    icon: <User2 size={16} />,
  },
  {
    path: "/projects",
    name: "Project",
    icon: <Braces size={16} />,
  },
  {
    path: "/contact",
    name: "Contact",
    icon: <Mail size={16} />,
  },
];

export default menu;
