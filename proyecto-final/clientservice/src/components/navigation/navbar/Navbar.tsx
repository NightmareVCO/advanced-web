'use client';

import BookHiveBranIcon from '@components/icons/BrandIcon';
import ShoppingCart from '@components/shoppingCart/ShoppingCart';
import {
	Avatar,
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	Navbar as HeroNavbar,
	Input,
	Link,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	NavbarMenu,
	NavbarMenuItem,
	NavbarMenuToggle,
} from '@heroui/react';
import { type NavbarLink, NavbarLinks } from '@lib/constants/navbar.constants';
import { useAuthStore } from '@lib/stores/useAuthStore';
import { useState } from 'react';

type NavbarProps = {
	navbarItems?: NavbarLink[];
};

export default function Navbar({ navbarItems }: NavbarProps) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const user = useAuthStore((state) => state.user);

	return (
		<HeroNavbar position="sticky" isBordered onMenuOpenChange={setIsMenuOpen}>
			<NavbarContent justify="start">
				<NavbarMenuToggle
					aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
					className="sm:hidden"
				/>
				<NavbarBrand>
					<Link href={NavbarLinks.HOME}>
						<BookHiveBranIcon width={80} height={100} />
					</Link>
				</NavbarBrand>
			</NavbarContent>

			<NavbarContent className="hidden sm:flex" justify="center">
				{navbarItems?.map((item: NavbarLink) => (
					<NavbarItem key={item.label}>
						<Link href={item.href} className="transition hover:scale-110">
							{item.icon}
							{item.label}
						</Link>
					</NavbarItem>
				))}
			</NavbarContent>

			<NavbarContent as="div" justify="end">
				{!user && (
					<NavbarItem>
						<Button
							as={Link}
							href={NavbarLinks.LOGIN}
							color="primary"
							className="text-white"
						>
							LogIn
						</Button>
					</NavbarItem>
				)}

				{user && (
					<NavbarItem>
						<ShoppingCart />
					</NavbarItem>
				)}

				{user && (
					<NavbarItem>
						<Dropdown placement="bottom-end">
							<DropdownTrigger>
								<Avatar
									isBordered
									as="button"
									className="transition-transform"
									color="primary"
									name={user.username}
									size="sm"
									src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
								/>
							</DropdownTrigger>
							<DropdownMenu
								aria-label="Profile Actions"
								variant="flat"
								disabledKeys={user.isAdmin ? [] : ['dashboard']}
							>
								<DropdownItem
									key="user"
									className="gap-2 h-14 data-[hover=true]:bg-white"
									isReadOnly
								>
									<p className="font-semibold">Signed in as</p>
									<p className="font-semibold">{user.username}</p>
								</DropdownItem>
								<DropdownItem key="dashboard" as={Link} href="/dashboard">
									Dashboard
								</DropdownItem>

								<DropdownItem key="profile" as={Link} href="/profile">
									My Books
								</DropdownItem>
								<DropdownItem
									key="logout"
									color="danger"
									className="text-danger"
									as={Link}
									href="/auth/logout"
								>
									Log Out
								</DropdownItem>
							</DropdownMenu>
						</Dropdown>
					</NavbarItem>
				)}
			</NavbarContent>

			<NavbarMenu>
				{navbarItems?.map((item, index) => (
					<NavbarMenuItem key={`${item.label}-${index}`}>
						<Link
							className="w-full"
							color="foreground"
							href={item.href}
							size="lg"
						>
							{item.icon}
							{item.label}
						</Link>
					</NavbarMenuItem>
				))}
				<NavbarMenuItem>
					<Link
						className="w-full"
						color="primary"
						href={NavbarLinks.LOGIN}
						size="lg"
					>
						LogIn
					</Link>
				</NavbarMenuItem>
			</NavbarMenu>
		</HeroNavbar>
	);
}
