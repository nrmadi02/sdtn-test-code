import { useState, useEffect, type ReactNode } from "react";

import { useRouter } from "next/router";
import useAuth from "@/hooks/useAuth";
import LoadingScreen from "@/components/LoadingScreen";
import Login from "@/pages/auth/login";

interface Props {
  children: ReactNode;
}

const AuthGuard = ({ children }: Props) => {
  const { isAuthenticated, isInitialized } = useAuth();

  const { pathname, push } = useRouter();

  const [requestedLocation, setRequestedLocation] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (requestedLocation && pathname !== requestedLocation) {
      setRequestedLocation(null);
      push(requestedLocation).catch((_) => console.log("err route.."));
    }
  }, [pathname, push, requestedLocation]);

  if (!isInitialized) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return <Login />;
  }

  return <>{children}</>;
};

export default AuthGuard;
