import type { Metadata } from 'next';
import { Onest } from 'next/font/google';
import Providers from './providers';
import './globals.css';
import Background from '@components/Background/Background';
import Footer from '@components/Navigation/Footer/Footer';
import Navbar from '@components/Navigation/Navbar/Navbar';
import { decrypt } from '@lib/auth/session';
import type { JWTPayload } from 'jose';
import { cookies } from 'next/headers';

export const metadata: Metadata = {
	title: 'Mockify',
	description: "Mockify is an api's mockup tool for developers.",
};

const onest = Onest({ subsets: ['latin'] });

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	let userIsAdmin = false;
	let isAuthenticated = false;

	const cookie = (await cookies()).get('session')?.value;
	const session: JWTPayload | Error = await decrypt(cookie);

	if (!(session instanceof Error)) {
		if (typeof session.role === 'string') {
			userIsAdmin = session.role.includes('ADMIN');
		}
		isAuthenticated = session.id !== undefined;
	}

	return (
		<html lang="es" className="dark">
			<body className={` antialiased ${onest.className}`}>
				<Providers>
					<div className="flex flex-col min-h-screen">
						<Background />
						<Navbar admin={userIsAdmin} isAuthenticated={!!isAuthenticated} />
						<div className="flex-1">{children}</div>
						<Footer />
					</div>
				</Providers>
			</body>
		</html>
	);
}
