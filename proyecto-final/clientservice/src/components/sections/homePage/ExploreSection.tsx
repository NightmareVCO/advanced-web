'use client';

import { Button, Image, Link } from '@heroui/react';
import { Icon } from '@iconify/react';
import { Colors } from '@lib/constants/colors.constants';
import { NavbarLinks } from '@lib/constants/navbar.constants';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function ExploreSection() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: '-200px' });

	const fadeUp = {
		hidden: { opacity: 0, y: 40 },
		show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
	};

	return (
		<section ref={ref}>
			<motion.div
				className="flex flex-col items-center justify-between w-full gap-8 p-4 md:p-8 lg:p-12 md:flex-row"
				variants={fadeUp}
				initial="hidden"
				animate={isInView ? 'show' : 'hidden'}
			>
				<motion.div
					className="flex flex-col items-center justify-start h-full gap-4 flex-2"
					variants={fadeUp}
				>
					<h2 className="text-3xl font-bold text-center text-primary">
						Exciting Books Awaiting You
					</h2>
					<p className="text-lg text-center text-gray-700">
						Explore our collection of books and find your next great read. From
						bestsellers to hidden gems, we have something for everyone. Dive
						into the world of literature and discover new authors, genres, and
						stories that will captivate your imagination. Whether you prefer
						fiction, non-fiction, or graphic novels, our curated selection has
						it all. Join us on this literary journey and let the pages transport
						you to new worlds. Happy reading!
					</p>
					<Button
						as={Link}
						href={NavbarLinks.CATALOG}
						color="primary"
						variant="shadow"
						className="text-white"
						endContent={
							<Icon icon="lucide:book-copy" color={Colors.WHITE} width={20} />
						}
					>
						<span className="text-sm font-semibold">Explore Catalog</span>
					</Button>
				</motion.div>

				<motion.div
					className="flex justify-center flex-3"
					variants={fadeUp}
					transition={{ delay: 0.2 }}
				>
					<Image
						src="/images/explore-pack.png"
						alt="BookHive Hero Image"
						width={1024}
						height={512}
						className="object-cover w-full h-auto"
					/>
				</motion.div>
			</motion.div>
		</section>
	);
}
