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
} from '@heroui/react';
import { Icon } from '@iconify/react';
import { useShoppingCart } from '@lib/stores/useShoppingCart';

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
		}
	}, [user, shoppingCart]);

	return (
		<section className="items-center justify-center hidden cursor-pointer md:flex">
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
						className='data-[hover="true"]:bg-white'
					>
						<p className="text-lg text-center">Shopping Cart</p>
						{/* <Divider /> */}
					</DropdownItem>
					<DropdownSection className="max-h-[450px] overflow-y-auto">
						{shoppingCart.isLoading ? (
							<DropdownItem
								key="skeleton"
								isReadOnly
								className='data-[hover="true"]:bg-white'
							>
								<CartSkeleton quantity={shoppingCart.counter} />
							</DropdownItem>
						) : (
							// ) : shoppingCart && cart?.totalPricePerItem?.length > 0 ? (
							// 	cart.totalPricePerItem.map((item: any) => (
							// 		<DropdownItem isReadOnly className="mt-3" key={item.id}>
							// 			<div className="flex items-center justify-between gap-x-4">
							// 				<Link href={`/tienda/productos/${item.product.id}`}>
							// 					<Image
							// 						src={
							// 							item.product.productImage[0].url ||
							// 							'/placeholder.webp'
							// 						}
							// 						alt={item.product.name || 'Imagen del producto'}
							// 						width={80}
							// 						height={80}
							// 						className="rounded-lg"
							// 					/>
							// 				</Link>
							// 				<div className="flex flex-col items-start justify-start w-full h-full min-w-20 min-h-20 flex-2">
							// 					<div className="flex items-center justify-between w-full">
							// 						<h3 className="text-base font-medium">
							// 							{item.product.name || 'Nombre del producto'}
							// 						</h3>
							// 						<p>RD$ {item.totalPrice}</p>
							// 					</div>
							// 					<div>
							// 						<p className="text-default-400">
							// 							{item.quantity <= item.product.stock ? (
							// 								modalCartInfo.available
							// 							) : (
							// 								<span className="text-red-400">
							// 									{modalCartInfo.outStock}
							// 								</span>
							// 							)}
							// 						</p>
							// 					</div>

							// 					<div className="flex items-center justify-between w-full mt-3">
							// 						<p className="text-default-400">
							// 							{modalCartInfo.quantity}: {item.quantity}
							// 						</p>
							// 						<button
							// 							className="text-red-400"
							// 							onClick={() =>
							// 								removeItem({
							// 									userId: user.id,
							// 									cartId: user.shoppingCart.id,
							// 									itemId: item.id,
							// 								})
							// 							}
							// 						>
							// 							{modalCartInfo.delete}
							// 						</button>
							// 					</div>
							// 				</div>
							// 			</div>
							// 		</DropdownItem>
							// 	))
							// ) : (
							<DropdownItem
								key="empty"
								isReadOnly
								className='data-[hover="true"]:bg-white'
							>
								<div>
									<p>Your shopping is empty</p>
								</div>
							</DropdownItem>
						)}
					</DropdownSection>
					{/* subbtotal */}
					<DropdownItem
						key="price"
						isReadOnly
						className='data-[hover="true"]:bg-white'
					>
						<Divider />
						<div className="flex flex-col items-center justify-between w-full mt-3 gap-y-1">
							<div className="flex items-center justify-between w-full">
								<h3 className="text-base text-default-700">Subtotal price:</h3>
								<p className="text-lg font-medium">
									$ {shoppingCart.totalPrice}
								</p>
							</div>
						</div>
					</DropdownItem>
					{/* checkout */}
					<DropdownItem
						key="clearCart"
						isReadOnly
						className='data-[hover="true"]:bg-white'
					>
						<div className="flex items-center justify-between">
							<Button
								variant="bordered"
								color="danger"
								size="md"
								// onPress={() =>
								// 	clearCart({
								// 		userId: user.id,
								// 		cartId: user.shoppingCart.id,
								// 	})
								// }
							>
								<span className="text-base ">Empty Shopping Cart</span>
							</Button>
							<Button color="primary" size="md">
								<Link href="/checkout">
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
