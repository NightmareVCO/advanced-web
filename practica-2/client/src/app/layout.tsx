import type { Metadata } from 'next';
import { Onest } from 'next/font/google';
import Providers from './providers';
import './globals.css';
import Background from '@components/Background/Background';
import Footer from '@components/Navigation/Footer/Footer';
import Navbar from '@components/Navigation/Navbar/Navbar';

export const metadata: Metadata = {
	title: 'Mockify',
	description: "Mockify is an api's mockup tool for developers.",
};

const onest = Onest({ subsets: ['latin'] });

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="es" className="dark">
			<body className={` antialiased ${onest.className}`}>
				<Providers>
					<div className="flex flex-col min-h-screen">
						<Background />
						<Navbar />
						<div className="flex-1">{children}</div>
						<Footer />
					</div>
				</Providers>
			</body>
		</html>
	);
}
