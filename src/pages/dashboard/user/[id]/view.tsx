import Breadcrumbs from "@/components/Breadcrumbs";
import Page from "@/components/Page";
import Layout from "@/layout";
import { PATH_DASHBOARD } from "@/routes";
import { getUserDetailFn } from "@/service/user";
import { useQuery } from "@tanstack/react-query";
import { type ReactNode } from "react";
import { useRouter } from "next/router";
import { ViewUserSection } from "@/sections/user/view";

const UserViewPage = () => {
  const { query } = useRouter();
  const { data: dataUser, isLoading } = useQuery(["detailUser", query.id], {
    queryFn: async () => await getUserDetailFn(String(query.id)),
  });

  return (
    <Page title="User: View user">
      <div className="w-full p-5">
        <Breadcrumbs
          heading="View User"
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
              name: "View User",
            },
          ]}
        />
        {isLoading ? null : <ViewUserSection user={dataUser?.data} />}
      </div>
    </Page>
  );
};

UserViewPage.getLayout = (page: ReactNode) => {
  return <Layout>{page}</Layout>;
};

export default UserViewPage;
