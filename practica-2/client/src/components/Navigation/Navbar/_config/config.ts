//export const mobileMenuItems = ['Home', 'Projects', 'Mocks', 'Features'];
//export const menuItems = ['Home', 'Projects', 'Mocks', 'Features'];

export type MenuItem = {
	name: string;
	href: string;
};

export const mobileMenuItems: MenuItem[] = [
	{ name: 'Home', href: '/' },
	{ name: 'Projects', href: '/projects' },
	{ name: 'Mocks', href: '/mocks' },
	{ name: 'Features', href: '/features' },
];

export const menuItems: MenuItem[] = [
	{ name: 'Home', href: '/' },
	{ name: 'Projects', href: '/projects' },
	{ name: 'Mocks', href: '/mocks' },
	{ name: 'Features', href: '/features' },
];
