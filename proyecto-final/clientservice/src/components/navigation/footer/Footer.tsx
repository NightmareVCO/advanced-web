'use client';

import type { IconProps } from '@iconify/react';

import { Link, Spacer } from '@heroui/react';
import React from 'react';

import BookHiveIsologoIcon from '@components/icons/IsologoIcon';
import { type NavbarLink, NavbarLinks } from '@lib/constants/navbar.constants';

type SocialIconProps = Omit<IconProps, 'icon'>;

const CURRENT_YEAR = new Date().getFullYear();

type footerProps = {
	footerItems?: NavbarLink[];
};
export default function Footer({ footerItems }: footerProps) {
	return (
		<div className="flex flex-col justify-center p-4 mx-auto mb-6 rounded-xl max-w-7xl bg-primary">
			<div className="flex items-center justify-center">
				<Link href={NavbarLinks.HOME}>
					<BookHiveIsologoIcon width={236} height={172} />
				</Link>
			</div>
			<Spacer y={4} />
			<div className="flex flex-wrap justify-center gap-x-12 gap-y-1">
				{footerItems?.map((item) => (
					<Link
						key={item.label}
						isExternal
						className="font-semibold transition text-default-400 hover:scale-110 hover:text-white"
						href={item.href}
						size="sm"
					>
						{item.label}
					</Link>
				))}
			</div>
			<Spacer y={6} />

			<p className="mt-1 text-center text-small text-default-400">
				&copy; {CURRENT_YEAR} BookHive. All rights reserved.
			</p>
		</div>
	);
}
