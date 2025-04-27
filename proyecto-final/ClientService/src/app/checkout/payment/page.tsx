'use client';

import { PayPalIcon } from '@components/icons/PaypalIcon';
import ModelOrderConfirmation from '@components/modal/ModalOrderConfirmation';
import OrderSummary from '@components/orders/OderSummary';
import HeaderSection from '@components/sections/paymentPage/HeaderSection';
import PaymentMethodRadio from '@components/ui/paymentRadio/PaymentMethodRadio';
import {
	Accordion,
	AccordionItem,
	Button,
	Divider,
	Image,
	Link,
	Progress,
	RadioGroup,
	Spacer,
	Spinner,
	useDisclosure,
} from '@heroui/react';
import { Icon } from '@iconify/react';
import { createOrderInServer } from '@lib/actions/orders.action';
import { createOrderInPayPal } from '@lib/actions/paypal.action';
import { PAYPAL_CLIENT_CLIENT_ID } from '@lib/constants/paypal.constants';
import { useAuthStore } from '@lib/stores/useAuthStore';
import { useShoppingCart } from '@lib/stores/useShoppingCart';
import {
	PayPalButtons,
	PayPalScriptProvider,
	type ReactPayPalScriptOptions,
} from '@paypal/react-paypal-js';
import { AnimatePresence, LazyMotion, domAnimation, m } from 'framer-motion';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export default function PaymentPage() {
	const [[page, direction], setPage] = React.useState([0, 0]);
	const [isSelected, setSelected] = React.useState(false);
	const [isLoading, setIsLoading] = React.useState(true);

	const variants = {
		enter: (direction: number) => ({
			x: direction > 0 ? 20 : -20,
			opacity: 0,
		}),
		center: {
			zIndex: 1,
			x: 0,
			opacity: 1,
		},
		exit: (direction: number) => ({
			zIndex: 0,
			x: direction < 0 ? 20 : -20,
			opacity: 0,
		}),
	};

	const paginate = (newDirection: number) => {
		if (page + newDirection < 0 || page + newDirection > 1) return;

		setPage([page + newDirection, newDirection]);
	};

	const ctaLabel = React.useMemo(() => {
		switch (page) {
			case 0:
				return 'Continue to payment';
			case 1:
				return 'Place order';
			default:
				return 'Continue to shipping';
		}
	}, [page]);

	const stepTitle = React.useMemo(() => {
		switch (page) {
			case 0:
				return 'Review your order';
			case 1:
				return 'How would you like to pay?';
			default:
				return 'Review your order';
		}
	}, [page]);

	const user = useAuthStore((state) => state.user);
	const shoppingCart = useShoppingCart();

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (user) {
			shoppingCart.setUser(user);
			shoppingCart.getCart();
			setIsLoading(false);
		}
	}, [user]);

	const stepsContent = React.useMemo(() => {
		const paymentRadioClasses = {
			wrapper: 'group-data-[selected=true]:border-foreground',
			base: 'data-[selected=true]:border-foreground',
			control: 'bg-foreground',
		};

		switch (page) {
			case 0:
				return (
					<OrderSummary
						hideTitle
						cartItems={shoppingCart.cart}
						totalPrice={shoppingCart.totalPrice}
						removeFromCart={shoppingCart.removeItem}
					/>
				);
			case 1:
				return (
					<div className="flex flex-col gap-4">
						<div className="flex flex-col gap-2">
							<Accordion
								keepContentMounted
								aria-label="Select or add payment method"
								defaultExpandedKeys={['select_existing_payment']}
								itemClasses={{
									title: 'text-medium text-foreground-500',
									indicator: 'text-foreground',
								}}
								selectionMode="multiple"
								showDivider={false}
							>
								<AccordionItem
									key="select_existing_payment"
									title="Select existing payment method"
								>
									<RadioGroup
										aria-label="Select existing payment method"
										classNames={{ wrapper: 'gap-3' }}
										defaultValue="4229"
										onChange={(value) => setSelected(!!value)}
									>
										<PaymentMethodRadio
											classNames={paymentRadioClasses}
											isRecommended
											description="Select this option to pay with PayPal"
											icon={<PayPalIcon height={30} width={30} />}
											label="PayPal"
											value="paypal"
										/>
									</RadioGroup>
								</AccordionItem>
							</Accordion>
						</div>
					</div>
				);
			default:
				return null;
		}
	}, [page, shoppingCart]);

	const { isOpen, onOpen, onClose } = useDisclosure();
	const router = useRouter();

	const initialOptions: ReactPayPalScriptOptions = {
		clientId: PAYPAL_CLIENT_CLIENT_ID,
	};

	const createPayPalOrder = async () => {
		const items = shoppingCart.cart.map((item) => ({
			id: item.cartItemId,
			amount: item.book.price.toString(),
			name: item.book.title,
			description: item.book.description,
		}));
		const totalAmount = shoppingCart.totalPrice.toFixed(2);

		const formData = new FormData();
		formData.append('items', JSON.stringify(items));
		formData.append('totalAmount', totalAmount.toString());

		const res = await createOrderInPayPal(undefined, formData);

		return res.orderId as string;
	};

	// const onPayPalCancel = async (data: any) => {
	// };

	// @ts-ignore
	const onPayPalApprove = async (_data, _actions) => {
		const userId = shoppingCart.user?.id;
		const userToken = shoppingCart.user?.token;
		const items = shoppingCart.cart.map((item) => item.book);
		const totalPrice = shoppingCart.totalPrice.toFixed(2);

		const formData = new FormData();
		formData.append('userId', userId as string);
		formData.append('userToken', userToken as string);
		formData.append('items', JSON.stringify(items));
		formData.append('totalPrice', totalPrice.toString());

		const res = await createOrderInServer(undefined, formData);

		if (res?.errors) {
			console.error('Error creating order:', res.errors);
			return;
		}

		onOpen();

		setInterval(() => {
			shoppingCart.clearCart();
			router.push('/profile');
		}, 6000);
	};

	return (
		<main className="flex flex-row items-center justify-center w-screen min-h-screen">
			<ModelOrderConfirmation
				isOpen={isOpen}
				onClose={onClose}
				items={shoppingCart.cart.map((item) => item.book)}
			/>
			<PayPalScriptProvider options={initialOptions}>
				{isLoading && (
					<div className="flex items-center justify-center w-full h-full">
						<Spinner />
					</div>
				)}
				{!isLoading && shoppingCart.cart.length === 0 && (
					<div className="container flex flex-col items-center justify-center w-full p-4 mx-auto my-6 border shadow-lg bg-background rounded-medium max-w-7xl">
						<HeaderSection />
						<h2 className="mt-3 text-3xl font-bold text-center text-primary">
							Your cart is empty
						</h2>
						<Link href="/catalog" className="text-primary">
							Start shopping
						</Link>
					</div>
				)}
				{!isLoading && shoppingCart.cart.length > 0 && (
					<div className="container flex-col items-center justify-center w-full p-4 mx-auto my-6 border shadow-lg bg-background rounded-medium max-w-7xl">
						<HeaderSection />
						<Spacer y={2} />
						<h2 className="mt-3 text-3xl font-bold text-center text-primary">
							Complete your order!
						</h2>
						<div className="flex flex-col items-center w-full gap-4 px-4">
							<div className="flex-none w-full">
								<div className="flex flex-col flex-1 h-full p-4">
									<div>
										<Button
											className="-ml-2 text-default-700"
											isDisabled={page === 0}
											variant="flat"
											onPress={() => {
												paginate(-1);
												setSelected(false);
											}}
										>
											<Icon icon="solar:arrow-left-outline" width={20} />
											Go back
										</Button>
									</div>

									<AnimatePresence
										custom={direction}
										initial={false}
										mode="wait"
									>
										<LazyMotion features={domAnimation}>
											<m.form
												id="paypal-form"
												key={page}
												animate="center"
												className="flex flex-col gap-3 mt-8"
												custom={direction}
												exit="exit"
												initial="enter"
												transition={{
													x: { type: 'spring', stiffness: 300, damping: 30 },
													opacity: { duration: 0.2 },
												}}
												variants={variants}
											>
												<h1 className="text-2xl font-medium">{stepTitle}</h1>
												{stepsContent}
												{page === 1 && isSelected && (
													<div className="flex items-center justify-center w-full mt-4">
														<PayPalButtons
															style={{ layout: 'vertical' }}
															createOrder={createPayPalOrder}
															onApprove={onPayPalApprove}
														/>
													</div>
												)}
												<Button
													fullWidth
													type="submit"
													className="mt-8 text-white"
													size="lg"
													color="primary"
													onPress={() => paginate(1)}
													isDisabled={page === 1}
												>
													{ctaLabel}
												</Button>
											</m.form>
										</LazyMotion>
									</AnimatePresence>
									<div className="flex justify-between w-full gap-8 pt-4 pb-8 mt-auto">
										<div className="flex flex-col items-start w-full gap-2">
											<p className="font-medium text-small">Review</p>
											<Progress value={page >= 0 ? 100 : 0} />
										</div>
										<div className="flex flex-col items-start w-full gap-2">
											<p className="font-medium text-small">Payment</p>
											<Progress value={page >= 1 ? 100 : 0} />
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
			</PayPalScriptProvider>
		</main>
	);
}
