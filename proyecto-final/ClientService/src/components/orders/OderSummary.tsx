'use client';

import { Divider } from '@heroui/react';
import React from 'react';

import OrderSummaryItem from '@components/orders/OrderSummaryItem';
import type { CartItem } from '@lib/stores/useShoppingCart';

export type OrderSummaryProps = React.HTMLAttributes<HTMLDivElement> & {
	hideTitle?: boolean;
	cartItems: CartItem[];
	totalPrice: number;
	removeFromCart?: ({ cartItemId }: { cartItemId: string }) => void;
};

const OrderSummary = React.forwardRef<HTMLDivElement, OrderSummaryProps>(
	({ hideTitle, cartItems, totalPrice, removeFromCart, ...props }, ref) => (
		<div ref={ref} {...props}>
			{!hideTitle && (
				<>
					<h2 className="font-medium text-default-500">Your Order</h2>
					<Divider className="mt-4" />
				</>
			)}
			<h3 className="sr-only">Items in your cart</h3>
			<ul className="overflow-y-scroll ">
				{cartItems?.map((item) => (
					<OrderSummaryItem
						key={item.cartItemId}
						cartItemId={item.cartItemId}
						book={item.book}
						removeFromCart={removeFromCart}
					/>
				))}
			</ul>
			<div>
				<dl className="flex flex-col gap-4 py-4">
					<div className="flex justify-between">
						<dt className="text-small text-default-600">Subtotal</dt>
						<dd className="font-semibold text-small text-default-700">
							${totalPrice.toFixed(2)}
						</dd>
					</div>
					<div className="flex justify-between">
						<dt className="text-small text-default-600">Tax</dt>
						<dd className="font-semibold text-small text-default-700">$3.99</dd>
					</div>
					<div className="flex justify-between">
						<dt className="text-small text-default-600">Discount</dt>
						<dd className="font-semibold text-small text-success"> - $0</dd>
					</div>
					<Divider />
					<div className="flex justify-between">
						<dt className="font-semibold text-small text-default-600">Total</dt>
						<dd className="font-semibold text-small text-default-700">
							${(totalPrice + 3.99).toFixed(2)}
						</dd>
					</div>
				</dl>
			</div>
		</div>
	),
);

OrderSummary.displayName = 'OrderSummary';

export default OrderSummary;
