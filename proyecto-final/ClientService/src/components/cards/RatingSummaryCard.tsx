'use client';

import { createReview } from '@lib/actions/review.action';
import { Button, Progress } from '@heroui/react';
import { cn } from '@heroui/react';
import { Icon } from '@iconify/react';
import React, { useActionState, useTransition } from 'react';

export type SummaryRatingCardProps = React.HTMLAttributes<HTMLDivElement> & {
	ratings: {
		rating: number;
		count: number;
	}[];
	totalRatingCount: number;
	averageRating: number;
	onWriteReview?: () => void;
};

const SummaryRatingCard = React.forwardRef<
	HTMLDivElement,
	SummaryRatingCardProps & {
		canReview?: boolean;
	}
>(
	(
		{
			className,
			ratings,
			totalRatingCount,
			averageRating,
			canReview = false,
			onWriteReview,
			...props
		},
		ref,
	) => {
		return (
			<div
				ref={ref}
				className={cn(
					'flex flex-col gap-2 rounded-medium bg-content1 p-6 shadow-small',
					className,
				)}
				{...props}
			>
				<div className="flex items-center gap-2">
					<Icon className="text-primary" icon="solar:star-bold" width={20} />
					<span className="font-semibold text-large">{averageRating}</span>
					<span className="text-default-600">
						• (Based on {totalRatingCount} reviews)
					</span>
				</div>
				<div className="flex flex-col gap-2">
					{ratings.map(({ rating, count }, index) => {
						const percentage =
							totalRatingCount > 0 ? (count / totalRatingCount) * 100 : 0;

						return (
							// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
							<div key={index} className="flex items-center gap-1">
								<Progress
									showValueLabel
									aria-label={`${rating} stars`}
									color="primary"
									label={
										<span className="text-small">{`${rating} ${rating > 1 ? 'stars' : 'star'}`}</span>
									}
									value={percentage}
								/>
							</div>
						);
					})}
				</div>
				<div className="flex flex-col w-full gap-4 mt-4">
					<Button
						fullWidth
						startContent={<Icon icon="lucide:pencil" />}
						variant="bordered"
						onPress={onWriteReview}
						isDisabled={!canReview}
					>
						{canReview
							? 'Write a review'
							: 'You need to own this book to write a review'}
					</Button>
					<p className="px-2 text-small text-default-700">
						Share your experience with this product
					</p>
				</div>
			</div>
		);
	},
);

SummaryRatingCard.displayName = 'SummaryRatingCard';

export default SummaryRatingCard;
