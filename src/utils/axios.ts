import axios, { type AxiosError, type AxiosRequestConfig } from "axios";
import { getLocalAccessToken, getLocalRefreshToken, setSession } from "./token";
import type { IResponseAuth } from "@/types";

const axiosInstance = axios.create({
  baseURL: "/",
  headers: {
    "Content-Type": "application/json",
  },
});

const refreshToken = async () => {
  const res = await axiosInstance.post<IResponseAuth>("/backend/auth/refresh", {
    refreshToken: getLocalRefreshToken(),
  });

  return res;
};

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getLocalAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const errAxios = err as AxiosError
    const originalConfig = errAxios.config as AxiosRequestConfig;

    if (errAxios.response) {
      if (errAxios.response.status === 401) {
        try {
          const rs = await refreshToken();
          const { access_token, refresh_token } = rs.data.data;
          setSession(String(access_token), String(refresh_token));

          return axiosInstance(originalConfig);
        } catch (_error) {
          if (axios.isAxiosError(_error)) {
            location.reload();
            if (_error.response && _error.response.data) {
              return Promise.reject(_error.response.data);
            }
            return Promise.reject(_error);
          }
          
        }
      }

      if (errAxios.response.status === 403 && errAxios.response.data) {
        return Promise.reject(errAxios.response.data);
      }
    }

    return Promise.reject(errAxios);
  }
);

export default axiosInstance;
