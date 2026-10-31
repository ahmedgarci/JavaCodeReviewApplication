import axios, {
  type InternalAxiosRequestConfig,
} from "axios";

import type { SuccessFulAuthentication } from "../../Models/AuthResponse";

// const API_URL = "http://localhost:8081/api";

const API_URL = "/api";

const publicApi = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const privateApi = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

privateApi.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      window.location.href = "/login";
      return config;
    }

    const user: SuccessFulAuthentication = JSON.parse(storedUser);

    if (!user?.token) {
      localStorage.removeItem("user");
      window.location.href = "/login";
      return config;
    }

    config.headers.Authorization = `Bearer ${user.token}`;

    return config;
  },
  (error: unknown) => {
    return Promise.reject(error);
  }
);

export default {
  publicApi,
  privateApi,
};
