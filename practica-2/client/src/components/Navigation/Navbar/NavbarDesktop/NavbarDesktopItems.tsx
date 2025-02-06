import { Link, NavbarItem } from '@heroui/react';
import type { MenuItem } from '../_config/config';

type NavbarDesktopItemsProps = {
	menuItems: MenuItem[];
};

export default function NavbarDesktopItems({
	menuItems,
}: NavbarDesktopItemsProps) {
	return (
		<>
			{menuItems.map((item, index) => (
				<NavbarItem
					key={`${item}-${
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						index
					}`}
				>
					<Link className="text-white" href={item.href} size="lg">
						{item.name}
					</Link>
				</NavbarItem>
			))}
		</>
	);
}
