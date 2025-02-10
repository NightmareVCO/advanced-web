//export const mobileMenuItems = ['Home', 'Projects', 'Mocks', 'Features'];
//export const menuItems = ['Home', 'Projects', 'Mocks', 'Features'];

import Routes from '@lib/data/routes.data';

export type MenuItem = {
	name: string;
	href: string;
	admin: boolean;
};

export const menuItems: MenuItem[] = [
	{ name: 'Home', href: Routes.Home, admin: false },
	{ name: 'Projects', href: Routes.Projects, admin: false },
	{ name: 'Users', href: Routes.Users, admin: true },
	{ name: 'Explore', href: Routes.Explore, admin: false },
];

export const mobileMenuItems: MenuItem[] = [
	{ name: 'Home', href: Routes.Home, admin: false },
	{ name: 'Projects', href: Routes.Projects, admin: false },
	{ name: 'Users', href: Routes.Users, admin: true },
	{ name: 'Explore', href: Routes.Explore, admin: false },
];
