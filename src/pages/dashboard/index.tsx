import { useEffect } from "react";
import { useRouter } from "next/router";
import { PATH_DASHBOARD } from "@/routes";

const Index = () => {
  const { pathname, replace, prefetch } = useRouter();

  useEffect(() => {
    if (pathname === PATH_DASHBOARD.root) {
      replace(PATH_DASHBOARD.general.home).catch(_ => "err router...");
    }
  }, [pathname]);

  useEffect(() => {
    prefetch(PATH_DASHBOARD.general.home).catch((_) => "err router...");
  }, []);

  return null;
};

export default Index