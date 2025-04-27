'use client';

import {
	Badge,
	Button,
	Divider,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownSection,
	DropdownTrigger,
	Image,
	Link,
	cn,
} from '@heroui/react';
import { Icon } from '@iconify/react';
import { type CartItem, useShoppingCart } from '@lib/stores/useShoppingCart';

import { useAuthStore } from '@/lib/stores/useAuthStore';
import { useEffect } from 'react';
import CartSkeleton from './CartSkeleton';

export default function ShoppingCart() {
	const user = useAuthStore((state) => state.user);
	if (!user) return null;

	const shoppingCart = useShoppingCart();

	useEffect(() => {
		if (shoppingCart.user?.id !== user?.id) {
			shoppingCart.setUser(user);
			shoppingCart.getCart();
		}
	}, [user, shoppingCart]);

	return (
		<section className="items-center justify-center hidden border shadow-2xl cursor-pointer md:flex">
			<Dropdown shadow="lg" placement="bottom-end">
				<Badge
					className="items-center justify-center hidden text-white md:flex"
					isOneChar
					size="sm"
					color="primary"
					content={shoppingCart.counter ?? 0}
					shape="circle"
					showOutline={false}
				>
					<DropdownTrigger>
						<Icon
							icon={'lucide:shopping-cart'}
							width={30}
							height={30}
							className="transition hover:scale-110"
						/>
					</DropdownTrigger>
				</Badge>
				<DropdownMenu
					aria-label="Cart Actions"
					variant="flat"
					className="min-w-[380px] "
					itemClasses={{
						base: 'cursor-default',
					}}
				>
					<DropdownItem
						key="cart"
						isReadOnly
						className="data-[hover=true]:bg-white"
					>
						<p className="text-lg text-center">Shopping Cart</p>
						{/* <Divider /> */}
					</DropdownItem>
					<DropdownSection className="max-h-[450px] overflow-y-auto">
						{shoppingCart.isLoading ? (
							<DropdownItem
								key="skeleton"
								isReadOnly
								className="data-[hover=true]:bg-white"
							>
								<CartSkeleton quantity={shoppingCart.counter} />
							</DropdownItem>
						) : shoppingCart && shoppingCart.cart.length > 0 ? (
							shoppingCart.cart.map((item: CartItem) => (
								<DropdownItem isReadOnly className="mt-3" key={item.cartItemId}>
									<div className="flex items-center justify-between gap-x-4">
										<Link href={`/catalog/book/${item.book.id}`}>
											<div
												className={cn(
													'relative aspect-[2/3] size-28 overflow-hidden shadow-md rounded-tr-xl rounded-br-xl flex z-10',
												)}
											>
												<div className="w-3 bg-gradient-to-r from-amber-950/70 to-amber-950/50 rounded-l-md shrink-0" />

												<div className="relative z-20 flex-1 pb-3 overflow-hidden shadow-sm">
													<Image
														removeWrapper
														alt={item.book.title}
														className={cn(
															'object-cover object-center w-full h-full',
															'rounded-tl-none rounded-bl-none',
														)}
														src={item.book.cover}
													/>

													<div className="absolute inset-0 z-30 pointer-events-none bg-gradient-to-t from-black/10 via-transparent to-white/10" />

													<div className="absolute bottom-0 left-0 right-0 z-40 h-4">
														<div className="w-full h-full shadow-md rounded-br-md bg-gradient-to-t from-slate-300 to-slate-200/10" />
													</div>
												</div>
											</div>
										</Link>
										<div className="flex flex-col items-start justify-start w-full h-full min-w-20 min-h-20 flex-2">
											<div className="flex items-center justify-between w-full">
												<h3 className="text-base font-medium">
													{item.book.title}
												</h3>
												<p>$ {item.book.price}</p>
											</div>

											<div className="flex items-center justify-end w-full">
												<button
													type="button"
													className="text-red-700"
													onClick={() =>
														shoppingCart.removeItem({
															cartItemId: item.cartItemId,
														})
													}
												>
													Delete item
												</button>
											</div>
										</div>
									</div>
								</DropdownItem>
							))
						) : (
							<DropdownItem
								key="empty"
								isReadOnly
								className="data-[hover=true]:bg-white"
							>
								<div>
									<p>Your shopping is empty</p>
								</div>
							</DropdownItem>
						)}
					</DropdownSection>
					<DropdownItem
						key="price"
						isReadOnly
						className="data-[hover=true]:bg-white"
					>
						<Divider />
						<div className="flex flex-col items-center justify-between w-full mt-3 gap-y-1">
							<div className="flex items-center justify-between w-full">
								<h3 className="text-base text-default-700">Subtotal price:</h3>
								<p className="text-lg font-medium">
									$ {Math.max(0, shoppingCart.totalPrice).toFixed(2)}
								</p>
							</div>
						</div>
					</DropdownItem>
					{/* checkout */}
					<DropdownItem
						key="clearCart"
						isReadOnly
						className="data-[hover=true]:bg-white"
					>
						<div className="flex items-center justify-between">
							<Button
								variant="bordered"
								color="danger"
								size="sm"
								onPress={() => shoppingCart.clearCart()}
							>
								<span className="text-base ">Empty Cart</span>
							</Button>
							<Button color="primary" size="sm">
								<Link href="/checkout/payment">
									<span className="text-base text-white">Checkout</span>
								</Link>
							</Button>
						</div>
					</DropdownItem>
				</DropdownMenu>
			</Dropdown>
		</section>
	);
}
