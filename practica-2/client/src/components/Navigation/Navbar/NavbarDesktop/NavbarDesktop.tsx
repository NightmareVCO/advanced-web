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
import { usePathname } from 'next/navigation';
import { useActionState } from 'react';
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
					{!isAuthenticated && (
						<Button
							className="text-white"
							radius="full"
							variant="ghost"
							color="primary"
							as={Link}
							href={Routes.LogIn}
						>
							Login
						</Button>
					)}
					<Button
						className="bg-primary font-medium text-white"
						color="secondary"
						endContent={<Icon icon="solar:alt-arrow-right-linear" />}
						radius="full"
						variant="flat"
						as={Link}
						href={Routes.NewProject}
					>
						New Project
					</Button>
					{/* {isAuthenticated && (
						<form action={action}>
							<Button
								className="text-white"
								radius="full"
								variant="flat"
								color="danger"
								type="submit"
							>
								Log Out
							</Button>
						</form>
					)}
					{isAuthenticated && (
						<Chip color="primary" variant="dot">
							{userName}
						</Chip>
					)} */}
					{isAuthenticated && (
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
								<DropdownItem key="profile">
									<p>
										Username:{' '}
										<span className="text-primary font-bold">{`${userName}`}</span>
									</p>
								</DropdownItem>
								<DropdownItem key="es-lang">
									<p>
										Change to:{' '}
										<span className="text-primary font-bold">ES</span>
									</p>
								</DropdownItem>
								<DropdownItem key="en-lang">
									<p>
										Change to:{' '}
										<span className="text-primary font-bold">EN</span>
									</p>
								</DropdownItem>
								<DropdownItem
									key="logout"
									color="danger"
									as={Link}
									href={Routes.LogOut}
								>
									Log Out
								</DropdownItem>
							</DropdownMenu>
						</Dropdown>
					)}
				</NavbarItem>
			</NavbarContent>
		</>
	);
}
