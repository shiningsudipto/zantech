import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("tokenZan")?.value;
  if (!token) {
    if (request.nextUrl.pathname === "/user") {
      return NextResponse.redirect(new URL("/sign-in", request.nextUrl));
    }
  }
}
