import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';

const protectedRoutes = ['/design', '/redesign', '/account', '/admin'];

export default auth((req) => {
  const isProtected = protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route));

  if (isProtected && !req.auth) {
    const url = new URL('/login', req.nextUrl.origin);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
