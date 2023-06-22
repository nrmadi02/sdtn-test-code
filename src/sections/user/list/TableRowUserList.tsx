import { ActionButton, BaseButton } from "@/components/Button";
import Modal from "@/components/Modal";
import Table from "@/components/TSTableReact";
import Popover from "@/components/TSTableReact/TableAction";
import { IUser } from "@/types";
import {
  OnChangeFn,
  PaginationState,
  createColumnHelper,
} from "@tanstack/react-table";
import moment from "moment";
import { useMemo, useState } from "react";
import { IoMdEye } from "react-icons/io";
import { MdEdit, MdDelete } from "react-icons/md";
import { useBoolean } from "usehooks-ts";

interface Props {
  data: IUser[] | undefined;
  pagination?: PaginationState | undefined;
  pageCount?: number;
  setPagination?: OnChangeFn<PaginationState> | undefined;
  isLoading?: boolean;
  onHandleDelete: (id: string) => Promise<void>;
  onHandleUpdate: (id: string) => void;
  onHandleView: (id: string) => void;
}

const TableRowUserList = ({
  data,
  setPagination,
  pagination,
  pageCount,
  isLoading,
  onHandleDelete,
  onHandleUpdate,
  onHandleView
}: Props) => {
  const { setFalse, setTrue, value } = useBoolean(false);
  const [deleteID, setDeleteID] = useState("")
  const getData = (data: IUser[]) => {
    const dataNew = data;
    return dataNew;
  };
  const dataUsers = useMemo(() => getData(data ? data : []), [data]);
  const columnHelper = createColumnHelper<IUser>();

  const column = useMemo(
    () => [
      columnHelper.accessor("name", {
        header: "Name",
        id: "name",
        cell: (ctx) => {
          return <UserProfile data={ctx.row.original} />;
        },
      }),
      columnHelper.accessor("bio", {
        header: "Bio",
        id: "bio",
      }),
      columnHelper.accessor("role.name", {
        header: "Role",
        id: "role",
        cell: (ctx) => {
          return <p className="text-center">{ctx.getValue()}</p>;
        },
      }),
      columnHelper.accessor("emailVerifiedAt", {
        header: "Email Verified",
        id: "emailVerifiedAt",
        cell: (ctx) => {
          return ctx.row.original.emailVerifiedAt ? (
            <div className="flex flex-col items-center gap-[3px]">
              <span className="rounded-md bg-green-100 px-2 font-bold text-green-600">
                Verified
              </span>
              <p className="text-center text-[12px]">
                {moment(ctx.row.original.emailVerifiedAt).format(
                  "ddd, DD/MM/YYYY"
                )}
              </p>
            </div>
          ) : (
            <p className="text-center">-</p>
          );
        },
      }),
      columnHelper.accessor('_id', {
        id: "id",
        header: "",
        size: 20,
        cell: (ctx) => {
          return (
            <Popover>
              <div className="flex flex-col items-center gap-1">
                <ActionButton
                  onClick={() => onHandleView(ctx.getValue())}
                  icon={<IoMdEye />}
                  variant="ghost"
                  className="text-white"
                >
                  <p>View</p>
                </ActionButton>
                <ActionButton
                  onClick={() => onHandleUpdate(ctx.row.original._id)}
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
            Are you sure to delete user ?
          </p>
        </div>
        <div className="mt-4 flex flex-row items-center gap-3">
          <BaseButton isLoading={isLoading} disabled={isLoading} variant="red" onClick={async () => {
            try {
              await onHandleDelete(deleteID);
              setFalse()
            } catch (error) {
              console.log(error)
            }
          }}>Yes</BaseButton>
          <BaseButton variant="ghost" onClick={setFalse}>
            Cancel
          </BaseButton>
        </div>
      </Modal>
    </>
  );
};

export default TableRowUserList;

interface PropsUserProfile {
  data: IUser;
}

const UserProfile = ({ data }: PropsUserProfile) => {
  return (
    <div className="flex flex-row items-center gap-3 p-3">
      <img
        className="rounded-full h-[35px] w-[35px]"
        src={
          data.avatar
            ? data.avatar !== "string"
              ? data.avatar
              : `https://ui-avatars.com/api/?name=${data.name
                  .split(" ")
                  .join("+")}`
            : `https://ui-avatars.com/api/?name=${data.name
                .split(" ")
                .join("+")}`
        }
        alt="_image"
      />
      <div className="flex flex-col">
        <p>{data.name}</p>
        <p className="text-[12px] font-semibold text-gray-400">{data.email}</p>
      </div>
    </div>
  );
};
