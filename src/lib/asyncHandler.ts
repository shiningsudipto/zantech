import { TError } from "@/types/product.type";
import { toast } from "sonner";

export const handleAsync = async <T extends { message?: string }>(
  fn: () => Promise<T>
): Promise<T | undefined> => {
  try {
    const res = await fn();
    if (res?.message) {
      toast.success(res.message);
    }
    return res;
  } catch (err) {
    const error = err as TError;
    toast.error(error?.message || "Something went wrong");
    return undefined;
  }
};
