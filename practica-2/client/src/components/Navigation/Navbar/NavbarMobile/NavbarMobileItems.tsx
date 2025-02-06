import { Divider, Link, NavbarMenuItem } from '@heroui/react';
import type { MenuItem } from '../_config/config';

type NavbarMobileItemsProps = {
	mobileMenuItems: MenuItem[];
};

export default function NavbarMobileItems({
	mobileMenuItems,
}: NavbarMobileItemsProps) {
	return (
		<>
			{mobileMenuItems.map((item, index) => (
				<NavbarMenuItem
					key={`${item}-${
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						index
					}`}
				>
					<Link className="mb-2 w-full text-default-500" href={item.href}>
						{item.name}
					</Link>
					{index < mobileMenuItems.length - 1 && (
						<Divider className="opacity-50" />
					)}
				</NavbarMenuItem>
			))}
		</>
	);
}
