'use client';
import ProductListItemNoCart from '@components/products/ProductListItemNoCart';
import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	useDisclosure,
} from '@heroui/react';
import { cn } from '@heroui/react';
import type { OrderItem } from '@lib/fetch/orders.fetch';
import React from 'react';

export type OrderItemsModalProps = {
	products: OrderItem[];
	itemClassName?: string;
};

export default function OrderItemsModal({
	products,
	itemClassName,
}: OrderItemsModalProps) {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	return (
		<>
			<Button size="sm" variant="flat" onPress={onOpen}>
				Book Details
			</Button>
			<Modal size="5xl" isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader>Book Details</ModalHeader>
							<ModalBody>
								<div className="grid w-full grid-cols-1 gap-0 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
									{products.map((product) => (
										<ProductListItemNoCart
											key={product.bookId}
											removeWrapper
											{...product}
											className={cn('w-full snap-start', itemClassName)}
										/>
									))}
								</div>
							</ModalBody>
							<ModalFooter>
								<Button variant="flat" color="primary" onPress={onClose}>
									Close
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}
