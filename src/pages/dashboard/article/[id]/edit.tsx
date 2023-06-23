import Breadcrumbs from "@/components/Breadcrumbs";
import Page from "@/components/Page";
import Layout from "@/layout";
import { PATH_DASHBOARD } from "@/routes";
import { useQuery } from "@tanstack/react-query";
import { type ReactNode } from "react";
import { useRouter } from "next/router";
import { getArticleDetailFn } from "@/service/article";
import { FormEditArticle } from "@/sections/article/form";

const ArticleEditPage = () => {
  const { query } = useRouter();
  const { data: dataArticle, isLoading } = useQuery(
    ["detailArticle", query.id],
    {
      queryFn: async () => await getArticleDetailFn(String(query.id)),
    }
  );

  return (
    <Page title="Article: Update article">
      <div className="w-full p-5">
        <Breadcrumbs
          heading="Update article"
          links={[
            {
              name: "Dashboard",
              path: PATH_DASHBOARD.root,
            },
            {
              name: "List Article",
              path: PATH_DASHBOARD.article.list,
            },
            {
              name: "Edit Article",
            },
          ]}
        />
        {isLoading ? null : (
        //   <FormEditCategory currentCategory={dataCategory?.data} />
        <FormEditArticle currentArticle={dataArticle?.data} />
        )}
      </div>
    </Page>
  );
};

ArticleEditPage.getLayout = (page: ReactNode) => {
  return <Layout>{page}</Layout>;
};

export default ArticleEditPage;
