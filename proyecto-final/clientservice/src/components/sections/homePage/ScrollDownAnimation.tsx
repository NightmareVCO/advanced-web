'use client';

import { Icon } from '@iconify/react';
import { Colors } from '@lib/constants/colors.constants';
import { motion } from 'framer-motion';

export default function ScrollDownAnimation() {
	return (
		<motion.div
			initial={{ y: 0 }}
			animate={{ y: [0, -10, 0] }}
			transition={{
				repeat: Number.POSITIVE_INFINITY,
				duration: 3,
				ease: 'easeInOut',
			}}
			className="p-2 mt-1 rounded-full shadow-2xl cursor-pointer bg-primary backdrop-blur-sm"
			onClick={() => {
				window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
			}}
		>
			<Icon icon="lucide:arrow-down-to-dot" color={Colors.WHITE} width={30} />
		</motion.div>
	);
}
