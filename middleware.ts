import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

const protectedRoutes = ["/design", "/redesign", "/account", "/admin"];

export default async function middleware(request: Request) {
  const { pathname } = new URL(request.url);
  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));

  if (!isProtected) {
    return NextResponse.next();
  }

  const session = await auth();
  if (!session?.user) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
