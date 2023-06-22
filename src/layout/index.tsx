import AuthGuard from "@/guards/AuthGuard";
import type { ReactNode } from "react"
import Dashboard from "./dashboard";

type Props = {
  variant?: "main" | "dashboard",
  children: ReactNode
}

const Layout = ({children, variant="dashboard"}: Props) => {
    if (variant === "main") {
      return <div>{children}</div>;
    }

    return (
      <AuthGuard>
        <Dashboard>
          <div className="container mx-auto">{children}</div>
        </Dashboard>
      </AuthGuard>
    );
}

export default Layout