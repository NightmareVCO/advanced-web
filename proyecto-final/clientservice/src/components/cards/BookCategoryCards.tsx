'use client';

import ScrollingBanner from '@components/scrollBanner/ScrollBanner';
import { Card, CardHeader, Link } from '@heroui/react';
import type { Category } from '@lib/data/category.data';
import { motion } from 'framer-motion';
import Image from 'next/image';

type BookCategoryCardsProps = {
	categories: Category[];
};

export default function BookCategoryCards({
	categories,
}: BookCategoryCardsProps) {
	return (
		<ScrollingBanner
			className="container w-full px-4 py-8 overflow-x-hidden"
			duration={80}
			shouldPauseOnHover
		>
			{categories.map((category) => (
				<motion.div
					key={category.title}
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
				>
					<Link href={category?.href}>
						<Card className="w-72 h-[300px] relative overflow-hidden">
							<CardHeader className="absolute z-10 top-0 bg-primary flex-col !items-center">
								<p className="font-bold uppercase text-tiny text-white/60">
									{category.subtitle}
								</p>
								<h4 className="font-medium text-white text-large">
									{category.title}
								</h4>
							</CardHeader>
							<Image
								src={category.image}
								alt={`${category.title} category`}
								fill
								className="z-0 object-cover"
							/>
						</Card>
					</Link>
				</motion.div>
			))}
		</ScrollingBanner>
	);
}
