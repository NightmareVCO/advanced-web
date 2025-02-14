'use client';

import {
	Avatar,
	Button,
	Chip,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	Link,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
} from '@heroui/react';
import BrandLogoIcon from '@icons/BrandLogoIcon';
import NavbarDesktopItems from './NavbarDesktopItems';

import { logout } from '@/lib/actions/logIn.action';
import { Icon } from '@iconify/react';
import Routes from '@lib/data/routes.data';
import {usePathname, useRouter} from 'next/navigation';
import {useActionState, useEffect, useState} from 'react';
import { menuItems } from '../_config/config';

type NavbarDesktopProps = {
	admin?: boolean;
	userName?: string;
	isAuthenticated?: boolean;
};

export default function NavbarDesktop({
	admin,
	userName,
	isAuthenticated,
}: NavbarDesktopProps) {
	const pathName = usePathname();
	const [_, action] = useActionState(logout, null);
	const isLoginHidden = isAuthenticated ? 'hidden' : '';
	const isLogoutHidden = isAuthenticated ? '' : 'hidden';
	const [locale, setLocale] = useState<string>('');
	const router = useRouter();

	useEffect(() => {
		const cookieLocale = document.cookie.split('; ').find((row) => row.startsWith('MYNEXTAPP_LOCALE'))
		?.split('=')[1];
		if(cookieLocale){
			setLocale(cookieLocale);
		} else {
			const browserLocale = navigator.language.slice(0, 2);
			setLocale(browserLocale);
			document.cookie = `MYNEXTAPP_LOCALE=${browserLocale};`;
			router.refresh();
		}
	}, [router]);

	const changeLocale = async (newLocale: string) => {
		setLocale(newLocale);
		document.cookie = `MYNEXTAPP_LOCALE=${newLocale};`;
		const messages = (await import(`@/messages/${newLocale}.json`)).default;
		router.refresh();
	}

	return (
		<>
			{/* Left Content */}
			<NavbarBrand>
				<Link href={Routes.Home}>
					<BrandLogoIcon />
				</Link>
			</NavbarBrand>

			{/* Center Content */}
			<NavbarContent justify="center" className="hidden md:flex">
				<NavbarDesktopItems
					menuItems={menuItems}
					pathName={pathName}
					admin={admin}
				/>
			</NavbarContent>

			{/* Right Content */}
			<NavbarContent className="hidden md:flex" justify="end">
				<NavbarItem className="ml-2 !flex gap-4">
					<Button
						className={`text-white ${isLoginHidden}`}
						radius="full"
						variant="ghost"
						color="primary"
						as={Link}
						href={Routes.LogIn}
					>
						Login
					</Button>
					{isAuthenticated && (
						<Button
							className="bg-primary font-medium text-white"
							color="secondary"
							endContent={<Icon icon="solar:alt-arrow-right-linear" />}
							radius="full"
							variant="flat"
							as={Link}
							href={Routes.NewProject}
						>
							Create New Project
						</Button>
					)}
					<Dropdown placement="bottom-end">
						<DropdownTrigger>
							<Avatar
								isBordered
								as="button"
								className="bg-primary transition-transform"
								color="secondary"
								size="sm"
							/>
						</DropdownTrigger>
						<DropdownMenu aria-label="Profile Actions" variant="flat">
							{isAuthenticated ? (
								<DropdownItem key="profile">
									<p>
										Username: <span className="text-primary font-bold">{'test'}</span>
									</p>
								</DropdownItem>
							) : null}

							{locale !== 'es' ? (
								<DropdownItem key="es-lang" onPress={() => changeLocale('es')}>
									<p>
										Change to: <span className="text-primary font-bold">ES</span>
									</p>
								</DropdownItem>
							) : null}
							{locale !== 'en' ? (
								<DropdownItem key="en-lang" onPress={() => changeLocale('en')}>
									<p>
										Change to: <span className="text-primary font-bold">EN</span>
									</p>
								</DropdownItem>
							) : null}
							{isAuthenticated ? (
								<DropdownItem
									key="logout"
									color="danger"
									as={Link}
									href={Routes.LogOut}
								>
									Log Out
								</DropdownItem>
							) : null}
						</DropdownMenu>
					</Dropdown>
				</NavbarItem>
			</NavbarContent>
		</>
	);
}
