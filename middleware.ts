import { NextResponse, NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/alphabet-cards") {
    return NextResponse.redirect(new URL("/alphabet-cards/hiragana", request.url));
  }

  return updateSession(request);
}

export const config = {
  matcher: ["/alphabet-cards", "/alphabet-cards/:path*", "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
