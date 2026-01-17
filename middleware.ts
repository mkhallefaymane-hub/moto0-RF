import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const session = request.cookies.get('admin_session')?.value;

  // Protect /admin and its subroutes
  if (path.startsWith('/admin') && path !== '/admin/login') {
    if (!session) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // Protect /api/admin but allow /api/admin/login and /api/admin/logout
  if (path.startsWith('/api/admin')) {
    const isPublicApi = path === '/api/admin/login' || path === '/api/admin/logout';
    if (!isPublicApi && !session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
