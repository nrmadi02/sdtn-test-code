import Breadcrumbs from "@/components/Breadcrumbs";
import Page from "@/components/Page";
import Layout from "@/layout";
import { PATH_DASHBOARD } from "@/routes";
import { type ReactNode } from "react";
import { FormNewUser } from "@/sections/user/form";

const UserNewPage = () => {
  return (
    <Page title="Users: Create a new user">
      <div className="w-full p-5">
        <Breadcrumbs
          heading="Create a new user"
          links={[
            {
              name: "Dashboard",
              path: PATH_DASHBOARD.root,
            },
            {
              name: "List Users",
              path: PATH_DASHBOARD.user.list,
            },
            {
              name: "New User",
            },
          ]}
        />
        <FormNewUser />
      </div>
    </Page>
  );
};

UserNewPage.getLayout = (page: ReactNode) => {
  return <Layout>{page}</Layout>;
};

export default UserNewPage;
