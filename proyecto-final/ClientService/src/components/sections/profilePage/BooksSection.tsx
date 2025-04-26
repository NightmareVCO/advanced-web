'use client';

import { Input, Tab, Tabs } from '@heroui/react';
import { SearchIcon } from '@heroui/shared-icons';
import ProductsGridNoCart from '@components/products/ProductsGridNoCart';
import type { Order, OrderItem } from '@lib/fetch/orders.fetch';
import BooksTable from '@components/tables/booksTable/BooksTable';
import OrdersTable from '@components/tables/booksTable/OrdersTable';
import { useCallback, useMemo, useState } from 'react';

type BooksSection = {
	products: OrderItem[];
	orders: Order[];
};

export default function BooksSection({ products, orders }: BooksSection) {
	const [filterValue, setFilterValue] = useState('');
	const onSearchChange = useCallback((value?: string) => {
		setFilterValue(value || '');
	}, []);

	const filteredProducts = useMemo(() => {
		return products.filter((p) =>
			p.bookName.toLowerCase().includes(filterValue.toLowerCase()),
		);
	}, [filterValue, products]);

	return (
		<section className="flex flex-col items-center justify-center w-[90%] h-full mt-4">
			<Tabs
				color="primary"
				variant="bordered"
				fullWidth
				classNames={{
					tabContent: 'group-data-[selected=true]:text-white',
				}}
			>
				<Tab key="books" title="Books - Overview">
					<div className="block border-dashed rounded-medium border-medium border-divider">
						<Input
							isClearable
							classNames={{
								base: 'w-full p-4',
								inputWrapper: 'border-1',
							}}
							placeholder="Search by title..."
							size="sm"
							startContent={<SearchIcon className="text-default-300" />}
							value={filterValue}
							variant="bordered"
							onClear={() => setFilterValue('')}
							onValueChange={onSearchChange}
						/>
						<ProductsGridNoCart
							className="grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
							products={filteredProducts}
						/>
					</div>
				</Tab>
				<Tab key="books-list" title="Books - List">
					<div className="block w-full border-dashed rounded-medium border-medium border-divider">
						<BooksTable orders={products} />
					</div>
				</Tab>
				<Tab key="orders-list" title="Orders - List">
					<div className="block w-full border-dashed rounded-medium border-medium border-divider">
						<OrdersTable orders={orders} />
					</div>
				</Tab>
			</Tabs>
		</section>
	);
}
