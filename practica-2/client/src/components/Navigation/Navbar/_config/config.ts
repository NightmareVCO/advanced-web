//export const mobileMenuItems = ['Home', 'Projects', 'Mocks', 'Features'];
//export const menuItems = ['Home', 'Projects', 'Mocks', 'Features'];

import { Routes } from '@/lib/data/routes.data';

export type MenuItem = {
	name: string;
	href: string;
};

export const menuItems: MenuItem[] = [
	{ name: 'Home', href: Routes.Home },
	{ name: 'Projects', href: Routes.Projects },
	{ name: 'Mocks', href: Routes.Mocks },
	{ name: 'Users', href: Routes.Users },
];

export const mobileMenuItems: MenuItem[] = [
	{ name: 'Home', href: Routes.Home },
	{ name: 'Projects', href: Routes.Projects },
	{ name: 'Mocks', href: Routes.Mocks },
	{ name: 'Users', href: Routes.Users },
];
