import Breadcrumbs from "@/components/Breadcrumbs";
import { BaseButton } from "@/components/Button";
import Page from "@/components/Page";
import TableSection from "@/components/TableSection";
import Layout from "@/layout";
import { PATH_DASHBOARD } from "@/routes";
import { TableHeaderUserList, TableRowUserList } from "@/sections/user/list";
import { deleteUserFn, getUsersListFn } from "@/service/user";
import { type IPaginationUser } from "@/types";
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

const UserList = () => {
  const { push } = useRouter();
  const { enqueueSnackbar } = useSnackbar()

  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });

  const [searchListUser, setSearchListUser] = useState<IPaginationUser>({
    email: "",
    name: "",
    roleId: "",
  });

  const searchParams = useDebounce<IPaginationUser>(
    {
      email: searchListUser.email || "",
      name: searchListUser.name || "",
      roleId: searchListUser.roleId || "",
    },
    500
  );

  const { data: dataUsers, isLoading, refetch } = useQuery(
    ["allUsers", searchParams, pageIndex, pageSize],
    {
      queryFn: async () =>
        await getUsersListFn({
          ...searchParams,
          limit: pageSize,
          page: pageIndex + 1,
        }),
    }
  );

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );

  const onChangeSelectRole = (e: ChangeEvent<HTMLSelectElement>) => {
    setSearchListUser({
      ...searchListUser,
      roleId: e.target.value,
    });
  };
  const onHandleSearchEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchListUser({
      ...searchListUser,
      email: e.target.value,
    });
  };
  const onHandleSearchName = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchListUser({
      ...searchListUser,
      name: e.target.value,
    });
  };

  const handleUpdateData = (id: string) => {
    push(PATH_DASHBOARD.user.edit(id)).catch((_) =>
      console.log("err router...")
    );
  };

  const { mutateAsync: deleteUser, isLoading: deleteLoading } = useMutation({
    mutationFn: async (data: string) => await deleteUserFn(data),
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
    await deleteUser(id)
    await refetch();
  };

  const handleViewData = (id: string) => {
    push(PATH_DASHBOARD.user.view(id)).catch((_) =>
      console.log("err router...")
    );
  };

  useEffect(() => {
    setPagination({
      pageIndex: 0,
      pageSize: 5,
    });
  }, [searchListUser]);

  return (
    <Page title="List Users">
      <div className="w-full p-5">
        <Breadcrumbs
          heading="List Users"
          links={[
            {
              name: "Dashboard",
              path: PATH_DASHBOARD.root,
            },
            {
              name: "List Users",
            },
          ]}
          action={
            <Link href={PATH_DASHBOARD.user.new}>
              <BaseButton variant="primary"> New +</BaseButton>
            </Link>
          }
        />
        <TableSection>
          <TableHeaderUserList
            onChangeSelectRole={onChangeSelectRole}
            onHandleSearchEmail={onHandleSearchEmail}
            onHandleSearchName={onHandleSearchName}
            valueEmail={searchListUser.email || ""}
            valueName={searchListUser.name || ""}
            valueRole={searchListUser.roleId || ""}
          />
          <TableRowUserList
            data={dataUsers?.data.docs}
            onHandleDelete={handleDeleteData}
            onHandleUpdate={handleUpdateData}
            onHandleView={handleViewData}
            pageCount={dataUsers?.data.totalPages}
            pagination={pagination}
            setPagination={setPagination}
            isLoading={isLoading || deleteLoading}
          />
        </TableSection>
      </div>
    </Page>
  );
};

UserList.getLayout = (page: ReactNode) => {
  return <Layout>{page}</Layout>;
};

export default UserList;
