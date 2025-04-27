import { type UserSession, getUserSession } from '@lib/utils/auth.utils';
// import Routes from
// import type { AuthPayload } from
import type { JWTPayload } from 'jose';
import { cookies } from 'next/headers';
import { type NextRequest, NextResponse } from 'next/server';

const protectedRoutes = [
	'/profile',
	'/dashboard',
	'/dashboard/orders',
	'/dashboard/users',
];
const publicRoutes = [
	'/auth/login',
	'/auth/register',
	'/auth/logout',
	'/catalog',
	'/catalog/book/[bookId]',
];

export default async function middleware(req: NextRequest) {
	const path = req.nextUrl.pathname;
	// const isProtectedRoute = protectedRoutes.includes(path);
	const isProtectedRoute = protectedRoutes.some((route) =>
		path.startsWith(route),
	);
	const isPublicRoute = publicRoutes.includes(path);

	const jwt = (await cookies()).get('session')?.value;
	const userSession: UserSession | null = await getUserSession(jwt);

	// Redirect to /login if the user is not authenticated
	if (isProtectedRoute && !userSession) {
		return NextResponse.redirect(new URL('/auth/login', req.nextUrl));
	}

	// Redirect to /projects if the user is authenticated and in /login
	if (
		isPublicRoute &&
		userSession &&
		req.nextUrl.pathname.startsWith('/auth/login') &&
		req.nextUrl.pathname.startsWith('/auth/register')
	) {
		return NextResponse.redirect(new URL('/catalog', req.nextUrl));
	}

	// Redirect to /projects if the user is authenticated and not admin in /users
	if (path.startsWith('/dashboard') && !userSession?.isAdmin) {
		return NextResponse.redirect(new URL('/catalog', req.nextUrl));
	}

	return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
	matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
