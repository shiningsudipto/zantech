/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export const callAPI = async <T extends object>(
  endpoint: string,
  method: HttpMethod,
  data?: T,
  revalidate?: string
): Promise<any> => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

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

    if (!response.ok) {
      console.log(`❌ Failed with status ${response.status}`);
    }

    const result = await response.json();
    console.log("response: ", result);

    if (revalidate) {
      revalidatePath(revalidate);
    }

    return result;
  } catch (error) {
    console.log("error:", error);
  }
};
