'use client';

import { Input, Select, SelectItem, useDisclosure } from '@heroui/react';
import { Icon } from '@iconify/react';
import React from 'react';

import SummaryRatingCard from '@components/cards/RatingSummaryCard';
import ModalReview from '@components/modal/ModalReview';
import Review from '@components/review/Review';
import type { ReviewResultWithUsers } from '@lib/fetch/review.fetch';

type ReviewsSectionProps = {
	booksReviews: ReviewResultWithUsers;
	canReview: boolean;
	userId: string;
	bookId: string;
};
export default function ReviewsSection({
	booksReviews,
	canReview,
	userId,
	bookId,
}: ReviewsSectionProps) {
	const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

	const ratings = [
		{
			rating: 5,
			count: booksReviews.rating.fiveStar ?? 0,
		},
		{
			rating: 4,
			count: booksReviews.rating.fourStar ?? 0,
		},
		{
			rating: 3,
			count: booksReviews.rating.threeStar ?? 0,
		},
		{
			rating: 2,
			count: booksReviews.rating.twoStar ?? 0,
		},
		{
			rating: 1,
			count: booksReviews.rating.oneStar ?? 0,
		},
	];

	return (
		<section className="w-full max-w-6xl px-2 mx-auto sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-x-12 lg:px-6">
			<div className="lg:col-span-4">
				<SummaryRatingCard
					averageRating={booksReviews.rating.averageRating ?? 0}
					ratings={ratings}
					totalRatingCount={booksReviews.rating.totalRatings ?? 0}
					onWriteReview={onOpen}
					canReview={canReview}
				/>
			</div>
			<div className="mt-16 lg:col-span-8 lg:mt-0">
				<header className="flex flex-wrap items-center justify-between gap-4">
					<h1 className="font-semibold text-large">
						{booksReviews.rating.totalRatings ?? 0} Reviews
					</h1>
					<Select
						aria-label="Sort by"
						className="w-40"
						defaultSelectedKeys={['most_recent']}
						labelPlacement="outside"
						variant="bordered"
					>
						<SelectItem key="most_recent">Most recent</SelectItem>
						<SelectItem key="most_helpful">Most helpful</SelectItem>
						<SelectItem key="highest_rating">Highest rating</SelectItem>
					</Select>
					<Input
						fullWidth
						aria-label="Search"
						className="w-full"
						labelPlacement="outside"
						placeholder="Search reviews"
						startContent={<Icon icon="lucide:search" />}
						variant="bordered"
					/>
				</header>
				<div className="flex flex-col mt-4">
					{booksReviews.reviews.length > 0 &&
						booksReviews.reviews.map((review, index) => (
							<div
								// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
								key={index}
								className="border-divider px-2 py-10 [&:not(:last-child)]:border-b-1"
							>
								<Review {...review} />
							</div>
						))}
					{booksReviews.reviews.length === 0 && (
						<div className="flex flex-col items-center justify-center w-full h-full gap-1">
							<Icon icon="lucide:message-square" width={40} />
							<p className="text-default-700">No reviews yet</p>
						</div>
					)}
				</div>
			</div>
			<ModalReview
				isOpen={isOpen}
				onClose={onClose}
				onOpenChange={onOpenChange}
				canReview={canReview}
				bookId={bookId}
				userId={userId}
			/>
		</section>
	);
}
