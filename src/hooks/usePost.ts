import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosInstance } from "@/lib/axiosInstance";
import { AxiosError } from "axios";
import { toast } from "sonner";

export function usePostQuery<TData = unknown, TVariables = unknown>(
  endpoint: string,
  options?: UseMutationOptions<TData, AxiosError, TVariables>
) {
  return useMutation<TData, AxiosError, TVariables>({
    mutationFn: async (body: TVariables) => {
      const res = await AxiosInstance.post(endpoint, body);
      return res.data as TData;
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const message =
          (error.response?.data as { message?: string })?.message ||
          error.message;
        toast.error(message);
        console.log("error", error);
      } else {
        toast.error("Something went wrong!");
      }
    },
    ...options,
  });
}
