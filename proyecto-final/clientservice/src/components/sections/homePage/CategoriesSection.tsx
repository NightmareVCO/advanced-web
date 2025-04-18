'use client';

import BookCategoryCards from '@/components/cards/BookCategoryCards';
import { CATEGORIES } from '@lib/data/category.data';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function CategoriesSection() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: '-200px' });

	return (
		<motion.div
			ref={ref}
			initial={{ opacity: 0, y: 50 }}
			animate={isInView ? { opacity: 1, y: 0 } : {}}
			transition={{ duration: 0.6, ease: 'easeOut' }}
			className="flex flex-col items-center justify-center p-4 md:p-8 lg:p-12"
		>
			<h2 className="mb-4 text-3xl font-bold text-center text-primary">
				Dive into the World of Books
			</h2>
			<BookCategoryCards categories={CATEGORIES} />
		</motion.div>
	);
}
