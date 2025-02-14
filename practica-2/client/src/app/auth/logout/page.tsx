'use client';

import { Spinner } from '@heroui/react';
import { logout } from '@lib/actions/logIn.action';
import { useEffect } from 'react';

export default function LogOut() {
	useEffect(() => {
		const performLogout = async () => {
			await logout();
		};
		performLogout();
	}, []);

	return (
		<div className="flex justify-center items-center h-screen">
			<Spinner color="primary" label="Logging Out" />
		</div>
	);
}
