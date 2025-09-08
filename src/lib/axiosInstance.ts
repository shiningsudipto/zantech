import axios from "axios";

export const AxiosInstance = axios.create({
  baseURL: "https://zantechbackend.desklago.com/api",
});

AxiosInstance.interceptors.request.use(
  (config) => {
    // Only run on client side
    if (typeof window !== "undefined") {
      const auth = localStorage.getItem("auth-storage-zanTech");
      if (auth) {
        const parsedAuth = JSON.parse(auth);
        const token = parsedAuth?.state?.token;
        try {
          if (config.headers) {
            // Use Authorization header instead of a custom header
            config.headers.Authorization = `Bearer ${token}`;
          }
        } catch (err) {
          console.error("Invalid token format in localStorage", err);
        }
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);
