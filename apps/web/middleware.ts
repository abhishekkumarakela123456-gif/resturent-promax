import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const host = req.headers.get('host') || '';
  const [subdomain] = host.split('.');

  if (subdomain && !['www', 'localhost:3000', 'app'].includes(subdomain) && !req.nextUrl.pathname.startsWith('/super-admin') && !req.nextUrl.pathname.startsWith('/admin')) {
    const url = req.nextUrl.clone();
    if (url.pathname === '/') {
      url.pathname = `/${subdomain}`;
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico).*)']
};
