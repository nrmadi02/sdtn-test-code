import type {
  CategoryEditSchema,
  CategoryNewSchema,
} from "@/schema/category.schema";
import type {
  ICategory,
  IPaginationCategory,
  IResponseBase,
  IResponseList,
} from "@/types";
import axios from "@/utils/axios";

export const getCategoryListFn = async ({
  limit,
  page,
  slug = "",
  name = "",
}: IPaginationCategory) => {
  const res = await axios.get<IResponseList<ICategory>>(
    `/backend/categories?page=${page || 1}&limit=${
      limit || 5
    }&name=${name}&slug=${slug}`
  );
  return res.data;
};

export const getAllCategoryFn = async () => {
  const res = await axios.get<IResponseList<ICategory>>(`/backend/categories`);
  return res.data;
};

export const getCategoryDetailFn = async (id: string) => {
  const res = await axios.get<IResponseBase<ICategory>>(
    `/backend/categories/${id}`
  );
  return res.data;
};

export const deleteCategoryFn = async (id: string) => {
  const res = await axios.delete<IResponseBase<ICategory>>(
    `/backend/categories/${id}`
  );
  return res.data;
};

export const addNewCategoryFn = async (data: CategoryNewSchema) => {
  const res = await axios.post<IResponseBase<ICategory>>(
    `/backend/categories`,
    data
  );
  return res.data;
};

export const editCategoryFn = async (data: CategoryEditSchema) => {
  const res = await axios.patch<IResponseBase<ICategory>>(
    `/backend/categories`,
    data
  );
  return res.data;
};
