import { Braces, Home, Mail, User2 } from "lucide-react";
import MenuProps from "@/types/menu";

const menu: MenuProps[] = [
  {
    path: "/",
    name: "Home",
    icon: <Home size={20} />,
  },
  {
    path: "/about",
    name: "About",
    icon: <User2 size={20} />,
  },
  {
    path: "/projects",
    name: "Projects",
    icon: <Braces size={20} />,
  },
  {
    path: "/contact",
    name: "Contact",
    icon: <Mail size={20} />,
  },
];

export default menu;
