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

import { Routes } from '@/lib/data/routes.data';
import { Icon } from '@iconify/react';
import { usePathname } from 'next/navigation';
import { menuItems } from '../_config/config';

export default function NavbarDesktop() {
	const pathName = usePathname();

	return (
		<>
			{/* Left Content */}
			<NavbarBrand>
				<BrandLogoIcon />
			</NavbarBrand>

			{/* Center Content */}
			<NavbarContent justify="center">
				<NavbarDesktopItems menuItems={menuItems} pathName={pathName} />
			</NavbarContent>

			{/* Right Content */}
			<NavbarContent className="hidden md:flex" justify="end">
				<NavbarItem className="ml-2 !flex gap-2">
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
					<Button
						className="bg-primary font-medium text-white"
						color="secondary"
						endContent={<Icon icon="solar:alt-arrow-right-linear" />}
						radius="full"
						variant="flat"
						as={Link}
						href={Routes.Mocks}
					>
						Get Started
					</Button>
				</NavbarItem>
			</NavbarContent>
		</>
	);
}
