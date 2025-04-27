import BooksSection from '@/components/sections/profilePage/BooksSection';
import HeaderSection from '@components/sections/profilePage/HeaderSection';
import { type Order, getOrders } from '@lib/fetch/orders.fetch';
import { type UserSession, getUserSession } from '@lib/utils/auth.utils';
import { cookies } from 'next/headers';

export default async function BookDetailsView() {
	const jwt = (await cookies()).get('session')?.value;
	const userSession: UserSession | null = await getUserSession(jwt);

	const orders: Order[] | null = await getOrders({
		userToken: userSession?.token || '',
		userId: userSession?.id || '',
	});

	const ordersItems = orders?.flatMap((order) => order.items) || [];
	const uniqueOrdersItems = ordersItems.filter((item, index, self) => {
		return index === self.findIndex((t) => t.bookId === item.bookId);
	});

	return (
		<main className="flex flex-col w-screen gap-y-6">
			<div className="container flex flex-col items-center justify-center w-full py-6 mx-auto my-6 bg-white border rounded-md shadow-md">
				<section className="w-full">
					<HeaderSection />
				</section>

				<h2 className="mt-6 text-2xl font-bold text-center text-primary">
					My Books & Orders
				</h2>

				<BooksSection products={uniqueOrdersItems} orders={orders ?? []} />
			</div>
		</main>
	);
}
