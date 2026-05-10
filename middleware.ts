import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const protectedRoutes = ['/design', '/redesign', '/account', '/admin'];
const authTokenName = 'next-auth.session-token';

function getTokenFromCookie(request: Request, tokenName: string): string | undefined {
  const cookies = request.headers.get('cookie') || '';
  return cookies.split(';').find(c => c.trim().startsWith(`${tokenName}=`))?.split('=')[1];
}

export default async function middleware(request: Request) {
  const pathname = new URL(request.url).pathname;
  const isProtected = protectedRoutes.some(route => pathname.startsWith(route));

  if (!isProtected) {
    return NextResponse.next();
  }

  const token = getTokenFromCookie(request, authTokenName);

  if (!token) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  try {
    const secret = new TextEncoder().encode(process.env.AUTH_SECRET);
    await jwtVerify(token, secret);
    return NextResponse.next();
  } catch {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
