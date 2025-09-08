import { AxiosInstance } from "./axiosInstance";

export const handleSubmitReq = async (
  method: "POST" | "PUT" | "PATCH" | "DELETE",
  endpoint: string,
  payload?: Record<string, any>
) => {
  try {
    let res;
    switch (method) {
      case "POST":
        res = await AxiosInstance.post(endpoint, payload);
        break;
      case "PUT":
        res = await AxiosInstance.put(endpoint, payload);
        break;
      case "PATCH":
        res = await AxiosInstance.patch(endpoint, payload);
        break;
      case "DELETE":
        res = await AxiosInstance.delete(endpoint, { data: payload });
        break;
      default:
        throw new Error("Unsupported HTTP method");
    }

    const data = res?.data;
    console.log("Response from server:", data);
    return data;
  } catch (err: any) {
    console.error("Error:", err.response?.data || err.message);
    throw err;
  }
};
