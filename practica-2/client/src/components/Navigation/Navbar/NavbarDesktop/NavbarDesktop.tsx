import { Button, NavbarBrand, NavbarContent, NavbarItem } from '@heroui/react';
import BrandLogoIcon from '@icons/BrandLogoIcon';
import NavbarDesktopItems from './NavbarDesktopItems';

import { Icon } from '@iconify/react';
import { menuItems } from '../_config/config';

export default function NavbarDesktop() {
	return (
		<>
			{/* Left Content */}
			<NavbarBrand>
				<BrandLogoIcon />
			</NavbarBrand>

			{/* Center Content */}
			<NavbarContent justify="center">
				<NavbarDesktopItems menuItems={menuItems} />
			</NavbarContent>

			{/* Right Content */}
			<NavbarContent className="hidden md:flex" justify="end">
				<NavbarItem className="ml-2 !flex gap-2">
					<Button
						className="text-white"
						radius="full"
						variant="ghost"
						color="primary"
					>
						Login
					</Button>
					<Button
						className="bg-primary font-medium text-white"
						color="secondary"
						endContent={<Icon icon="solar:alt-arrow-right-linear" />}
						radius="full"
						variant="flat"
					>
						Get Started
					</Button>
				</NavbarItem>
			</NavbarContent>
		</>
	);
}
