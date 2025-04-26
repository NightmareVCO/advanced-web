import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from '@heroui/react';
import type { Product } from '@lib/data/products.data';

import confetti from 'canvas-confetti';
import { useEffect } from 'react';

type ModalOrderConfirmationProps = {
	isOpen: boolean;
	onClose: () => void;
	items: Product[];
};

export default function ModelOrderConfirmation({
	items,
	isOpen,
	onClose,
}: ModalOrderConfirmationProps) {
	useEffect(() => {
		if (isOpen) {
			const duration = 3000;
			const animationEnd = Date.now() + duration;

			const randomInRange = (min: number, max: number) => {
				return Math.random() * (max - min) + min;
			};

			const confettiInterval = setInterval(() => {
				const timeLeft = animationEnd - Date.now();

				if (timeLeft <= 0) {
					return clearInterval(confettiInterval);
				}

				confetti({
					particleCount: 3,
					angle: randomInRange(55, 125),
					spread: randomInRange(50, 70),
					origin: { y: 0.6 },
					colors: ['#FF5757', '#FFBD59', '#4CAF50', '#00BCD4'],
				});
			}, 250);

			return () => clearInterval(confettiInterval);
		}
	}, [isOpen]);

	return (
		<Modal
			isOpen={isOpen}
			size="3xl"
			onClose={onClose}
			classNames={{
				backdrop: 'bg-[#292f46]/50 backdrop-opacity-40',
			}}
		>
			<ModalContent>
				{(onClose) => (
					<>
						<ModalHeader className="flex flex-col gap-1">
							Order Confirmation
						</ModalHeader>
						<ModalBody>
							<div className="flex flex-col items-center gap-4">
								<div className="p-4 bg-green-100 rounded-full animate-pulse">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="w-16 h-16 text-green-500"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										strokeWidth={2}
									>
										<title>Order Confirmation</title>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M5 13l4 4L19 7"
										/>
									</svg>
								</div>

								<p className="text-center text-medium text-default-800">
									Thank you for your order! Your order has been placed
									successfully.
								</p>
								<div className="w-full mt-2">
									<ul className="w-full divide-y divide-default-200">
										{items.map((item) => (
											<li
												key={item.id}
												className="grid grid-cols-3 py-2 text-sm"
											>
												<span className="text-default-800">{item.title}</span>
												<span className="text-center text-default-600">
													${item.price.toFixed(2)}
												</span>
												<span className="text-right text-default-600">x1</span>
											</li>
										))}
									</ul>
								</div>

								<p className="text-sm text-center text-default-600">
									You will receive a confirmation email shortly. You can also
									review your orders in your profile — you'll be redirected.
								</p>
							</div>
						</ModalBody>
						<ModalFooter>
							<Button color="primary" variant="light" onPress={onClose}>
								Close
							</Button>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	);
}
