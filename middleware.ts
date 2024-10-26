import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/alphabet-cards") {
    return NextResponse.redirect(new URL("/alphabet-cards/hiragana", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/alphabet-cards", "/alphabet-cards/:path*"],
};
