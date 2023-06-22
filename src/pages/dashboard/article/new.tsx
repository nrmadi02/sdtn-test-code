import Breadcrumbs from "@/components/Breadcrumbs";
import Page from "@/components/Page";
import Layout from "@/layout";
import { PATH_DASHBOARD } from "@/routes";
import { FormNewArticle } from "@/sections/article/form";
import { type ReactNode } from "react";

const ArticleNewPage = () => {
  return (
    <Page title="Article: Create a new article">
      <div className="w-full p-5">
        <Breadcrumbs
          heading="Create a new article"
          links={[
            {
              name: "Dashboard",
              path: PATH_DASHBOARD.root,
            },
            {
              name: "List Articles",
              path: PATH_DASHBOARD.article.list,
            },
            {
              name: "New Article",
            },
          ]}
        />
        <FormNewArticle />
      </div>
    </Page>
  );
};

ArticleNewPage.getLayout = (page: ReactNode) => {
  return <Layout>{page}</Layout>;
};

export default ArticleNewPage;
