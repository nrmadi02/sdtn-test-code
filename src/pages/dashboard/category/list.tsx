import Breadcrumbs from "@/components/Breadcrumbs";
import { BaseButton } from "@/components/Button";
import Page from "@/components/Page";
import TableSection from "@/components/TableSection";
import Layout from "@/layout";
import { PATH_DASHBOARD } from "@/routes";
import { type IPaginationCategory } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { type PaginationState } from "@tanstack/react-table";
import Link from "next/link";
import {useDebounce } from "usehooks-ts";
import {
  useState,
  type ReactNode,
  useMemo,
  type ChangeEvent,
  useEffect,
} from "react";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { deleteCategoryFn, getCategoryListFn } from "@/service/category";
import { TableHeaderCategoryList, TableRowCategoryList } from "@/sections/category/list";

const CategoryList = () => {
  const { push } = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });

  const [searchListCategory, setSearchListCategory] = useState<IPaginationCategory>({
    name: "",
    slug: "",
  });

  const searchParams = useDebounce<IPaginationCategory>(
    {
      slug: searchListCategory.slug || "",
      name: searchListCategory.name || "",
    },
    500
  );

  const {
    data: dataCategories,
    isLoading,
    refetch,
  } = useQuery(["allCategories", searchParams, pageIndex, pageSize], {
    queryFn: async () =>
      await getCategoryListFn({
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


  const onHandleSearchSlug = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchListCategory({
      ...searchListCategory,
      slug: e.target.value,
    });
  };
  const onHandleSearchName = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchListCategory({
      ...searchListCategory,
      name: e.target.value,
    });
  };

  const handleUpdateData = (slug: string) => {
    push(PATH_DASHBOARD.category.edit(slug)).catch((_) =>
      console.log("err router...")
    );
  };

  const { mutateAsync: deleteCategory, isLoading: deleteLoading } =
    useMutation({
      mutationFn: async (data: string) => await deleteCategoryFn(data),
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
    });

  const handleDeleteData = async (id: string) => {
    await deleteCategory(id);
    await refetch();
  };

  const handleViewData = (id: string) => {
    console.log(id);
  };

  useEffect(() => {
    setPagination({
      pageIndex: 0,
      pageSize: 5,
    });
  }, [searchListCategory]);

  return (
    <Page title="List Category">
      <div className="w-full p-5">
        <Breadcrumbs
          heading="List Category"
          links={[
            {
              name: "Dashboard",
              path: PATH_DASHBOARD.root,
            },
            {
              name: "List Category",
            },
          ]}
          action={
            <Link href={PATH_DASHBOARD.category.new}>
              <BaseButton variant="primary"> New +</BaseButton>
            </Link>
          }
        />
        <TableSection>
          <TableHeaderCategoryList
            onHandleSearchSlug={onHandleSearchSlug}
            onHandleSearchName={onHandleSearchName}
            valueSlug={searchListCategory.slug || ""}
            valueName={searchListCategory.name || ""}
          />
          <TableRowCategoryList
            data={dataCategories?.data.docs}
            onHandleDelete={handleDeleteData}
            onHandleUpdate={handleUpdateData}
            onHandleView={handleViewData}
            pageCount={dataCategories?.data.totalPages}
            pagination={pagination}
            setPagination={setPagination}
            isLoading={isLoading || deleteLoading}
          />
        </TableSection>
      </div>
    </Page>
  );
};

CategoryList.getLayout = (page: ReactNode) => {
  return <Layout>{page}</Layout>;
};

export default CategoryList;
