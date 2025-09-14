/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export const callAPI = async <T extends object>(
  endpoint: string,
  method: HttpMethod,
  data?: T | null,
  revalidate?: string
): Promise<any> => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("tokenZan")?.value;
    // console.log("token", token);

    const response = await fetch(
      `https://zantechbackend.desklago.com/api${endpoint}`,
      {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: method !== "GET" ? JSON.stringify(data) : undefined,
      }
    );

    const result = await response.json();

    if (!response.ok) {
      const apiError = new Error(result?.message || "Request failed");
      (apiError as any).details = result;
      throw apiError;
    }
    if (response.ok) {
      if (revalidate) {
        revalidatePath(revalidate);
      }
    }

    console.log("response: ", result);

    return result;
  } catch (error) {
    console.log("error:", error);
    throw error;
  }
};
