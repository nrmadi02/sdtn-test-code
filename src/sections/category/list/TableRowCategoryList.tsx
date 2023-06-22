import { ActionButton, BaseButton } from "@/components/Button";
import Modal from "@/components/Modal";
import Table from "@/components/TSTableReact";
import Popover from "@/components/TSTableReact/TableAction";
import { ICategory } from "@/types";
import {
  OnChangeFn,
  PaginationState,
  createColumnHelper,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import { useBoolean } from "usehooks-ts";

interface Props {
  data: ICategory[] | undefined;
  pagination?: PaginationState | undefined;
  pageCount?: number;
  setPagination?: OnChangeFn<PaginationState> | undefined;
  isLoading?: boolean;
  onHandleDelete: (id: string) => Promise<void>;
  onHandleUpdate: (id: string) => void;
  onHandleView: (id: string) => void;
}

const TableRowCategoryList = ({
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
  const getData = (data: ICategory[]) => {
    const dataNew = data;
    return dataNew;
  };
  const dataUsers = useMemo(() => getData(data ? data : []), [data]);
  const columnHelper = createColumnHelper<ICategory>();

  const column = useMemo(
    () => [
      columnHelper.accessor("name", {
        header: "Name",
        id: "name",
      }),
      columnHelper.accessor("slug", {
        header: "Slug",
        id: "slug",
      }),
      columnHelper.accessor("_id", {
        id: "id",
        header: "",
        size: 20,
        cell: (ctx) => {
          return (
            <Popover>
              <div className="flex flex-col items-center gap-1">
                <ActionButton
                  onClick={() => onHandleUpdate(ctx.row.original.slug)}
                  icon={<MdEdit />}
                  variant="ghost"
                >
                  <p>Edit</p>
                </ActionButton>
                <ActionButton
                  onClick={() => {
                    setDeleteID(ctx.getValue());
                    setTrue();
                  }}
                  variant="red"
                  icon={<MdDelete />}
                >
                  <p>Delete</p>
                </ActionButton>
              </div>
            </Popover>
          );
        },
      }),
    ],
    [data]
  );
  return (
    <>
      <Table
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

export default TableRowCategoryList;
