'use client';

import { Button, useDisclosure } from '@heroui/react';
import { Icon } from '@iconify/react';
import React from 'react';

import ProductsGrid from '@/components/products/ProductsGrid';
import FiltersWrapper from '@components/filterWrapper/FilterWrapper';
import AuthorSearch from '@components/input/AuthorSearch';
import TitleSearch from '@components/input/TitleSearch';
import Pagination from '@components/pagination/Pagination';
import SidebarDrawer from '@components/sidebarDrawer/SidebarDrawer';
import ecommerceItems from '@lib/data/ecommerce.data';
import type { BookResult } from '@lib/fetch/books.fetch';
import { useSearchParams } from 'next/navigation';

type BooksSectionProps = {
	booksResult: BookResult;
};

export default function BooksSection({ booksResult }: BooksSectionProps) {
	const searchParams = useSearchParams();
	const pageParam = searchParams.get('page');
	const page = pageParam ? Number.parseInt(pageParam, 10) : 1;
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	return (
		<div className="w-full h-full gap-8 p-4 md:p-8 lg:p-12">
			<div className="flex gap-x-6">
				<SidebarDrawer isOpen={isOpen} onOpenChange={onOpenChange}>
					<FiltersWrapper
						className="bg-default-50"
						items={ecommerceItems}
						scrollShadowClassName="max-h-full pb-12"
						showActions={false}
						title="Filter by"
					/>
				</SidebarDrawer>
				<div className="flex-col flex-1 w-full">
					<header className="relative z-20 flex flex-col gap-2 px-4 pt-2 pb-3 rounded-medium bg-default-50 md:pt-3">
						<div className="flex items-center justify-between gap-1 md:hidden md:gap-2">
							<div>
								<h2 className="font-medium text-large">Books</h2>
								<span className="text-small text-default-400">
									({booksResult.total ?? 0})
								</span>
							</div>
							<div className="flex flex-col items-center justify-center w-full gap-y-3">
								<TitleSearch />
								<AuthorSearch />
							</div>
						</div>
						<div className="flex items-center justify-between gap-2 ">
							<div className="flex flex-row w-full gap-2">
								<Button
									className="flex border-default-200 sm:hidden"
									startContent={
										<Icon
											className="text-default-500"
											height={16}
											icon="solar:filter-linear"
											width={16}
										/>
									}
									variant="bordered"
									onPress={onOpen}
								>
									Filters
								</Button>
								<div className="items-center justify-between hidden w-full md:min-w-[750px] gap-1 md:flex">
									<div className="flex items-center justify-center gap-1">
										<h2 className="font-medium text-large">Books</h2>
										<span className="text-small text-default-400">
											({booksResult.total ?? 0})
										</span>
									</div>
									<div className="flex items-center justify-end w-full gap-x-3">
										<TitleSearch />
										<AuthorSearch />
									</div>
								</div>
							</div>
						</div>
					</header>
					<main className="w-full h-full px-1 mt-4 overflow-visible">
						<div className="block border-dashed rounded-medium border-medium border-divider">
							<ProductsGrid
								className="grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
								products={booksResult.books ?? []}
							/>
						</div>
						<div className="flex items-center justify-center w-full mt-5 mb-2">
							<Pagination
								total={booksResult.total ?? 0}
								page={page}
								pageSize={booksResult.pageSize ?? 10}
							/>
						</div>
					</main>
				</div>
			</div>
		</div>
	);
}
