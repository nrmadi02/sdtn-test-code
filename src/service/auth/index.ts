import type { IResponseAuth } from "@/types";
import axios from "@/utils/axios";

export const getDetailMe = async () => {
  const res = await axios.get<IResponseAuth>("/backend/auth/me");
  return res.data;
};