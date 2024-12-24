import { STORAGE_KEY } from "@/constants";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
// import { refreshTokenApi } from "./apiRefetchToken";

let isRefreshing = false;
let failedQueue: any[] = [];

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 20000,
});

axiosClient.interceptors.request.use(
  function (config: AxiosRequestConfig): any {
    const token = localStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    config.headers = config.headers || {};
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    console.log(
      "::REQUEST::",
      config.baseURL,
      config.url,
      config.data || "",
      config.params || ""
    );

    return config;
  },
  function (error: AxiosError) {
    return Promise.reject(error);
  }
);

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// axiosClient.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response?.status === 401 && !originalRequest._retry) {
//       if (isRefreshing) {
//         return new Promise((resolve, reject) => {
//           failedQueue.push({ resolve, reject });
//         })
//           .then((token) => {
//             originalRequest.headers["Authorization"] = `Bearer ${token}`;
//             return axiosClient(originalRequest);
//           })
//           .catch((err) => Promise.reject(err));
//       }
//       originalRequest._retry = true;
//       isRefreshing = true;
//       try {
//         const refresh_token = localStorage.getItem("refresh_token");
//         if (!refresh_token) {
//           return Promise.reject(error);
//         }
//         const response = await refreshTokenApi({ refresh_token });

//         if (response?.access_token) {
//           const access_token = response.access_token;
//           localStorage.setItem("access_token", access_token);
//           processQueue(null, access_token);
//           originalRequest.headers = originalRequest.headers || {};
//           originalRequest.headers["Authorization"] = `Bearer ${access_token}`;
//           window.location.reload();
//           return axiosClient(originalRequest);
//         }
//       } catch (refreshError) {
//         processQueue(refreshError, null);
//         return Promise.reject(refreshError);
//       } finally {
//         isRefreshing = false;
//       }
//     }
//     return Promise.reject(error);
//   },
// );

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response: AxiosResponse) {
    return response?.data;
  },
  function (error: AxiosError) {
    console.error(
      JSON.stringify(error.response?.data, null, 2),
      error,
      "ERROR RESPONSE"
    );
    return Promise.reject(error.response?.data);
  }
);

export default axiosClient;
