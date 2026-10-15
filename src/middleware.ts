import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyAuth } from './lib/auth';

const protectedRoutes = ['/admin', '/checkout'];
const authRoutes = ['/login'];

export default async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isProtectedRoute = protectedRoutes.some((route) => path.startsWith(route));
  const isAuthRoute = authRoutes.includes(path);

  const token = request.cookies.get('session')?.value;
  const verifiedToken = token ? await verifyAuth(token) : null;

  if (isProtectedRoute && !verifiedToken) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }

  if (isAuthRoute && verifiedToken) {
    return NextResponse.redirect(new URL('/admin', request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}