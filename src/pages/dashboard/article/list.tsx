import Breadcrumbs from "@/components/Breadcrumbs";
import { BaseButton } from "@/components/Button";
import Page from "@/components/Page";
import Layout from "@/layout";
import { PATH_DASHBOARD } from "@/routes";
import { type IPaginationArticle } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { type PaginationState } from "@tanstack/react-table";
import Link from "next/link";
import { useDebounce } from "usehooks-ts";
import {
  useState,
  type ReactNode,
  useMemo,
  type ChangeEvent,
  useEffect,
} from "react";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { deleteArticleFn, getArticleListFn } from "@/service/article";
import { HeaderListArticle, ListArticle, TabListArticle } from "@/sections/article/list";

const ArticleList = () => {
  const { push } = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 6,
  });

  const [searchListArticle, setSearchListArticle] =
    useState<IPaginationArticle>({
      categories: [],
      sort: "desc",
      sortBy: "updatedAt",
      status: "",
      title: ""
    });

  const searchParams = useDebounce<IPaginationArticle>(
    {
      title: searchListArticle.title || "",
      sort: searchListArticle.sort || "",
      status: searchListArticle.status || "",
      sortBy: searchListArticle.sortBy || "",
      categories: searchListArticle.categories || [],
    },
    500
  );

  const {
    data: dataArticles,
    isLoading,
    refetch,
  } = useQuery(["allArticles", searchParams, pageIndex, pageSize], {
    queryFn: async () =>
      await getArticleListFn({
        ...searchParams,
        limit: pageSize,
        page: pageIndex + 1,
      }),
  });

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );

  const onHandleChangeTab = (e: string | undefined) => {
    setSearchListArticle({
      ...searchListArticle,
      status: e
    })
  }

  const onHandleSearchSort = (e: string) => {
     setSearchListArticle({
       ...searchListArticle,
       sort: e,
     });
  };
  const onHandleSearchTitle = (e: ChangeEvent<HTMLInputElement>) => {
     setSearchListArticle({
       ...searchListArticle,
       title: e.target.value,
     });
  };

  const onHandleSearchCategory = (e: string[]) => {
    console.log(e)
     setSearchListArticle({
       ...searchListArticle,
       categories: e,
     });
  }

  const handleUpdateData = (id:string) => {
    push(PATH_DASHBOARD.article.edit(id)).catch((_) =>
      console.log("err router...")
    );
  };

  const { mutateAsync: deleteArticle, isLoading: deleteLoading } = useMutation(
    {
      mutationFn: async (data: string) => await deleteArticleFn(data),
      onSuccess: () => {
        enqueueSnackbar("Delete success!", {
          variant: "success",
        });
      },
      onError: () => {
        enqueueSnackbar("Delete failed!", {
          variant: "error",
        });
      },
    }
  );

  const handleDeleteData = async (id: string) => {
    await deleteArticle(id);
    await refetch();
  };

  const handleViewData = (id: string) => {
    push(PATH_DASHBOARD.article.view(id)).catch((_) =>
      console.log("err router...")
    );
  };

  useEffect(() => {
    setPagination({
      pageIndex: 0,
      pageSize: 6,
    });
  }, [searchListArticle]);

  return (
    <Page title="List Article">
      <div className="w-full p-5">
        <Breadcrumbs
          heading="List Article"
          links={[
            {
              name: "Dashboard",
              path: PATH_DASHBOARD.root,
            },
            {
              name: "List Article",
            },
          ]}
          action={
            <Link href={PATH_DASHBOARD.article.new}>
              <BaseButton variant="primary"> New +</BaseButton>
            </Link>
          }
        />
        <div>
          <HeaderListArticle
            onHandleSearchCategory={onHandleSearchCategory}
            onHandleSearchSort={onHandleSearchSort}
            onHandleSearchTitle={onHandleSearchTitle}
            valueSort={searchListArticle.sort || "asc"}
            valueTitle={searchListArticle.title || ""}
          />
          <TabListArticle onHandleChangeTab={onHandleChangeTab} />
          <ListArticle
            data={dataArticles?.data.docs}
            onHandleDelete={handleDeleteData}
            onHandleUpdate={handleUpdateData}
            onHandleView={handleViewData}
            pageCount={dataArticles?.data.totalPages}
            pagination={pagination}
            setPagination={setPagination}
            isLoading={isLoading || deleteLoading}
          />
        </div>
      </div>
    </Page>
  );
};

ArticleList.getLayout = (page: ReactNode) => {
  return <Layout>{page}</Layout>;
};

export default ArticleList;
