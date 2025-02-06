import type { Metadata } from 'next';
import { Onest } from 'next/font/google';
import Providers from './providers';
import './globals.css';
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
			<body className={`antialiased ${onest.className}`}>
				<div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
					<Navbar />
					<Providers>{children}</Providers>
				</div>
			</body>
		</html>
	);
}
