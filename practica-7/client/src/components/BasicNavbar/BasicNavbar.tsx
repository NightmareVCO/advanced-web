import type { NavbarProps } from '@heroui/react';

import { mobileMenuItems } from '@config/BasicNavbar/basicNavbar.config';
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

const BasicNavbar = React.forwardRef<HTMLElement, NavbarProps>(
	({ classNames = {}, ...props }, ref) => {
		const [isMenuOpen, setIsMenuOpen] = React.useState(false);

		return (
			<Navbar
				ref={ref}
				{...props}
				classNames={{
					base: cn('border-default-100 bg-black', {
						'bg-default-200/50': isMenuOpen,
					}),
					wrapper: 'w-full justify-center',
					item: 'hidden md:flex',
					...classNames,
				}}
				height="60px"
				isMenuOpen={isMenuOpen}
				onMenuOpenChange={setIsMenuOpen}
				isBlurred
			>
				{/* Left Content */}
				<NavbarBrand>
					<Link href="/" size="lg">
						<div className="text-white rounded-full bg-default-foreground">
							<Icon icon="lucide:computer" width="24" height="24" color="6B62FF" />
						</div>
						<span className="ml-2 text-lg font-bold text-main-color">LabReservations</span>
					</Link>
				</NavbarBrand>

				{/* Right Content */}
				<NavbarContent className="hidden md:flex" justify="end">
					<NavbarItem className="ml-2 !flex gap-2">
						<Button
							as={Link}
							href="/reservas"
							className="font-medium text-black bg-main-color"
							color="secondary"
							endContent={<Icon icon="solar:alt-arrow-right-linear" />}
							radius="full"
							variant="flat"
						>
							Reservas
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
						<Button fullWidth as={Link} href="/" variant="faded">
							Inicio
						</Button>
					</NavbarMenuItem>
					<NavbarMenuItem className="mb-4">
						<Button fullWidth as={Link} className="bg-foreground text-background" href="/#">
							Reservaciones
						</Button>
					</NavbarMenuItem>
					{mobileMenuItems.map((item, index) => (
						<NavbarMenuItem key={`${item}-${index + 1}`}>
							<Link className="w-full mb-2 text-default-500" href="#" size="md">
								{item}
							</Link>
							{index < mobileMenuItems.length - 1 && <Divider className="opacity-50" />}
						</NavbarMenuItem>
					))}
				</NavbarMenu>
			</Navbar>
		);
	},
);

BasicNavbar.displayName = 'BasicNavbar';

export default BasicNavbar;
