import type { Metadata } from 'next';
import { Onest } from 'next/font/google';
import './globals.css';
import Providers from './providers';

import MainNavbar from '@components/navbar/Navbar';

export const metadata: Metadata = {
	title: 'Student Muck App',
	description: 'Student Muck App is a web application for adding students.',
};

const onest = Onest({ subsets: ['latin'] });

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="es" className="dark">
			<body className={`antialiased ${onest.className}`}>
				<Providers>
					<section className="relative flex flex-col w-full h-screen overflow-hidden min-h-dvh bg-background">
						<MainNavbar />
						{children}
					</section>
				</Providers>
			</body>
		</html>
	);
}
