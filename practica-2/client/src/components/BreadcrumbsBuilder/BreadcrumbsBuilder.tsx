'use client';

import { BreadcrumbItem, Breadcrumbs } from '@heroui/react';

export type BreadCrumbNavigationItem = {
	name: string;
	href: string;
};

type BreadcrumbItemProps = {
	items: BreadCrumbNavigationItem[];
};

export default function BreadcrumbsBuilder({ items }: BreadcrumbItemProps) {
	return (
		<Breadcrumbs>
			{items.map((item) => (
				<BreadcrumbItem key={item.href} href={item.href}>
					{item.name}
				</BreadcrumbItem>
			))}
		</Breadcrumbs>
	);
}
