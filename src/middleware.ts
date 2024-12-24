import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Redirect only if visiting the root page
  if (pathname === '/') {
    const url = req.nextUrl.clone();
    url.pathname = '/user/login'; // Redirect to your custom page
    return NextResponse.redirect(url);
  }

  return NextResponse.next(); // Allow other requests to go through
}