import { Braces, Home, MessageCircle } from "lucide-react";
import MenuProps from "@/common/types/menu";

const menu: MenuProps[] = [
  {
    path: "/",
    name: "Home",
    icon: <Home size={20} />,
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
];

export default menu;
