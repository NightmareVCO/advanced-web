'use client';

import { cn } from '@heroui/react';
import React from 'react';

import type { OrderItem } from '@/lib/fetch/orders.fetch';
import ProductListItemNoCart from './ProductListItemNoCart';

export type ProductGridProps = React.HTMLAttributes<HTMLDivElement> & {
	itemClassName?: string;
	products: OrderItem[];
};

const ProductsGridNoCart = React.forwardRef<HTMLDivElement, ProductGridProps>(
	({ itemClassName, products, className, ...props }, ref) => {
		return (
			<div
				ref={ref}
				className={cn(
					'grid w-full grid-cols-1 gap-0 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5',
					className,
				)}
				{...props}
			>
				{products.map((product) => (
					<ProductListItemNoCart
						key={product.bookId}
						removeWrapper
						{...product}
						className={cn('w-full snap-start', itemClassName)}
					/>
				))}
				{products.length === 0 && (
					<div className="flex items-center justify-center w-full h-full col-span-4">
						<p className="text-default-500 text-center">No books found</p>
					</div>
				)}
			</div>
		);
	},
);

ProductsGridNoCart.displayName = 'ProductsGridNoCart';

export default ProductsGridNoCart;
