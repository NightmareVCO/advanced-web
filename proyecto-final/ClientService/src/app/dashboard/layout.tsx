'use client';

import { Avatar, Button, ScrollShadow, Spacer } from '@heroui/react';
import { cn } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useMediaQuery } from 'usehooks-ts';

import { usePathname } from 'next/navigation';

import BookHiveIsologoIcon from '@/components/icons/IsologoIcon';
import { useAuthStore } from '@/lib/stores/useAuthStore';
import Sidebar from '@components/sidebar/Sidebar';
import { items } from '@components/sidebar/SidebarItems';
import { useCallback, useState } from 'react';

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const user = useAuthStore((state) => state.user);

	const [isCollapsed, setIsCollapsed] = useState(false);
	const isMobile = useMediaQuery('(max-width: 768px)');

	const pathname = usePathname();
	const segments = pathname.split('/').filter(Boolean);
	const currentPath = segments[1] ?? segments[0] ?? '';

	const isCompact = isCollapsed || isMobile;

	const onToggle = useCallback(() => {
		setIsCollapsed((prev) => !prev);
	}, []);

	if (!user) return null;

	return (
		<div className="flex h-full min-h-[48rem] w-full bg-white">
			<div
				className={cn(
					'relative flex h-[1600px] w-72 flex-col !border-r-small rounded-br-lg border-divider bg-primary p-6 transition-width',
					{
						'w-16 items-center px-2 py-6': isCompact,
					},
				)}
			>
				<div
					className={cn(
						'flex items-center gap-3 px-3',

						{
							'justify-center gap-0': isCompact,
						},
					)}
				>
					<div className="flex items-center justify-center w-14 h-14">
						<BookHiveIsologoIcon />
					</div>
				</div>
				<Spacer y={8} />
				<div className="flex items-center gap-3 px-3">
					<Avatar
						isBordered
						as="button"
						className="transition-transform"
						color="secondary"
						name={user.username}
						size="sm"
						src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
					/>
					<div
						className={cn('flex max-w-full flex-col', { hidden: isCompact })}
					>
						<p className="font-medium text-white truncate text-small">
							{user.firstName} {user.lastName}
						</p>
						<p className="text-white truncate text-tiny">{user.roles}</p>
					</div>
				</div>
				<ScrollShadow className="h-full max-h-full py-6 pr-6 -mr-6">
					<Sidebar
						defaultSelectedKey="home"
						selectedKeys={[currentPath]}
						isCompact={isCompact}
						items={items}
					/>
				</ScrollShadow>
				<Spacer y={2} />
			</div>
			<div className="flex-col flex-1 w-full p-4">
				<header className="flex items-center gap-3 p-4 rounded-medium border-small border-divider">
					<Button isIconOnly size="sm" variant="light" onPress={onToggle}>
						<Icon
							className="text-primary-500"
							height={24}
							icon="solar:sidebar-minimalistic-outline"
							width={24}
						/>
					</Button>
					<h2 className="font-medium text-medium text-primary-700">Overview</h2>
				</header>
				<main className="w-full h-full mt-4 overflow-visible">
					<div className="flex h-[90%] w-full flex-col gap-4 rounded-medium border-small border-divider p-6">
						{children}
					</div>
				</main>
			</div>
		</div>
	);
}
