import type { Metadata } from 'next';
import { Onest } from 'next/font/google';
import Providers from './providers';
import './globals.css';

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
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
