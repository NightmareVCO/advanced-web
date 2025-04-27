'use client';

import React from 'react';
import { useMediaQuery } from 'usehooks-ts';

import ScrollingBanner from '@/components/scrollBanner/ScrollBanner';
import UserReview from '@components/cards/UserReviewCard';
import type { Testimonial } from '@lib/data/testimonial.data';

type TestimonialSectionProps = {
	testimonials: Testimonial[];
};

export default function Testimonials({
	testimonials,
}: TestimonialSectionProps) {
	const testimonials1 = testimonials.slice(0, 4);
	const testimonials2 = testimonials.slice(4, 8);
	const testimonials3 = testimonials.slice(8, 12);
	const testimonials4 = testimonials.slice(12, 16);

	const isMobile = useMediaQuery('(max-width: 768px)');

	const fistColumn = React.useMemo(
		() => (isMobile ? testimonials : testimonials1),
		[isMobile, testimonials, testimonials1],
	);

	return (
		<div className="container">
			<div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4">
				<ScrollingBanner
					isVertical
					className="w-80 md:w-full"
					duration={isMobile ? 100 : 30}
					shouldPauseOnHover={true}
				>
					{fistColumn.map((testimonial, index) => (
						<UserReview key={`${testimonial.name}-${index}`} {...testimonial} />
					))}
				</ScrollingBanner>
				<ScrollingBanner
					isVertical
					className="hidden sm:flex"
					duration={30}
					shouldPauseOnHover={true}
				>
					{testimonials2.map((testimonial, index) => (
						<UserReview key={`${testimonial.name}-${index}`} {...testimonial} />
					))}
				</ScrollingBanner>
				<ScrollingBanner
					isVertical
					className="hidden md:flex"
					duration={30}
					shouldPauseOnHover={true}
				>
					{testimonials3.map((testimonial, index) => (
						<UserReview key={`${testimonial.name}-${index}`} {...testimonial} />
					))}
				</ScrollingBanner>
				<ScrollingBanner
					isVertical
					className="hidden lg:flex"
					duration={30}
					shouldPauseOnHover={true}
				>
					{testimonials4.map((testimonial, index) => (
						<UserReview key={`${testimonial.name}-${index}`} {...testimonial} />
					))}
				</ScrollingBanner>
			</div>
		</div>
	);
}
