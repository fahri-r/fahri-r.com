import { Braces, Home, MessageCircle } from "lucide-react";
import MenuProps from "@/common/types/menu";

const menu: MenuProps[] = [
  {
    path: "/",
    name: "Home",
    icon: "house",
  },
  {
    path: "/projects",
    name: "Projects",
    icon: "cpu",
  },
  {
    path: "/chat",
    name: "Guest Book",
    icon: "book-text",
  },
];

export default menu;
