import type { SidebarItem } from './Sidebar';

export const items: SidebarItem[] = [
	{
		key: 'dashboard',
		href: '/dashboard',
		icon: 'lucide:home',
		title: 'Home',
	},
	// users
	{
		key: 'users',
		href: '/dashboard/users',
		icon: 'lucide:users-round',
		title: 'Users',
	},
	// orders
	{
		key: 'orders',
		href: '/dashboard/orders',
		icon: 'lucide:notebook-text',
		title: 'Orders',
	},
];
