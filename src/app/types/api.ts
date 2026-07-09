import axios, {
  type InternalAxiosRequestConfig,
  type AxiosError,
} from "axios";
const API_URL = import.meta.env.VITE_API_URL;
const API = axios.create({
  baseURL: API_URL,
});

API.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = localStorage.getItem("token");

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

API.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {

    if (error.response?.status === 403) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }

    const data = error.response?.data as
      | {
          message?: string;
          error?: string;
        }
      | undefined;

    const message =
      data?.message ??
      data?.error ??
      error.message ??
      "Ocurrió un error inesperado.";

    return Promise.reject(new Error(message));
  }
);

export default API;