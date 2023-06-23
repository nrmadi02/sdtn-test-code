import { useEffect } from "react";
import { useRouter } from "next/router";
import { PATH_DASHBOARD } from "@/routes";

const Index = () => {
  const { pathname, push } = useRouter();

  useEffect(() => {
    if (pathname === PATH_DASHBOARD.user.root) {
      push(PATH_DASHBOARD.user.list).catch((_) => "err router...");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return null;
};

export default Index