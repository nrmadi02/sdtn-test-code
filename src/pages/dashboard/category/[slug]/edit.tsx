import Breadcrumbs from "@/components/Breadcrumbs";
import Page from "@/components/Page";
import Layout from "@/layout";
import { PATH_DASHBOARD } from "@/routes";
import { useQuery } from "@tanstack/react-query";
import { type ReactNode } from "react";
import { useRouter } from "next/router";
import { getCategoryDetailFn } from "@/service/category";
import { FormEditCategory } from "@/sections/category/form";

const CategoryEditPage = () => {
  const { query } = useRouter();
  const { data: dataCategory, isLoading } = useQuery(
    ["detailCategory", query.slug],
    {
      queryFn: async () => await getCategoryDetailFn(String(query.slug)),
    }
  );

  return (
    <Page title="Category: Update category">
      <div className="w-full p-5">
        <Breadcrumbs
          heading="Update category"
          links={[
            {
              name: "Dashboard",
              path: PATH_DASHBOARD.root,
            },
            {
              name: "List Category",
              path: PATH_DASHBOARD.category.list,
            },
            {
              name: "Edit Category",
            },
          ]}
        />
        {isLoading ? null : (
          <FormEditCategory currentCategory={dataCategory?.data} />
        )}
      </div>
    </Page>
  );
};

CategoryEditPage.getLayout = (page: ReactNode) => {
  return <Layout>{page}</Layout>;
};

export default CategoryEditPage;
