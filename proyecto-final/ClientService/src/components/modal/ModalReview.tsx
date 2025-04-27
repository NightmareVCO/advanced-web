'use client';

import {
	Button,
	Divider,
	Form,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	type ModalProps,
	Textarea,
} from '@heroui/react';
import { Icon } from '@iconify/react';
import React, { useActionState, useTransition } from 'react';

import RatingRadioGroup from '@components/ui/ratingRadio/RatingRadioGroup';
import { createReview } from '@/lib/actions/review.action';
import confetti from 'canvas-confetti';

const ModalReview = React.forwardRef<
	HTMLDivElement,
	Omit<ModalProps, 'children'> & {
		canReview: boolean;
		userId: string;
		bookId: string;
	}
>(
	(
		{ isOpen, onClose, onOpenChange, canReview, bookId, userId, ...props },
		ref,
	) => {
		const [_, startTransition] = useTransition();

		const [{ errors }, formAction, pending] = useActionState(createReview, {
			errors: {
				title: '',
				comment: '',
			},
		});

		const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			const rawData = new FormData(e.currentTarget);

			const data = Object.fromEntries(rawData.entries());
			const formData = new FormData();
			formData.append('title', data.title as string);
			formData.append('bookId', bookId);
			formData.append('userId', userId);
			formData.append('comment', data.comment as string);
			formData.append(
				'rating',
				Number.parseInt(data.rating as string).toString(),
			);

			startTransition(async () => {
				formAction(formData);
				confetti();
				if (onClose) onClose();
			});
		};

		return (
			<Modal isOpen={isOpen} onOpenChange={onOpenChange} {...props} ref={ref}>
				<ModalContent>
					<ModalHeader className="flex-col pt-8">
						<h1 className="font-semibold text-large">Write a review</h1>
						<p className="font-normal text-small text-default-700">
							Share your experience with this product
						</p>
					</ModalHeader>
					<ModalBody className="pb-8">
						<Form
							id="review-form"
							validationBehavior="native"
							className="flex flex-col gap-6"
							onSubmit={onSubmit}
							validationErrors={errors}
						>
							<RatingRadioGroup
								name="rating"
								hideStarsText
								className="flex-col-reverse items-start"
								color="primary"
								label={<span className="text-small">Rating</span>}
							/>
							<Input
								label="Title"
								name="title"
								placeholder="Title of your review"
								startContent={<Icon icon="lucide:pencil" />}
								isInvalid={!!errors?.title}
								errorMessage={errors?.title}
							/>
							<Textarea
								name="comment"
								disableAutosize
								classNames={{
									input: 'h-32 resize-y !transition-none',
								}}
								label="Comment"
								placeholder="Enter your comment"
								isInvalid={!!errors?.comment}
								errorMessage={errors?.comment}
							/>
						</Form>
					</ModalBody>
					<ModalFooter>
						<Button
							form="review-form"
							className="text-white"
							color="primary"
							type="submit"
							isDisabled={!canReview || pending}
							isLoading={pending}
						>
							Send review
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		);
	},
);

ModalReview.displayName = 'ModalReview';

export default ModalReview;
