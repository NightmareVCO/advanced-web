import TotalOrdersTotalSalesTotalUsers from '@/components/graphs/TotalOrdersTotalSalesTotalUsers';
import OrdersPerCategories from '@components/graphs/OrdersPerCategories';
import OrdersPerDayLastWeek from '@components/graphs/OrdersPerDayLastWeek';
import TodayOrdersTodaySalesTotalBooks from '@components/graphs/TodayOrdersTodaySalesTotalBooks';

export default async function MainDashboardPage() {
	return (
		<div className="flex flex-col items-center justify-center w-full mb-36 gap-y-6">
			<TotalOrdersTotalSalesTotalUsers />
			<TodayOrdersTodaySalesTotalBooks />
			<OrdersPerDayLastWeek />
			<OrdersPerCategories />
		</div>
	);
}
