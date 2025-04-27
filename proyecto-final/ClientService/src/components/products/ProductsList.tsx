'use client';

import { Button, Image, Link, Tooltip } from '@heroui/react';
import { cn } from '@heroui/react';
import React, { useEffect, useMemo } from 'react';

import { Icon } from '@iconify/react';

import type { Product } from '@lib/data/products.data';
import { useAuthStore } from '@lib/stores/useAuthStore';
import { useShoppingCart } from '@lib/stores/useShoppingCart';

export type ProductListItemProps = Omit<
	React.HTMLAttributes<HTMLDivElement>,
	'id'
> & {
	isPopular?: boolean;
	removeWrapper?: boolean;
} & Product;

const ProductListItem = React.forwardRef<HTMLDivElement, ProductListItemProps>(
	(
		{
			id,
			title,
			price,
			author,
			description,
			cover,
			removeWrapper,
			className,
			...props
		},
		ref,
	) => {
		const randomRotate = useMemo(
			() => (Math.random() < 0.5 ? 'hover:-rotate-1' : 'hover:rotate-1'),
			[],
		);

		const user = useAuthStore((state) => state.user);
		const shoppingCart = useShoppingCart();

		useEffect(() => {
			if (shoppingCart.user?.id !== user?.id && user) {
				shoppingCart.setUser(user);
				shoppingCart.getCart();
			}
		}, [user, shoppingCart]);

		return (
			<div
				ref={ref}
				className={cn(
					'relative flex w-64 max-w-full flex-none scroll-ml-6 flex-col gap-3 rounded-large bg-content1 p-4 shadow-medium',
					{
						'rounded-none bg-transparent shadow-none': removeWrapper,
					},
					className,
				)}
				{...props}
			>
				<div
					className={cn(
						'relative flex h-52 max-h-full w-full flex-col items-center justify-center overflow-visible rounded-medium',
					)}
				>
					<div
						className={cn(
							'relative aspect-[2/3] w-full overflow-hidden shadow-xl rounded-tr-xl rounded-br-xl flex  transition-all duration-300 ease-in-out hover:scale-105',
							randomRotate,
						)}
					>
						<div className="w-3 bg-gradient-to-r from-amber-950/70 to-amber-950/50 rounded-l-md shrink-0" />

						<div className="relative z-20 flex-1 pb-3 overflow-hidden shadow-xl">
							<Link href={`/catalog/book/${id}`} className="w-full h-full">
								<Image
									removeWrapper
									alt={title}
									className={cn(
										'object-cover object-center w-full h-full',
										'rounded-tl-none rounded-bl-none',
									)}
									src={cover}
								/>
							</Link>

							<div className="absolute inset-0 z-30 pointer-events-none bg-gradient-to-t from-black/10 via-transparent to-white/10" />

							<div className="absolute bottom-0 left-0 right-0 z-40 h-4">
								<div className="w-full h-full shadow-md rounded-br-md bg-gradient-to-t from-slate-300 to-slate-200/10" />
							</div>
						</div>
					</div>
				</div>
				<div className="flex flex-col gap-3 px-1">
					<div className={cn('flex flex-col items-start justify-center')}>
						<h3 className="font-medium text-black text-medium h-[3.5rem] overflow-hidden">
							{title.length > 20 ? (
								<span>{title.slice(0, 30)}</span>
							) : (
								<span>
									{title}
									<br />
									<br />
								</span>
							)}
						</h3>
						<p className="font-medium text-medium text-default-500 truncate max-w-full h-[1.25rem] mb-2">
							({author})
						</p>
						<p className="font-medium text-medium text-primary">${price}</p>
					</div>
					<div className="flex gap-2">
						{/* {user && (

						)} */}
						<Button
							fullWidth
							className="font-medium text-white text-medium"
							color="primary"
							startContent={<Icon icon="lucide:shopping-cart" width={20} />}
							isDisabled={!user}
							as={Link}
							href={`/catalog/book/${id}`}
							// onPress={() => {
							// 	if (!user) return null;

							// 	shoppingCart.addItem({
							// 		bookId: id,
							// 	});
							// }}
						>
							See Details
						</Button>
						{/* {!user && (
							<Tooltip content="You need to be logged in to add items to the cart">
								<Button
									fullWidth
									className="font-medium text-white text-medium"
									color="primary"
									startContent={<Icon icon="lucide:shopping-cart" width={20} />}
								>
									Add to cart
								</Button>
							</Tooltip>
						)} */}
					</div>
				</div>
			</div>
		);
	},
);

ProductListItem.displayName = 'ProductListItem';

export default ProductListItem;
