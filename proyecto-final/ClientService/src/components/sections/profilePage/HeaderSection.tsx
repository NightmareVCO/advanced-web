'use client';

import { BreadcrumbItem, Breadcrumbs } from '@heroui/react';
import { useRouter } from 'next/navigation';

export default function HeaderSection() {
	const router = useRouter();

	return (
		<div className="w-full">
			<nav className="flex justify-start w-full px-10 py-2 bg-white border-b">
				<Breadcrumbs>
					<BreadcrumbItem onPress={() => router.push('/')}>Home</BreadcrumbItem>
					<BreadcrumbItem isCurrent isLast color="primary">
						Profile
					</BreadcrumbItem>
				</Breadcrumbs>
			</nav>
		</div>
	);
}
