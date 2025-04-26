'use client';

import type { Slide } from '@/lib/data/slider.data';
import { Button } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export const sliderInfo = {
	buttonText: 'BUY NOW',
};

type SliderProps = {
	slides: Slide[];
};

export default function Slider({ slides }: SliderProps) {
	const [current, setCurrent] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrent((previous) =>
				previous === slides.length - 1 ? 0 : previous + 1,
			);
		}, 5000);

		return () => clearInterval(interval);
	}, [slides]);

	return (
		<div className="h-[calc(100vh_-_100px)] min-h-[750px] overflow-hidden relative">
			<div
				className="flex h-full transition-all duration-1000 ease-in-out w-max"
				style={{ transform: `translateX(-${current * 100}vw)` }}
			>
				{slides.map((slide) => (
					<div
						className={`${slide.bg} w-screen h-full flex flex-col gap-16 xl:flex-row`}
						key={slide.id}
					>
						<div className="flex flex-col items-center justify-center gap-8 text-center h-1/2 xl:w-1/2 xl:h-full 2xl:gap-12">
							<h1 className="text-xl text-white lg:text-3xl 2xl:text-5xl">
								{slide.description}
							</h1>
							<h1 className="text-5xl font-semibold text-white lg:text-6xl 2xl:text-8xl">
								{slide.title}
							</h1>
							<Button color="primary" size="lg">
								<Link href={slide.url}>
									<span className="text-xl text-white">
										{sliderInfo.buttonText}
									</span>
								</Link>
							</Button>
						</div>

						<div className="relative h-1/2 xl:w-1/2 xl:h-full">
							<Image
								src={slide.img}
								alt=""
								fill
								sizes="100%"
								className="object-cover"
							/>
						</div>
					</div>
				))}
			</div>
			<div className="absolute flex gap-4 m-auto left-1/2 bottom-8">
				{slides.map((slide, index) => (
					<button
						type="button"
						className={`w-3 h-3  rounded-full ring-1 ring-gray-600 cursor-pointer flex items-center justify-center ${
							current === index ? 'scale-150' : ''
						}`}
						key={slide.id}
						onClick={() => setCurrent(index)}
						onKeyDown={(e) => {
							if (e.key === 'Enter' || e.key === ' ') {
								setCurrent(index);
							}
						}}
					>
						{current === index && (
							<div className="w-[6px] h-[6px] bg-gray-600 rounded-full" />
						)}
					</button>
				))}
			</div>
		</div>
	);
}
