import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedRoutes = ['/design', '/redesign', '/account', '/admin'];

export default function proxy(req: NextRequest) {
  const isProtected = protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route));

  if (isProtected) {
    // Check for NextAuth/Auth.js session tokens
    const hasSession = 
      req.cookies.has('next-auth.session-token') || 
      req.cookies.has('__Secure-next-auth.session-token') ||
      req.cookies.has('authjs.session-token') || 
      req.cookies.has('__Secure-authjs.session-token');

    if (!hasSession) {
      const url = new URL('/login', req.nextUrl.origin);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
