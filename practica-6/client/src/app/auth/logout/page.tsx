import Logout from '@components/Logout/Logout';
import { cookies } from 'next/headers';

export default async function LogOut() {
	const jwt = (await cookies()).get('session')?.value;
	if (!jwt) {
		return null;
	}

	return <Logout jwt={jwt} />;
}
