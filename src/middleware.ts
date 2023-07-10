import { Role } from "@prisma/client";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.redirect(new URL("/auth", req.nextUrl));
  }

  if (
    req.nextUrl.pathname.startsWith("/dashboard") &&
    token.role !== Role.ADMIN
  ) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }
}

export const config = {
  matcher: [
    "/posts/create",
    "/settings",
    "/posts/favorites",
    "/settings",
    "/dashboard",
  ],
};
