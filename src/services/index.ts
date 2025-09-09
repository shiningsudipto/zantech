"use server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const addToWishList = async <T extends object>(
  endpoint: string,
  data: T,
  revalidate?: string
): Promise<any> => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    console.log({ token });
    // zustand dependent on localstorage, server component does not have access to the local storage
    // const token = useAuthStore.getState().token;

    console.log(token);
    const response = await fetch(
      `https://zantechbackend.desklago.com/api${endpoint}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify(data),
        cache: "no-store",
      }
    );

    // if (!response.ok) {
    //   throw new Error(`❌ Failed with status ${response.status}`);
    // }

    const result = await response.json();
    console.log(result);

    if (revalidate) {
      revalidatePath(revalidate);
    }

    return result;
  } catch (error) {
    console.log("addToWishList error:", error);
    throw error;
  }
};
