'use client';

import {
	Button,
	Divider,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	type ModalProps,
	Textarea,
} from '@heroui/react';
import { Icon } from '@iconify/react';
import React from 'react';

import RatingRadioGroup from '@components/ui/ratingRadio/RatingRadioGroup';

const ModalReview = React.forwardRef<
	HTMLDivElement,
	Omit<ModalProps, 'children'>
>(({ isOpen, onClose, onOpenChange, ...props }, ref) => (
	<Modal isOpen={isOpen} onOpenChange={onOpenChange} {...props} ref={ref}>
		<ModalContent>
			<ModalHeader className="flex-col pt-8">
				<h1 className="font-semibold text-large">Write a review</h1>
				<p className="font-normal text-small text-default-700">
					Share your experience with this product
				</p>
			</ModalHeader>
			<ModalBody className="pb-8">
				<form
					className="flex flex-col gap-6"
					onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
						e.preventDefault();
						const formData = new FormData(e.currentTarget);
						const data = Object.fromEntries(formData.entries());

						console.log(data);

						onClose?.();
					}}
				>
					<RatingRadioGroup
						hideStarsText
						className="flex-col-reverse items-start"
						color="primary"
						label={<span className="text-small">Rating</span>}
					/>
					<Input
						label="Title"
						placeholder="Title of your review"
						startContent={<Icon icon="lucide:pencil" />}
					/>
					<Textarea
						disableAutosize
						classNames={{
							input: 'h-32 resize-y !transition-none',
						}}
						label="Comment"
						placeholder="Enter your comment"
					/>
					<Button color="primary" type="submit">
						Send review
					</Button>
				</form>
			</ModalBody>
		</ModalContent>
	</Modal>
));

ModalReview.displayName = 'ModalReview';

export default ModalReview;
