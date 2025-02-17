'use client';

import type { NavbarProps } from '@heroui/react';

import {
	Button,
	Divider,
	Link,
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	NavbarMenu,
	NavbarMenuItem,
	NavbarMenuToggle,
	cn,
} from '@heroui/react';
import { Icon } from '@iconify/react';
import React from 'react';

import { AcmeIcon } from '@components/social/Social';

const menuItems = ['Home', 'Students'];

export const MainNavbar = React.forwardRef<HTMLElement, NavbarProps>(
	({ classNames = {}, ...props }, ref) => {
		const [isMenuOpen, setIsMenuOpen] = React.useState(false);

		return (
			<Navbar
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
				height="60px"
				isMenuOpen={isMenuOpen}
				onMenuOpenChange={setIsMenuOpen}
			>
				{/* Left Content */}
				<NavbarBrand>
					<Link href="/">
						<div className="rounded-full bg-default-foreground text-background">
							<AcmeIcon size={34} />
						</div>
						<span className="ml-2 font-medium text-small text-default-foreground">
							STUDENT MUCK
						</span>
					</Link>
				</NavbarBrand>

				{/* Center Content */}
				<NavbarContent justify="center">
					<NavbarItem
						isActive
						className="data-[active='true']:font-medium[date-active='true']"
					>
						<Link
							aria-current="page"
							className="text-default-foreground"
							href="/"
							size="sm"
						>
							Home
						</Link>
					</NavbarItem>
					<NavbarItem>
						<Link className="text-default-500" href="/students" size="sm">
							Students
						</Link>
					</NavbarItem>
				</NavbarContent>

				{/* Right Content */}
				<NavbarContent className="hidden md:flex" justify="end">
					<NavbarItem className="ml-2 !flex gap-2">
						<Button
							className="font-medium bg-default-foreground text-background"
							color="secondary"
							endContent={<Icon icon="solar:alt-arrow-right-linear" />}
							radius="full"
							variant="flat"
							as={Link}
							href="/students"
						>
							Get Started
						</Button>
					</NavbarItem>
				</NavbarContent>

				<NavbarMenuToggle className="text-default-400 md:hidden" />

				<NavbarMenu
					className="top-[calc(var(--navbar-height)_-_1px)] max-h-fit bg-default-200/50 pb-6 pt-6 shadow-medium backdrop-blur-md backdrop-saturate-150 dark:bg-default-100/50"
					motionProps={{
						initial: { opacity: 0, y: -20 },
						animate: { opacity: 1, y: 0 },
						exit: { opacity: 0, y: -20 },
						transition: {
							ease: 'easeInOut',
							duration: 0.2,
						},
					}}
				>
					<NavbarMenuItem>
						<Button fullWidth as={Link} href="/#" variant="faded">
							Sign In
						</Button>
					</NavbarMenuItem>
					<NavbarMenuItem className="mb-4">
						<Button
							fullWidth
							as={Link}
							className="bg-foreground text-background"
							href="/#"
						>
							Get Started
						</Button>
					</NavbarMenuItem>
					{menuItems.map((item, index) => (
						<NavbarMenuItem
							key={`${item}-${
								// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
								index
							}`}
						>
							<Link className="w-full mb-2 text-default-500" href="#" size="md">
								{item}
							</Link>
							{index < menuItems.length - 1 && (
								<Divider className="opacity-50" />
							)}
						</NavbarMenuItem>
					))}
				</NavbarMenu>
			</Navbar>
		);
	},
);

export default MainNavbar;
