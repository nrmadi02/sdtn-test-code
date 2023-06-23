import type { ArticleEditSchema, ArticleNewSchema } from "@/schema/article.schema";
import type {
  IArticle,
  IPaginationArticle,
  IResponseBase,
  IResponseList,
} from "@/types";
import axios from "@/utils/axios";

const getCategoriesArticle = (data: string[]) => {
  const dataArr = data.map((item) => {
    return `categories=${item}`;
  });

  return dataArr.join("&");
};

export const getArticleListFn = async ({
  limit,
  page,
  categories,
  sort = "asc",
  sortBy = "updatedAt",
  status,
  title,
}: IPaginationArticle) => {
  const res = await axios.get<IResponseList<IArticle>>(
    `/backend/articles?page=${page || 1}&limit=${
      limit || 6
    }&sort=${sort}&${getCategoriesArticle(
      categories || []
    )}&sortBy=${sortBy}&status=${status || ""}&title=${title || ""}`
  );
  return res.data;
};

export const getArticleDetailFn = async (id: string) => {
  const res = await axios.get<IResponseBase<IArticle>>(
    `/backend/articles/${id}`
  );
  return res.data;
};

export const deleteArticleFn = async (id: string) => {
  const res = await axios.delete<IResponseBase<IArticle>>(
    `/backend/articles/${id}`
  );
  return res.data;
};

export const addNewArticleFn = async (data: ArticleNewSchema) => {
  const res = await axios.post<IResponseBase<IArticle>>(
    `/backend/articles`,
    data
  );
  return res.data;
};

export const editArticleFn = async (data: ArticleEditSchema) => {
  const res = await axios.patch<IResponseBase<IArticle>>(
    `/backend/articles`,
    data
  );
  return res.data;
};
