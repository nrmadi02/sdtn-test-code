import { BaseButton } from "@/components/Button";
import Modal from "@/components/Modal";
import ListReactArticle from "@/components/TSListReactArticle";
import { type IArticle } from "@/types";
import {
   type OnChangeFn,
  type PaginationState,
  createColumnHelper,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { useBoolean } from "usehooks-ts";
import ArticleCard from "./card/ArticleCard";
import { getAllCategoryFn } from "@/service/category";
import { useQuery } from "@tanstack/react-query";

interface Props {
  data: IArticle[] | undefined;
  pagination?: PaginationState | undefined;
  pageCount?: number;
  setPagination?: OnChangeFn<PaginationState> | undefined;
  isLoading?: boolean;
  onHandleDelete: (id: string) => Promise<void>;
  onHandleUpdate: (id: string) => void;
  onHandleView: (id: string, slug: string) => void;
}

const ListArticle = ({
  data,
  setPagination,
  pagination,
  pageCount,
  isLoading,
  onHandleDelete,
  onHandleUpdate,
  onHandleView,
}: Props) => {
  const { setFalse, setTrue, value } = useBoolean(false);
  const [deleteID, setDeleteID] = useState("");
  const getData = (data: IArticle[]) => {
    const dataNew = data;
    return dataNew;
  };
  const dataUsers = useMemo(() => getData(data ? data : []), [data]);
  const columnHelper = createColumnHelper<IArticle>();

  const { data: dataCategories } = useQuery(
    ["AllCategories"],
    {
      queryFn: async () => await getAllCategoryFn(),
    }
  );

  const column = useMemo(
    () => [
      columnHelper.accessor("_id", {
        id: "id",
        header: "",
        size: 20,
        cell: (ctx) => {
          return (
            <ArticleCard
              onHandleView={onHandleView}
              categories={dataCategories?.data.docs}
              setTrue={setTrue}
              setDeleteID={setDeleteID}
              onHandleUpdate={onHandleUpdate}
              article={ctx.row.original}
            />
          );
        },
      }),
    ],

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data, dataCategories]
  );
  return (
    <>
      <ListReactArticle
        data={dataUsers}
        pageCount={pageCount}
        pagination={pagination}
        setPagination={setPagination}
        columns={column}
        isLoading={isLoading}
        thLength={column.length}
      />
      <Modal
        closeModal={setFalse}
        isOpen={value}
        openModal={setTrue}
        title={"Delete user"}
      >
        <div className="mt-2">
          <p className="text-sm text-gray-500">
            Are you sure to delete category ?
          </p>
        </div>
        <div className="mt-4 flex flex-row items-center gap-3">
          <BaseButton
            isLoading={isLoading}
            disabled={isLoading}
            variant="red"
            onClick={async () => {
              try {
                await onHandleDelete(deleteID);
                setFalse();
              } catch (error) {
                console.log(error);
              }
            }}
          >
            Yes
          </BaseButton>
          <BaseButton variant="ghost" onClick={setFalse}>
            Cancel
          </BaseButton>
        </div>
      </Modal>
    </>
  );
};

export default ListArticle;
