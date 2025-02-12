import { Link, NavbarItem } from '@heroui/react';
import type { MenuItem } from '../_config/config';

type NavbarDesktopItemsProps = {
	menuItems: MenuItem[];
	pathName?: string;
	admin?: boolean;
};

export default function NavbarDesktopItems({
	pathName,
	menuItems,
	admin,
}: NavbarDesktopItemsProps) {
	const isActive = (href: string) => href === pathName;

	return (
		<>
			{menuItems
				.filter((item) => admin || !item.admin)
				.map((item, index) => (
					<NavbarItem
						key={`${item}-${
							// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
							index
						}`}
						isActive={item.href === pathName}
					>
						<Link
							color={isActive(item.href) ? 'primary' : 'foreground'}
							href={item.href}
							size="lg"
						>
							{item.name}
						</Link>
					</NavbarItem>
				))}
		</>
	);
}
