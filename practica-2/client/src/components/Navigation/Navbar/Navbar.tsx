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
					item: [
						'hidden md:flex',
						'flex',
						'relative',
						'h-full',
						'items-center',
						"data-[active=true]:after:content-['']",
						'data-[active=true]:after:absolute',
						'data-[active=true]:after:bottom-0',
						'data-[active=true]:after:left-0',
						'data-[active=true]:after:right-0',
						'data-[active=true]:after:h-[2px]',
						'data-[active=true]:after:rounded-[2px]',
						'data-[active=true]:after:bg-primary',
					],
					...classNames,
				}}
				height="60px"
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
