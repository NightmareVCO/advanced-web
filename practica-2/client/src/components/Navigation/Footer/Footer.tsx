'use client';

import { Chip, Divider } from '@heroui/react';
import React from 'react';

import BrandLogoIcon from '@/components/Icons/BrandLogoIcon';

export default function Footer() {
	const currentYear = new Date().getFullYear();
	const rights = `© ${currentYear} Mockify. All rights reserved.`;

	return (
		<footer className="flex w-full flex-col">
			<div className="mx-auto w-full max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
				<div className="mt-4 md:order-1 md:mt-0">
					<div className="flex items-center justify-center gap-3 md:justify-start">
						<div className="flex items-center">
							<BrandLogoIcon />
						</div>
						<Divider className="h-4" orientation="vertical" />
						<Chip
							className="border-none px-0 text-default-500"
							color="success"
							variant="dot"
						>
							All systems operational
						</Chip>
					</div>
					<p className="text-center text-tiny text-default-400 md:text-start">
						{rights}
					</p>
				</div>
			</div>
		</footer>
	);
}
