import OrdersTable from '@components/tables/booksTable/OrdersTable';
import { type Order, getAllOrders } from '@lib/fetch/orders.fetch';
import { type UserSession, getUserSession } from '@lib/utils/auth.utils';
import { cookies } from 'next/headers';

export default async function DashboardOrdersPage() {
	const jwt = (await cookies()).get('session')?.value;
	const userSession: UserSession | null = await getUserSession(jwt);

	const orders: Order[] | null = await getAllOrders({
		userToken: userSession?.token || '',
	});

	return (
		<div className="flex items-center justify-center">
			<OrdersTable orders={orders ?? []} isSmall />
		</div>
	);
}
