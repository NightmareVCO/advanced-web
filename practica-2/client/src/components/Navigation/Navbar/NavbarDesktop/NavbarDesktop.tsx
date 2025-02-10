'use client';

import {
	Button,
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
import { usePathname } from 'next/navigation';
import { useActionState } from 'react';
import { menuItems } from '../_config/config';

type NavbarDesktopProps = {
	admin?: boolean;
	isAuthenticated?: boolean;
};

export default function NavbarDesktop({
	admin,
	isAuthenticated,
}: NavbarDesktopProps) {
	const pathName = usePathname();
	const [_, action] = useActionState(logout, null);
	const isLoginHidden = isAuthenticated ? 'hidden' : '';
	const isLogoutHidden = isAuthenticated ? '' : 'hidden';

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
				<NavbarItem className="ml-2 !flex gap-2">
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
					<form action={action}>
						<Button
							className={`text-white ${isLogoutHidden}`}
							radius="full"
							variant="flat"
							color="danger"
							type="submit"
						>
							Log Out
						</Button>
					</form>
				</NavbarItem>
			</NavbarContent>
		</>
	);
}
