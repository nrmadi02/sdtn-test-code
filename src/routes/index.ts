const path = (root: string, sublink: string) => {
  return `${root}${sublink}`;
};

const ROOTS_AUTH = "/auth";
const ROOTS_DASHBOARD = "/dashboard";

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, "/login"),
  register: path(ROOTS_AUTH, "/register"),
  resetPassword: path(ROOTS_AUTH, "/reset-password"),
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    home: path(ROOTS_DASHBOARD, "/home"),
  },
  user: {
    root: path(ROOTS_DASHBOARD, `/user`),
    list: path(ROOTS_DASHBOARD, `/user/list`),
    new: path(ROOTS_DASHBOARD, `/user/new`),
    edit: (id: string) => path(ROOTS_DASHBOARD, `/user/${id}/edit`),
    view: (id: string) => path(ROOTS_DASHBOARD, `/user/${id}/view`),
  },
  category: {
    root: path(ROOTS_DASHBOARD, `/category`),
    list: path(ROOTS_DASHBOARD, `/category/list`),
    new: path(ROOTS_DASHBOARD, `/category/new`),
    edit: (slug: string) => path(ROOTS_DASHBOARD, `/category/${slug}/edit`),
    view: (id: string) => path(ROOTS_DASHBOARD, `/category/${id}/view`),
  },
  article: {
    root: path(ROOTS_DASHBOARD, `/article`),
    list: path(ROOTS_DASHBOARD, `/article/list`),
    new: path(ROOTS_DASHBOARD, `/article/new`),
    edit: (id: string) => path(ROOTS_DASHBOARD, `/article/${id}/edit`),
    view: (id: string, slug: string) => path(ROOTS_DASHBOARD, `/article/${id}/view`),
  },
};
