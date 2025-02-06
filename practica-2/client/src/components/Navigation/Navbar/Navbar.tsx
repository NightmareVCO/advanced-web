'use client';

import type { NavbarProps } from '@heroui/react';

import { NavbarMenuToggle, Navbar as NextUINavbar, cn } from '@heroui/react';
import React from 'react';

import NavbarDesktop from './NavbarDesktop/NavbarDesktop';
import NavbarMobile from './NavbarMobile/NavbarMobile';

export const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
	({ classNames = {}, ...props }, ref) => {
		const [isMenuOpen, setIsMenuOpen] = React.useState(false);

		return (
			<NextUINavbar
				ref={ref}
				{...props}
				classNames={{
					base: cn('border-default-100 bg-transparent', {
						'bg-default-200/50 dark:bg-default-100/50': isMenuOpen,
					}),
					wrapper: 'w-full justify-center',
					item: 'hidden md:flex',
					...classNames,
				}}
				height="70px"
				isMenuOpen={isMenuOpen}
				onMenuOpenChange={setIsMenuOpen}
			>
				<NavbarDesktop />

				<NavbarMenuToggle className="text-default-400 md:hidden" />

				<NavbarMobile />
			</NextUINavbar>
		);
	},
);

export default Navbar;
