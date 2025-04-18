import type { Metadata } from 'next';
import { Onest } from 'next/font/google';

import '@/styles/globals.css';
import MiniGridBackground from '@/components/backgrounds/MiniGridBackground';
import Banner from '@components/banner/Banner';
import Footer from '@components/navigation/footer/Footer';
import Navbar from '@components/navigation/navbar/Navbar';
import { NAVBAR_ITEMS } from '@lib/constants/navbar.constants';
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
			<body
				className={`${onest.className} flex flex-col min-h-screen antialiased scroll-smooth`}
			>
				<Providers>
					<MiniGridBackground />
					<header>
						<Navbar navbarItems={NAVBAR_ITEMS} />
						<Banner />
					</header>
					<main className="flex-grow">{children}</main>
					<footer className="relative z-10">
						<Footer footerItems={NAVBAR_ITEMS} />
					</footer>
				</Providers>
			</body>
		</html>
	);
}
