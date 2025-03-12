'use client';

import { Spinner } from '@heroui/react';
import { logout } from '@lib/actions/logIn.action';
import { useEffect } from 'react';

type LogOutProps = Readonly<{
	jwt: string;
}>;

export default function Logout({ jwt }: LogOutProps) {
	useEffect(() => {
		const performLogout = async () => {
			await logout({ jwt });
		};
		performLogout();
	}, [jwt]);

	return (
		<div className="flex justify-center items-center h-screen">
			<Spinner color="primary" label="Logging Out" />
		</div>
	);
}
