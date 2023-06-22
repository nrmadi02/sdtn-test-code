import { useEffect } from "react";
import { useRouter } from "next/router";
import { PATH_DASHBOARD } from "@/routes";

const Index = () => {
  const { pathname, push } = useRouter();

  useEffect(() => {
    if (pathname === PATH_DASHBOARD.article.root) {
      push(PATH_DASHBOARD.article.list).catch((_) => "err router...");
    }
  }, [pathname]);

  return null;
};

export default Index;
