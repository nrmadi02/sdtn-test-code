export interface IRole {
  _id: string;
  name: string;
  permissions: string[];
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: IRole;
  avatar?: string;
  bio?: string;
  emailVerifiedAt?: null | string;
}

export interface ICategory {
  _id: string;
  name: string;
  slug: string;
}

export type StatusArticle = ""| "DRAFT" | "PUBLISHED" | "PINNED";

export interface IArticle {
  _id: string;
  title: string;
  status: StatusArticle;
  categories: string[];
  author: {
    _id: string;
    name: string;
    avatar: string;
  };
  description?: string;
  content?: string;
  createdAt: string;
  updatedAt: string;
  slug: string;
  thumbnail?: string;
}

export interface IResponseToken extends IUser {
  access_token?: string;
  refresh_token?: string;
}

export interface IResponseAuth {
  statusCode: number;
  message: string;
  data: IResponseToken;
}

export interface IListResponse<T extends object> {
  docs: T[]
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number;
}

export interface IResponseBase<T extends object> {
  statusCode: number;
  message: string;
  data: T;
}

export interface IResponseList<T extends object> {
  statusCode: number;
  message: string;
  data: IListResponse<T>
}

export interface IPaginationUser extends IPaginationParams {
  name?: string
  email?: string
  roleId?: string
}

export interface IPaginationCategory extends IPaginationParams {
  name?: string,
  slug?: string
}

export interface IPaginationArticle extends IPaginationParams {
  title?: string;
  status?: StatusArticle | string;
  categories?: string[]
  sort?: string;
  sortBy?: string
}


export interface IPaginationParams {
  limit?: number
  page?: number 
}
