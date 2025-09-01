import axios from "axios";

// Axios Interceptor Instance
export const AxiosInstance = axios.create({
  baseURL: "https://zantechbackend.desklago.com/api",
});

// AxiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     const accessToken = JSON.parse(token as string);

//     // If token is present, add it to request's Authorization Header
//     if (accessToken) {
//       if (config.headers) config.headers.token = accessToken;
//     }
//     return config;
//   },
//   (error) => {
//     // Handle request errors here
//     return Promise.reject(error);
//   }
// );
