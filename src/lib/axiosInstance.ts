import { useAuthStore } from "@/stores/authStore";
import axios from "axios";

export const AxiosInstance = axios.create({
  baseURL: " https://zantechbackend.zantechbd.com/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

AxiosInstance.interceptors.request.use(
  (config) => {
    // Only run on client side
    if (typeof window !== "undefined") {
      const token = useAuthStore.getState().token;
      if (token) {
        try {
          if (config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        } catch (err) {
          console.log("Invalid token format in localStorage", err);
        }
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);
