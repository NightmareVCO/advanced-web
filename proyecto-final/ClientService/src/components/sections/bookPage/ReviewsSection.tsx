'use client';

import { Input, Select, SelectItem, useDisclosure } from '@heroui/react';
import { Icon } from '@iconify/react';
import React from 'react';

import SummaryRatingCard from '@components/cards/RatingSummaryCard';
import ModalReview from '@components/modal/ModalReview';
import Review from '@components/review/Review';
import { reviews } from '@lib/data/review.data';

const ratings = [
	{
		rating: 5,
		count: 120,
	},
	{
		rating: 4,
		count: 50,
	},
	{
		rating: 3,
		count: 25,
	},
	{
		rating: 2,
		count: 33,
	},
	{
		rating: 1,
		count: 30,
	},
];

export default function ReviewsSection() {
	const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

	return (
		<section className="w-full max-w-6xl px-2 mx-auto sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-x-12 lg:px-6">
			<div className="lg:col-span-4">
				<SummaryRatingCard
					averageRating={4.4}
					ratings={ratings}
					totalRatingCount={139}
					onWriteReview={onOpen}
				/>
			</div>
			<div className="mt-16 lg:col-span-8 lg:mt-0">
				<header className="flex flex-wrap items-center justify-between gap-4">
					<h1 className="font-semibold text-large">136 Reviews</h1>
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
					{reviews.map((review, index) => (
						<div
							// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
							key={index}
							className="border-divider px-2 py-10 [&:not(:last-child)]:border-b-1"
						>
							<Review {...review} />
						</div>
					))}
				</div>
			</div>
			<ModalReview
				isOpen={isOpen}
				onClose={onClose}
				onOpenChange={onOpenChange}
			/>
		</section>
	);
}
