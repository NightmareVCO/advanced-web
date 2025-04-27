'use client';

import { Pagination as HPagination } from '@heroui/react';
import { useRouter, useSearchParams } from 'next/navigation';

type PaginationProps = {
	total: number;
	page: number;
	pageSize: number;
};

export default function Pagination({ total, page, pageSize }: PaginationProps) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const totalPages = Math.ceil(total / pageSize);

	const handleChange = (newPage: number) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set('page', newPage.toString());

		router.push(`?${params.toString()}`, { scroll: false });
	};

	return (
		<HPagination
			loop
			showControls
			color="primary"
			classNames={{
				cursor: 'text-white',
			}}
			page={page}
			total={totalPages}
			onChange={handleChange}
		/>
	);
}
