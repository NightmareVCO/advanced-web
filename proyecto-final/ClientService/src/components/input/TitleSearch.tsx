'use client';

import { Input } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

export default function TitleSearch() {
	const router = useRouter();
	const searchParams = useSearchParams();

	const urlTitle = searchParams.get('title') || '';

	const [title, setTitle] = useState<string>(urlTitle);

	const updateQuery = useDebouncedCallback((title: string) => {
		const params = new URLSearchParams(Array.from(searchParams.entries()));

		if (title) {
			params.set('title', title);
		} else {
			params.delete('title');
		}

		router.push(`?${params.toString()}`, { scroll: false });
	}, 500);

	useEffect(() => {
		setTitle(urlTitle);
	}, [urlTitle]);

	return (
		<Input
			className="w-full max-w-[200px]"
			placeholder="Search by title"
			variant="bordered"
			isClearable
			value={title}
			startContent={
				<Icon
					className="text-default-500"
					height={16}
					icon="lucide:search"
					width={16}
				/>
			}
			onValueChange={(value) => {
				setTitle(value); // Update the local state
				updateQuery(value); // Update the URL
			}}
		/>
	);
}
