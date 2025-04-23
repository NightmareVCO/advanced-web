'use client';

import { Select, SelectItem } from '@heroui/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SortInput() {
	const router = useRouter();
	const searchParams = useSearchParams();

	const urlSort = searchParams.get('sort') || 'title_a_to_z';
	const [selectedSort, setSelectedSort] = useState<string>(urlSort);

	useEffect(() => {
		setSelectedSort(urlSort);
	}, [urlSort]);

	const handleChange = (key: string) => {
		setSelectedSort(key);

		const params = new URLSearchParams(Array.from(searchParams.entries()));

		if (key === 'title_a_to_z' || key === 'undefined' || key === undefined) {
			params.delete('sort');
		} else {
			params.set('sort', key);
		}

		router.push(`?${params.toString()}`, { scroll: false });
	};

	return (
		<Select
			aria-label="Sort by"
			selectedKeys={[selectedSort]}
			onSelectionChange={(keys) => {
				const key = Array.from(keys)[0] as string;
				handleChange(key);
			}}
			classNames={{
				base: 'items-center justify-end',
				label:
					'hidden lg:block text-tiny whitespace-nowrap md:text-small text-default-400',
				mainWrapper: 'max-w-xs',
			}}
			label="Sort by"
			labelPlacement="outside-left"
			placeholder="Select an option"
			variant="bordered"
		>
			<SelectItem key="title_a_to_z">Title: A to Z</SelectItem>
			<SelectItem key="title_z_to_a">Title: Z to A</SelectItem>
			<SelectItem key="price_low_to_high">Price: Low to High</SelectItem>
			<SelectItem key="price_high_to_low">Price: High to Low</SelectItem>
			<SelectItem key="author_a_to_z">Author: A to Z</SelectItem>
			<SelectItem key="author_z_to_a">Author: Z to A</SelectItem>
		</Select>
	);
}
