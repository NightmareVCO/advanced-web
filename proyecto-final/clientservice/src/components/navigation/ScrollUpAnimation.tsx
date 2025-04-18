'use client';

import { Icon } from '@iconify/react';
import { Colors } from '@lib/constants/colors.constants';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function ScrollUpAnimation() {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			const hasScrolledEnoughToShow = window.scrollY > 1000;
			if (hasScrolledEnoughToShow) {
				setIsVisible(true);
			} else {
				setIsVisible(false);
			}
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<>
			{isVisible && (
				<motion.div
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1, y: [0, 10, 0] }}
					exit={{ opacity: 0, scale: 0.8 }}
					transition={{
						y: {
							repeat: Number.POSITIVE_INFINITY,
							duration: 3,
							ease: 'easeInOut',
						},
					}}
					className="fixed z-50 p-2 rounded-full shadow-2xl cursor-pointer bg-primary-600 backdrop-blur-sm bottom-6 right-6"
					onClick={() => {
						window.scrollTo({ top: 0, behavior: 'smooth' });
					}}
				>
					<Icon
						icon="lucide:arrow-up-from-dot"
						color={Colors.WHITE}
						width={30}
					/>
				</motion.div>
			)}
		</>
	);
}
