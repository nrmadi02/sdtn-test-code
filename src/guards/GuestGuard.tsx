import { useEffect, type ReactNode } from "react";

import { useRouter } from "next/router";
import useAuth from "@/hooks/useAuth";
import { PATH_DASHBOARD } from "@/routes";

interface Props {
  children: ReactNode;
}

const GuestGuard = ({ children }: Props) => {
  const { push } = useRouter();

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      push(PATH_DASHBOARD.root).catch((_) => "error router...");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return <>{children}</>;
};

export default GuestGuard;
