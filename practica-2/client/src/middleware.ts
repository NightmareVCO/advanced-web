import { decrypt } from '@lib/auth/session';
import Routes from '@lib/data/routes.data';
import type { AuthPayload } from '@lib/entity/session.entity';
import type { JWTPayload } from 'jose';
import { cookies } from 'next/headers';
import { type NextRequest, NextResponse } from 'next/server';

const protectedRoutes = [
	Routes.NewProject.toString(),
	Routes.Projects.toString(),
	Routes.Users.toString(),
];
const publicRoutes = [Routes.Home.toString(), Routes.LogIn.toString()];

export default async function middleware(req: NextRequest) {
	// 2. Check if the current route is protected or public
	let userIsAdmin = false;

	const path = req.nextUrl.pathname;
	// const isProtectedRoute = protectedRoutes.includes(path);
	//const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route));
	const isPublicRoute = publicRoutes.includes(path);

	// 3. Decrypt the session from the cookie
	const cookie = (await cookies()).get('session')?.value;
	const session: JWTPayload | Error = await decrypt(cookie);

	let authSession: AuthPayload | null = null;
	if (!(session instanceof Error) && (session as AuthPayload).userId) {
		authSession = session as AuthPayload;
	}

	// Parse the admin role
	if (authSession && typeof authSession.role === 'string') {
		userIsAdmin = authSession.role.includes('ADMIN');
	}

	// Redirect to /login if the user is not authenticated
	// if (isProtectedRoute && !authSession?.userId) {
	// 	return NextResponse.redirect(new URL(Routes.LogIn, req.nextUrl));
	// }

	// Redirect to /projects if the user is authenticated and in /login
	if (
		isPublicRoute &&
		authSession?.userId &&
		req.nextUrl.pathname.startsWith(Routes.LogIn)
	) {
		return NextResponse.redirect(new URL(Routes.Projects, req.nextUrl));
	}

	// Redirect to /projects if the user is authenticated and not admin in /users
	if (path.startsWith(Routes.Users) && authSession?.userId && !userIsAdmin) {
		return NextResponse.redirect(new URL(Routes.Projects, req.nextUrl));
	}

	return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
	matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
