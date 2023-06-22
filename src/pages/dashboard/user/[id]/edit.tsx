import Breadcrumbs from "@/components/Breadcrumbs";
import Page from "@/components/Page";
import Layout from "@/layout";
import { PATH_DASHBOARD } from "@/routes";
import { getUserDetailFn } from "@/service/user";
import { useQuery } from "@tanstack/react-query";
import { type ReactNode } from "react";
import { FormEditUser } from "@/sections/user/form";
import { useRouter } from "next/router";

const UserEditPage = () => {
  const { query } = useRouter();
  const { data: dataUser, isLoading } = useQuery(["detailUser", query.id], {
    queryFn: async (ctx) => await getUserDetailFn(String(query.id)),
  });

  return (
    <Page title="User: Update user">
      <div className="w-full p-5">
        <Breadcrumbs
          heading="Update User"
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
              name: "Edit User",
            },
          ]}
        />
        {isLoading ? null : <FormEditUser currentUser={dataUser?.data} />}
      </div>
    </Page>
  );
};

UserEditPage.getLayout = (page: ReactNode) => {
  return <Layout>{page}</Layout>;
};

export default UserEditPage;
