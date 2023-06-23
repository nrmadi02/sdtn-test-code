import { type ReactNode } from "react";
import NavbarVertival from "./navbar/NavbarVertical";
import HeaderDashboard from "./header";

interface Props {
  children: ReactNode;
}

const Dashboard = ({ children }: Props) => {
  return (
    <div className="flex h-screen w-full overflow-auto overflow-x-hidden">
      <div className="relative flex h-full w-full flex-row">
        <NavbarVertival />
        <div className="h-full w-full overflow-auto">
          <HeaderDashboard />
          {children}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
