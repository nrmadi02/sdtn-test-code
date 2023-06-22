import { PATH_DASHBOARD } from "@/routes";
import { type ReactElement } from "react";
import { AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import { MdArticle, MdCategory } from "react-icons/md";

interface navItems {
  title: string,
  path: string,
  rootPath: string,
  icon: ReactElement
}

export interface NavConfig {
  subheader: string,
  items: navItems[]
}

const navConfig: NavConfig[] = [
  {
    subheader: "General",
    items: [
      {
        title: "App",
        path: PATH_DASHBOARD.general.home,
        rootPath: PATH_DASHBOARD.general.home,
        icon: <AiOutlineHome />,
      },
    ],
  },
  {
    subheader: "Manajemen",
    items: [
      {
        title: "Users",
        path: PATH_DASHBOARD.user.list,
        rootPath: PATH_DASHBOARD.user.root,
        icon: <AiOutlineUser />,
      },
      {
        title: "Category",
        path: PATH_DASHBOARD.category.list,
        rootPath: PATH_DASHBOARD.category.root,
        icon: <MdCategory />,
      },
      {
        title: "Article",
        path: PATH_DASHBOARD.article.list,
        rootPath: PATH_DASHBOARD.article.root,
        icon: <MdArticle />,
      },
    ],
  },
];

export default navConfig