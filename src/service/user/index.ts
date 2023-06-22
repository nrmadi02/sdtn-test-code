import { UserEditSchema, UserNewSchema } from "@/schema/user.shcema";
import type { IPaginationUser, IResponseBase, IResponseList, IUser } from "@/types";
import axios from "@/utils/axios";

export const getUsersListFn = async ({
  limit,
  page,
  email = "",
  name = "",
  roleId = "",
}: IPaginationUser) => {
  const res = await axios.get<IResponseList<IUser>>(
    `/backend/users?page=${page || 1}&limit=${
      limit || 5
    }&name=${name}&roleId=${roleId}&email=${email}`
  );
  return res.data;
};

export const getUserDetailFn = async (id: string) => {
  const res = await axios.get<IResponseBase<IUser>>(`/backend/users/${id}`);
  return res.data;
};

export const deleteUserFn = async (id: string) => {
  const res = await axios.delete<IResponseBase<IUser>>(`/backend/users/${id}`);
  return res.data;
};

export const addNewUserFn = async (data: UserNewSchema) => {
  const res = await axios.post<IResponseBase<IUser>>(`/backend/users`, data);
  return res.data;
};

export const editUserFn = async (data: UserEditSchema) => {
  const res = await axios.patch<IResponseBase<IUser>>(`/backend/users`, data);
  return res.data;
};
