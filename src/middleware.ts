import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect chat routes
  if (pathname.startsWith('/chat')) {
    const guestToken = request.cookies.get('guestToken')?.value;
    const authHeader = request.headers.get('authorization');

    if (!guestToken && !authHeader) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/chat/:path*', '/api/:path*'],
};
