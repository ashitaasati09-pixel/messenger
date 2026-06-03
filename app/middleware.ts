import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const session = request.cookies.get("session_user");
  const { pathname } = request.nextUrl;

  if (session && (pathname === "/login" || pathname === "/signup" || pathname === "/")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!session && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/signup", "/dashboard/:path*"],
};