import type { Metadata } from 'next';
import { Onest } from 'next/font/google';

import '@/styles/globals.css';
import Navbar from '@components/navigation/navbar/Navbar';
import { Providers } from './providers';

const onest = Onest({
	variable: '--font-onest',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'BookHive | Welcome',
	description:
		'BookHive is a e-commerce platform for books, Here you can find all the books you need.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={onest.className}>
				<Providers>
					<Navbar />
					<main>{children}</main>
					{/* <Footer /> */}
				</Providers>
			</body>
		</html>
	);
}
