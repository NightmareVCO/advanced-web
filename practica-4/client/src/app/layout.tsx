import type { Metadata } from 'next';
import { Onest } from 'next/font/google';
import Providers from './providers';
import './globals.css';
import Background from '@components/Background/Background';
import Footer from '@components/Navigation/Footer/Footer';
import Navbar from '@components/Navigation/Navbar/Navbar';
import { decrypt } from '@lib/auth/session';
import type { JWTPayload } from 'jose';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
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
	const messages = await getMessages();
	const locale = await getLocale();

	let userIsAdmin = false;
	let isAuthenticated = false;
	let userName = '';

	const jwt = (await cookies()).get('session')?.value;
	const session: JWTPayload | Error = await decrypt(jwt);

	if (!(session instanceof Error)) {
		if (typeof session.roles === 'string')
			userIsAdmin = session.roles.includes('ADMIN');
		isAuthenticated = session.userId !== undefined;
		if (typeof session.username === 'string') userName = session.username;
	}

	return (
		<html lang={locale} className="dark">
			<body className={` antialiased ${onest.className}`}>
				<NextIntlClientProvider messages={messages}>
					<Providers>
						<div className="flex flex-col min-h-screen">
							<Background />
							<Navbar
								admin={userIsAdmin}
								userName={userName}
								isAuthenticated={!!isAuthenticated}
							/>
							<div className="flex-1">{children}</div>
							<Footer />
						</div>
					</Providers>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
