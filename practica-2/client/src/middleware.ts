import { decrypt } from '@lib/auth/session';
import Routes from '@lib/data/routes.data';
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
	const path = req.nextUrl.pathname;
	const isProtectedRoute = protectedRoutes.includes(path);
	const isPublicRoute = publicRoutes.includes(path);

	// 3. Decrypt the session from the cookie
	const cookie = (await cookies()).get('session')?.value;
	const session = await decrypt(cookie);

	// Parse the admin role
	const userIsAdmin = session?.role?.includes('ADMIN');

	// Redirect to /login if the user is not authenticated
	if (isProtectedRoute && !session?.userId) {
		return NextResponse.redirect(new URL(Routes.LogIn, req.nextUrl));
	}

  // Redirect to /projects if the user is authenticated and in /login
  if (
    isPublicRoute &&
    session?.userId &&
    req.nextUrl.pathname.startsWith(Routes.LogIn)
  ) {
    return NextResponse.redirect(new URL(Routes.Projects, req.nextUrl));
  }

  // Redirect to /projects if the user is authenticated and not admin in /users
  if (
    path.startsWith(Routes.Users) &&
    session?.userId &&
    !userIsAdmin
  ) {
    return NextResponse.redirect(new URL(Routes.Projects, req.nextUrl));
  }

	return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
	matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
