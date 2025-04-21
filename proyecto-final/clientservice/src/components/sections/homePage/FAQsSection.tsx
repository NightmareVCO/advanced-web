'use client';

import { FAQs as FAQsData } from '@/lib/data/faq.data';
import FAQs from '@components/faqs/FAQs';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function FAQsSection() {
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
			<h2 className="text-3xl font-bold text-center text-primary">
				FAQs - Your Questions Answered
			</h2>
			<FAQs FAQs={FAQsData} />
		</motion.div>
	);
}
