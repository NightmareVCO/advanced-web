import { type User, getUsers } from '@/lib/fetch/users.fetch';
import UsersTable from '@components/tables/usersTable/UserTable';
import { type Order, getAllOrders } from '@lib/fetch/orders.fetch';
import { type UserSession, getUserSession } from '@lib/utils/auth.utils';
import { cookies } from 'next/headers';

export default async function DashboardUserPage() {
	const jwt = (await cookies()).get('session')?.value;
	const userSession: UserSession | null = await getUserSession(jwt);

	// const orders: Order[] | null = await getAllOrders({
	// 	userToken: userSession?.token || '',
	// });

	const users: User[] | null = await getUsers({
		userToken: userSession?.token || '',
	});

	console.log('users', users);

	return (
		<div className="flex items-center justify-center">
			<UsersTable users={users ?? []} isSmall />
		</div>
	);
}
