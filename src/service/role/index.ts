import type { IResponseBase, IRole } from "@/types";
import axios from "@/utils/axios";

export const getRoleListFn = async () => {
  const res = await axios.get<IResponseBase<IRole[]>>("/backend/roles");
  return res.data;
};
