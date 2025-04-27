export type NavbarLink = {
	label: string;
	href: string;
	icon?: React.ReactNode;
	showInNavbar?: boolean;
};

export enum NavbarLinks {
	HOME = '/',
	CATALOG = '/catalog',
	ABOUT = '/about',
	CONTACT = '/contact',
	PURCHASES = '/purchases',
	DASHBOARD = '/dashboard',
	AUTH = '/auth',
	PROFILE = '/profile',
	LOGIN = '/auth/login',
	SIGNUP = '/auth/signup',
}

export const NAVBAR_ITEMS: NavbarLink[] = [
	{
		label: 'Home',
		href: NavbarLinks.HOME,
	},
	{
		label: 'Catalog',
		href: NavbarLinks.CATALOG,
	},
	{
		label: 'About',
		href: NavbarLinks.ABOUT,
	},
	{
		label: 'Contact',
		href: NavbarLinks.CONTACT,
	},
];
