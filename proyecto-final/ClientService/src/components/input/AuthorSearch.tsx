'use client';

import { Input } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

export default function AuthorSearch() {
	const router = useRouter();
	const searchParams = useSearchParams();

	const urlAuthor = searchParams.get('author') || '';

	const [author, setAuthor] = useState<string>(urlAuthor);

	const updateQuery = useDebouncedCallback((author: string) => {
		const params = new URLSearchParams(Array.from(searchParams.entries()));

		if (author) {
			params.set('author', author);
		} else {
			params.delete('author');
		}

		router.push(`?${params.toString()}`, { scroll: false });
	}, 500);

	useEffect(() => {
		setAuthor(urlAuthor);
	}, [urlAuthor]);

	return (
		<Input
			className="w-full max-w-[200px]"
			placeholder="Search by author"
			variant="bordered"
			isClearable
			value={author}
			startContent={
				<Icon
					className="text-default-500"
					height={16}
					icon="lucide:search"
					width={16}
				/>
			}
			onValueChange={(value) => {
				setAuthor(value);
				updateQuery(value);
			}}
		/>
	);
}
