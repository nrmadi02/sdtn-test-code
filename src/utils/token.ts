import jwtDecode from "jwt-decode";
import axiosInstance from "./axios";

 const getLocalAccessToken = () => {
  const accessToken = window.localStorage.getItem("accessToken");
  return accessToken;
}

 const getLocalRefreshToken = () => {
  const refreshToken = window.localStorage.getItem("refreshToken");
  return refreshToken;
}

const isValidToken = (accessToken: string) => {
  if (!accessToken) {
    return false;
  }
  interface expToken {
    exp: number
  }
  const decoded: expToken = jwtDecode(accessToken);
  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

const setSession = (accessToken: string | null, refreshToken:string | null) => {
 if(accessToken && refreshToken){
   localStorage.setItem("accessToken", accessToken);
   localStorage.setItem("refreshToken", refreshToken);
   axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
 } else {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
 }
};

export { getLocalAccessToken, getLocalRefreshToken, setSession, isValidToken };