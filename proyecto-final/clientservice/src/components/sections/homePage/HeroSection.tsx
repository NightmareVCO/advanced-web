'use client';

import BookHiveLogoIcon from '@components/icons/LogoIcon';
import { Button, Link } from '@heroui/react';
import { Icon } from '@iconify/react';
import { Colors } from '@lib/constants/colors.constants';
import { NavbarLinks } from '@lib/constants/navbar.constants';
import { motion } from 'framer-motion';

export default function HeroSection() {
	const containerVariants = {
		hidden: { opacity: 0, y: 30 },
		show: {
			opacity: 1,
			y: 0,
			transition: {
				staggerChildren: 0.2,
				duration: 0.8,
				ease: 'easeOut',
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		show: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.6, ease: 'easeOut' },
		},
	};

	return (
		<motion.div
			className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white gap-y-2"
			variants={containerVariants}
			initial="hidden"
			animate="show"
		>
			<motion.div variants={itemVariants}>
				<BookHiveLogoIcon width={200} height={220} />
			</motion.div>
			<motion.h1 variants={itemVariants} className="text-5xl font-bold">
				Welcome to <span className="text-primary">BookHive</span>
			</motion.h1>
			<motion.p variants={itemVariants} className="text-xl">
				Your one-stop shop for all your book needs!
			</motion.p>
			<motion.div variants={itemVariants} className="mt-2">
				<Button
					as={Link}
					href={NavbarLinks.CATALOG}
					color="primary"
					variant="ghost"
					className="text-white data-[hover=true]:!text-white"
					endContent={
						<Icon icon="lucide:book-copy" color={Colors.WHITE} width={20} />
					}
				>
					<span className="text-sm font-semibold">Explore Catalog</span>
				</Button>
			</motion.div>
		</motion.div>
	);
}
