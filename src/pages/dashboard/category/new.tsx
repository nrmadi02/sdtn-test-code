import Breadcrumbs from "@/components/Breadcrumbs";
import Page from "@/components/Page";
import Layout from "@/layout";
import { PATH_DASHBOARD } from "@/routes";
import { type ReactNode } from "react";
import { FormNewCategory } from "@/sections/category/form";

const CategoryNewPage = () => {
  return (
    <Page title="Category: Create a new category">
      <div className="w-full p-5">
        <Breadcrumbs
          heading="Create a new category"
          links={[
            {
              name: "Dashboard",
              path: PATH_DASHBOARD.root,
            },
            {
              name: "List Categories",
              path: PATH_DASHBOARD.category.list,
            },
            {
              name: "New Category",
            },
          ]}
        />
        <FormNewCategory />
      </div>
    </Page>
  );
};

CategoryNewPage.getLayout = (page: ReactNode) => {
  return <Layout>{page}</Layout>;
};

export default CategoryNewPage;
