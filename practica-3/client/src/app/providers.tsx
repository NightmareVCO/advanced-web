// app/providers.tsx
'use client';

import { HeroUIProvider } from '@heroui/react';

export default function Providers({ children }: { children: React.ReactNode }) {
	return <HeroUIProvider>{children}</HeroUIProvider>;
}
