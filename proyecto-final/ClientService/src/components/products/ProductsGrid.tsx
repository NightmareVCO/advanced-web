'use client';

import { cn } from '@heroui/react';
import React from 'react';

import type { Product } from '@/lib/data/products.data';
import ProductListItem from '@components/products/ProductsList';

export type ProductGridProps = React.HTMLAttributes<HTMLDivElement> & {
	itemClassName?: string;
	products: Product[];
};

const ProductsGrid = React.forwardRef<HTMLDivElement, ProductGridProps>(
	({ itemClassName, products, className, ...props }, ref) => {
		return (
			<div
				ref={ref}
				className={cn(
					'grid w-full grid-cols-1 gap-0 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
					className,
				)}
				{...props}
			>
				{products.map((product) => (
					<ProductListItem
						key={product.id}
						removeWrapper
						{...product}
						className={cn('w-full snap-start', itemClassName)}
					/>
				))}
				{products.length === 0 && (
					<div className="flex items-center justify-center w-full h-full col-span-4">
						<p className="text-default-500">No books found</p>
					</div>
				)}
			</div>
		);
	},
);

ProductsGrid.displayName = 'ProductsGrid';

export default ProductsGrid;
