import Page from "@/components/Page";
import Layout from "@/layout";
import { useQuery } from "@tanstack/react-query";
import { type ReactNode } from "react";
import { useRouter } from "next/router";
import { getArticleDetailFn } from "@/service/article";
import { BaseButton } from "@/components/Button";
import Markdown from "@/components/Markdown";
import Spinner from "@/components/Spinner";
import { StatusArticle } from "@/types";

const getBadgeStatus = (status: StatusArticle) => {
  type typeOption = {
    [x: string]: ReactNode;
  };
  const ItemStatus: typeOption = {
    DRAFT: (
      <span className="rounded-md bg-gray-200  px-1 py-[2px] text-[12px] font-bold text-gray-600">
        {status}
      </span>
    ),
    PUBLISHED: (
      <span className="rounded-md bg-green-200 px-1 py-[2px] text-[12px] font-bold text-green-600">
        {status}
      </span>
    ),
    PINNED: (
      <span className="rounded-md bg-blue-200 px-1 py-[2px] text-[12px] font-bold text-blue-600">
        {status}
      </span>
    ),
  };

  return ItemStatus[status];
};

const ArticleViewPage = () => {
  const { query } = useRouter();
  const { back } = useRouter();
  const { data: dataArticle, isLoading } = useQuery(
    ["detailArticle", query.id],
    {
      queryFn: async (ctx) => await getArticleDetailFn(String(query.id)),
    }
  );

  return (
    <Page title="Article: Update article">
      <div className="mx-auto flex w-full max-w-5xl flex-col p-5 pb-20">
        <div className="flex w-full flex-row items-center justify-between">
          <BaseButton
            onClick={() => back()}
            className="max-w-max"
            variant="ghost"
          >{`< Back`}</BaseButton>
          {getBadgeStatus(dataArticle?.data.status || "")}
        </div>
        {isLoading ? (
          <div className="flex h-[300px] w-full flex-row items-center justify-center p-5">
            <Spinner />
            <p>Loading...</p>
          </div>
        ) : (
          <div className="mt-8 w-full">
            <div className="relative w-full">
              <h1 className="absolute left-8 md:left-16 top-[50px] md:top-[100px] z-50 max-w-[300px] md:max-w-[400px] text-[20px] md:text-[40px] font-bold text-white">
                {dataArticle?.data.title}
              </h1>
              <img
                alt="_images"
                className="h-auto w-full overflow-hidden brightness-50"
                src={dataArticle?.data.thumbnail}
              />
            </div>
            <div className="mt-10 text-center">
              <p>{dataArticle?.data.description}</p>
            </div>
            <Markdown>{dataArticle?.data.content || ""}</Markdown>
          </div>
        )}
      </div>
    </Page>
  );
};

ArticleViewPage.getLayout = (page: ReactNode) => {
  return <Layout>{page}</Layout>;
};

export default ArticleViewPage;
