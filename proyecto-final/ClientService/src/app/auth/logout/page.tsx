'use client';

import { Spinner } from '@heroui/react';
import { logout } from '@lib/actions/login.action';
import { useEffect } from 'react';

export default function LogOut() {
	useEffect(() => {
		const performLogout = async () => {
			await logout();
		};
		performLogout();
	}, []);

	return (
		<div className="flex items-center justify-center h-screen">
			<Spinner color="primary" label="Logging Out" />
		</div>
	);
}
