import { Link, NavbarItem } from '@heroui/react';
import type { MenuItem } from '../_config/config';

type NavbarDesktopItemsProps = {
	menuItems: MenuItem[];
	pathName?: string;
};

export default function NavbarDesktopItems({
	pathName,
	menuItems,
}: NavbarDesktopItemsProps) {
	const isActive = (href: string) => href === pathName;

	return (
		<>
			{menuItems.map((item, index) => (
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
