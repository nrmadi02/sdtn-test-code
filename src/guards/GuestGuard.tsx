import { useState, useEffect, type ReactNode } from "react";

import { useRouter } from "next/router";
import useAuth from "@/hooks/useAuth";
import LoadingScreen from "@/components/LoadingScreen";
import { PATH_DASHBOARD } from "@/routes";

interface Props {
  children: ReactNode;
}

const GuestGuard = ({ children }: Props) => {
  const { push } = useRouter();

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      push(PATH_DASHBOARD.root).catch(_ => "error router...");
    }
  }, [isAuthenticated]);

  return <>{children}</>;
};

export default GuestGuard;
