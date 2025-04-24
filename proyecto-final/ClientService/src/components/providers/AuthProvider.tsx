// components/providers/AuthHydration.tsx
'use client';

import type { UserSession } from '@/lib/utils/auth.utils';
import { useAuthStore } from '@lib/stores/useAuthStore';
import { useEffect } from 'react';

type Props = {
	user: UserSession | null;
};

export default function AuthHydration({ user }: Props) {
	const setUser = useAuthStore((state) => state.setUser);

	useEffect(() => {
		setUser(user);
	}, [user, setUser]);

	return null;
}
