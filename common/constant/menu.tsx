import { Braces, Home, Mail, MessageCircle, User2 } from "lucide-react";
import MenuProps from "@/common/types/menu";

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
    path: "/chat",
    name: "Chat",
    icon: <MessageCircle size={20} />,
  },
  {
    path: "/contact",
    name: "Contact",
    icon: <Mail size={20} />,
  },
];

export default menu;
