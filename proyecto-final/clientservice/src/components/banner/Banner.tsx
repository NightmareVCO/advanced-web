'use client';

import { Button, Link } from '@heroui/react';
import { Icon } from '@iconify/react';
import { NavbarLinks } from '@lib/constants/navbar.constants';
import React, { useState } from 'react';

export default function Banner() {
	const [visible, setVisible] = useState(true);
	if (!visible) return null;

	return (
		<div className="flex w-full items-center gap-x-3 border-b-1 border-divider bg-primary px-6 py-2 sm:px-3.5 sm:before:flex-1">
			<p className="hidden text-white text-small md:block">
				<Link
					className="text-inherit"
					href={`${NavbarLinks.CATALOG}?new_release=true`}
				>
					Check our{'\u00A0'}
					<span className="font-semibold">new books</span>
					{'\u00A0'}added to the collection.
				</Link>
			</p>
			<p className="text-white text-small md:hidden">New books added.</p>
			<Button
				as={Link}
				size="sm"
				className="relative overflow-hidden font-medium group h-9 text-small text-primary"
				color="default"
				endContent={
					<Icon
						className="flex-none outline-none transition-transform group-data-[hover=true]:translate-x-0.5 [&>path]:stroke-[2]"
						icon="solar:arrow-right-linear"
						width={16}
					/>
				}
				href={`${NavbarLinks.CATALOG}?new_release=true`}
			>
				<span className="flex items-center gap-x-1.5 text-primary">
					Explore
				</span>
			</Button>
			<div className="flex justify-end flex-1">
				<Button
					isIconOnly
					aria-label="Close Banner"
					className="-m-1"
					size="sm"
					variant="light"
					onPress={() => setVisible(false)}
				>
					<Icon
						aria-hidden="true"
						className="text-white"
						icon="lucide:x"
						width={20}
					/>
				</Button>
			</div>
		</div>
	);
}
