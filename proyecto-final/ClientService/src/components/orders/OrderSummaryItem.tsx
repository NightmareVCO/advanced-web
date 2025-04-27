'use client';

import { Button, Image, Link, Tooltip } from '@heroui/react';
import { cn } from '@heroui/react';
import { Icon } from '@iconify/react';
import type { CartItem } from '@lib/stores/useShoppingCart';
import React from 'react';

export type OrderSummaryItemProps = React.HTMLAttributes<HTMLLIElement> &
	CartItem & {
		removeFromCart?: ({ cartItemId }: { cartItemId: string }) => void;
	};

const OrderSummaryItem = React.forwardRef<HTMLLIElement, OrderSummaryItemProps>(
	({ children, id, cartItemId, book, color, className, ...props }, ref) => (
		<li
			ref={ref}
			className={cn(
				'flex items-center gap-x-4 border-b-small border-divider py-10',
				className,
			)}
			{...props}
		>
			<div className="flex items-center justify-center flex-shrink-0 h-52 w-36">
				<div
					className={cn(
						'relative aspect-[2/3] overflow-hidden shadow-md rounded-tr-xl rounded-br-xl flex z-10',
					)}
				>
					<div className="w-3 bg-gradient-to-r from-amber-950/70 to-amber-950/50 rounded-l-md shrink-0" />

					<div className="relative z-20 flex-1 pb-3 overflow-hidden shadow-sm">
						<Image
							removeWrapper
							alt={book.title}
							className={cn(
								'object-cover object-center w-full h-full',
								'rounded-tl-none rounded-bl-none',
							)}
							src={book.cover}
						/>

						<div className="absolute inset-0 z-30 pointer-events-none bg-gradient-to-t from-black/10 via-transparent to-white/10" />

						<div className="absolute bottom-0 left-0 right-0 z-40 h-4">
							<div className="w-full h-full shadow-md rounded-br-md bg-gradient-to-t from-slate-300 to-slate-200/10" />
						</div>
					</div>
				</div>
			</div>
			<div className="flex flex-col flex-1">
				<h4 className="text-small">
					<Link
						className="font-medium text-foreground hover:text-primary"
						href={`/catalog/book/${id}`}
						underline="hover"
					>
						{book.title}
					</Link>
				</h4>
				<div className="flex items-center gap-3">
					<p>
						<span className="text-small text-default-500">Author: </span>
						<span className="font-medium capitalize text-small text-default-700">
							{book.author}
						</span>
					</p>
				</div>
				<div className="flex items-center gap-2 mt-2">
					<span className="font-semibold text-small text-default-700">
						${book.price}
					</span>
					<span className="text-small text-default-500">x 1</span>
				</div>
			</div>
			<Tooltip content="Remove" placement="top">
				<Button
					isIconOnly
					className="h-7 w-7 min-w-[1.5rem]"
					radius="full"
					variant="flat"
					color="danger"
					onPress={() => {
						if (props.removeFromCart) {
							props.removeFromCart({ cartItemId });
						}
					}}
				>
					<Icon icon="lucide:x" width={14} />
				</Button>
			</Tooltip>
		</li>
	),
);

OrderSummaryItem.displayName = 'OrderSummaryItem';

export default OrderSummaryItem;
