'use client';

import BookHiveBranIcon from '@components/icons/BrandIcon';
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
} from '@heroui/react';
import { type NavbarLink, NavbarLinks } from '@lib/constants/navbar.constants';

// export const SearchIcon = ({
// 	size = 24,
// 	strokeWidth = 1.5,
// 	width,
// 	height,
// 	...props
// }) => {
// 	return (
// 		<svg
// 			aria-hidden="true"
// 			fill="none"
// 			focusable="false"
// 			height={height || size}
// 			role="presentation"
// 			viewBox="0 0 24 24"
// 			width={width || size}
// 			{...props}
// 		>
// 			<path
// 				d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
// 				stroke="currentColor"
// 				strokeLinecap="round"
// 				strokeLinejoin="round"
// 				strokeWidth={strokeWidth}
// 			/>
// 			<path
// 				d="M22 22L20 20"
// 				stroke="currentColor"
// 				strokeLinecap="round"
// 				strokeLinejoin="round"
// 				strokeWidth={strokeWidth}
// 			/>
// 		</svg>
// 	);
// };

type NavbarProps = {
	navbarItems?: NavbarLink[];
};

export default function Navbar({ navbarItems }: NavbarProps) {
	return (
		<HeroNavbar isBordered>
			<NavbarContent justify="start">
				<NavbarBrand>
					<BookHiveBranIcon width={80} height={100} />
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
				<Button
					as={Link}
					href={NavbarLinks.LOGIN}
					color="primary"
					className="text-white"
				>
					LogIn
				</Button>

				{/* <Input
					classNames={{
						base: 'max-w-full sm:max-w-[10rem] h-10',
						mainWrapper: 'h-full',
						input: 'text-small',
						inputWrapper:
							'h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20',
					}}
					placeholder="Type to search..."
					size="sm"
					startContent={<SearchIcon size={18} />}
					type="search"
				/>
				<Dropdown placement="bottom-end">
					<DropdownTrigger>
						<Avatar
							isBordered
							as="button"
							className="transition-transform"
							color="secondary"
							name="Jason Hughes"
							size="sm"
							src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
						/>
					</DropdownTrigger>
					<DropdownMenu aria-label="Profile Actions" variant="flat">
						<DropdownItem key="profile" className="gap-2 h-14">
							<p className="font-semibold">Signed in as</p>
							<p className="font-semibold">zoey@example.com</p>
						</DropdownItem>
						<DropdownItem key="settings">My Settings</DropdownItem>
						<DropdownItem key="logout" color="danger">
							Log Out
						</DropdownItem>
					</DropdownMenu>
				</Dropdown> */}
			</NavbarContent>
		</HeroNavbar>
	);
}
