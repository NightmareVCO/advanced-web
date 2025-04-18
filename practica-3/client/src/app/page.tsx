'use client';

import AppScreenshotSkewed from '@components/screenshot/AppScreenshotSkewed';
import { Button, Link } from '@heroui/react';
import { Icon } from '@iconify/react';
import { AnimatePresence, LazyMotion, domAnimation, m } from 'framer-motion';
import React from 'react';

export default function Home() {
	return (
		<>
			<main className="container mx-auto mt-[80px] flex max-w-[1024px] flex-col items-start px-8">
				<section className="z-20 flex flex-col items-start justify-center gap-[18px] sm:gap-6">
					<Button
						className="h-9 overflow-hidden border-1 border-default-100 bg-default-50 px-[18px] py-2 text-small font-normal leading-5 text-default-500"
						endContent={
							<Icon
								className="flex-none outline-none [&>path]:stroke-[2]"
								icon="solar:arrow-right-linear"
								width={20}
							/>
						}
						radius="full"
						variant="bordered"
						as={Link}
						href="/students"
					>
						Start adding students
					</Button>
					<LazyMotion features={domAnimation}>
						<m.div
							animate="kick"
							className="flex flex-col gap-6"
							exit="auto"
							initial="auto"
							transition={{
								duration: 0.25,
								ease: 'easeInOut',
							}}
							variants={{
								auto: { width: 'auto' },
								kick: { width: 'auto' },
							}}
						>
							<AnimatePresence mode="wait">
								<m.div
									key="title"
									animate={{ filter: 'blur(0px)', opacity: 1, x: 0 }}
									className="text-start text-[clamp(40px,10vw,44px)] font-bold leading-[1.2] tracking-tighter sm:text-[64px]"
									initial={{ filter: 'blur(16px)', opacity: 0, x: 15 + 1 * 2 }}
									transition={{
										bounce: 0,
										delay: 0.01 * 10,
										duration: 0.8 + 0.1 * 8,
										type: 'spring',
									}}
								>
									<div className="bg-hero-section-title bg-clip-text text-transparent dark:from-[#FFFFFF] dark:to-[#FFFFFF66]">
										Easiest way to <br /> manage your students.
									</div>
								</m.div>

								<m.div
									key="description"
									animate={{ filter: 'blur(0px)', opacity: 1, x: 0 }}
									className="text-start font-normal leading-7 text-default-500 sm:w-[466px] sm:text-[18px]"
									initial={{ filter: 'blur(16px)', opacity: 0, x: 15 + 1 * 3 }}
									transition={{
										bounce: 0,
										delay: 0.01 * 30,
										duration: 0.8 + 0.1 * 9,
										type: 'spring',
									}}
								>
									Student Muck App makes running your students easier. With a
									single platform, you can manage your students, and keep their
									information up.
								</m.div>

								<m.div
									key="buttons"
									animate={{ filter: 'blur(0px)', opacity: 1, x: 0 }}
									className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6"
									initial={{ filter: 'blur(16px)', opacity: 0, x: 15 + 1 * 4 }}
									transition={{
										bounce: 0,
										delay: 0.01 * 50,
										duration: 0.8 + 0.1 * 10,
										type: 'spring',
									}}
								>
									<Button
										className="h-10 w-[163px] bg-default-foreground px-[16px] py-[10px] text-small font-medium leading-5 text-background"
										radius="full"
										as={Link}
										href="/students"
									>
										Get Started
									</Button>
								</m.div>
							</AnimatePresence>
						</m.div>
					</LazyMotion>
				</section>
			</main>
			<LazyMotion features={domAnimation}>
				<AnimatePresence mode="wait">
					<m.div
						animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
						className="absolute top-[40%] w-full"
						initial={{ filter: 'blur(16px)', opacity: 0, y: 300 }}
						transition={{
							bounce: 0,
							delay: 0.01 * 10,
							duration: 0.8 + 0.1 * 8,
							type: 'spring',
						}}
					>
						<AppScreenshotSkewed className="w-full" />
					</m.div>
				</AnimatePresence>
			</LazyMotion>
		</>
	);
}
