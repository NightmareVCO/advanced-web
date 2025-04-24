'use client';

import { Button, Image, Link } from '@heroui/react';
import { cn } from '@heroui/react';
import { Icon } from '@iconify/react';
import React from 'react';

import type { Product } from '@lib/data/products.data';

export type ProductViewInfoProps = Omit<
	React.HTMLAttributes<HTMLDivElement>,
	'id'
> & {
	isPopular?: boolean;
	isLoading?: boolean;
	removeWrapper?: boolean;
	rating?: number;
} & Product;

const ProductViewInfo = React.forwardRef<HTMLDivElement, ProductViewInfoProps>(
	(
		{
			id,
			title,
			price,
			author,
			genres,
			description,
			rating,
			cover,
			className,
			...props
		},
		ref,
	) => {
		return (
			<div
				ref={ref}
				className={cn(
					'relative flex flex-col gap-4 lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8',
					className,
				)}
				{...props}
			>
				{/* Product Gallery */}
				<div className="relative flex items-center justify-center w-full">
					<div className="flex items-center justify-center w-full gap-x-10">
						{/* Back Image - Reversed */}
						<div
							className={cn(
								'relative aspect-[2/3] w-2/5 overflow-hidden shadow-md rounded-tr-xl rounded-br-xl flex z-10 scale-x-[-1]',
							)}
						>
							<div className="w-3 bg-gradient-to-r from-amber-950/70 to-amber-950/50 rounded-l-md shrink-0" />

							<div className="relative z-20 flex-1 pb-3 overflow-hidden shadow-sm">
								<Image
									removeWrapper
									alt={title}
									className={cn(
										'object-cover object-center w-full h-full filter sepia',
										'rounded-tl-none rounded-bl-none',
									)}
									src={cover}
								/>

								<div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none bg-black/60 scale-x-[-1]">
									<span className="text-sm font-medium tracking-wide text-white uppercase">
										Back Cover
									</span>
								</div>

								<div className="absolute inset-0 z-30 pointer-events-none bg-gradient-to-t from-black/10 via-transparent to-white/10" />

								<div className="absolute bottom-0 left-0 right-0 z-40 h-4">
									<div className="w-full h-full shadow-md rounded-br-md bg-gradient-to-t from-slate-300 to-slate-200/10" />
								</div>
							</div>
						</div>

						{/* Main Image - Front */}
						<div
							className={cn(
								'relative aspect-[2/3] w-2/5 overflow-hidden shadow-md rounded-tr-xl rounded-br-xl flex z-10',
							)}
						>
							<div className="w-3 bg-gradient-to-r from-amber-950/70 to-amber-950/50 rounded-l-md shrink-0" />

							<div className="relative z-20 flex-1 pb-3 overflow-hidden shadow-sm">
								<Image
									removeWrapper
									alt={title}
									className={cn(
										'object-cover object-center w-full h-full',
										'rounded-tl-none rounded-bl-none',
									)}
									src={cover}
								/>

								<div className="absolute inset-0 z-30 pointer-events-none bg-gradient-to-t from-black/10 via-transparent to-white/10" />

								<div className="absolute bottom-0 left-0 right-0 z-40 h-4">
									<div className="w-full h-full shadow-md rounded-br-md bg-gradient-to-t from-slate-300 to-slate-200/10" />
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="flex flex-col justify-start w-full px-10">
					<h1 className="text-2xl font-bold tracking-tight">{title}</h1>
					<h2 className="sr-only">Book information</h2>
					{/* <div className="flex items-center gap-2 my-2">
						<RatingRadioGroup hideStarsText size="sm" value={`${rating}`} />
						<p className="text-small text-default-400">
							{ratingCount} {ratingCount === 1 ? 'review' : 'reviews'}
						</p>
					</div> */}
					<p className="text-xl font-medium tracking-tight text-primary">
						${price}
					</p>
					<div className="mt-4">
						<p className="sr-only">Product description</p>
						<p className="line-clamp-3 text-medium text-default-900">
							{description}
						</p>
					</div>
					<div className="mt-4">
						<p className="sr-only">Author name</p>
						<p className="line-clamp-3 text-medium text-default-900">
							{author}
						</p>
					</div>
					<div className="flex flex-col gap-1 mt-6">
						<div className="flex items-center gap-2 mb-4 text-default-700">
							<Icon icon="lucide:mail-check" width={18} />
							<p className="font-medium text-small">
								Order confirmation will be sent to your email
							</p>
						</div>
					</div>
					{/* <Accordion
						className="mt-2 -mx-1"
						itemClasses={{
							title: 'text-default-400',
							content: 'pt-0 pb-6 text-base text-default-500',
						}}
						items={details}
						selectionMode="multiple"
					>
						{details
							? details.map(({ title, items }) => (
									<AccordionItem key={title} title={title}>
										<ul className="list-disc list-inside">
											{items.map((item) => (
												<li key={item} className="text-default-500">
													{item}
												</li>
											))}
										</ul>
									</AccordionItem>
								))
							: []}
					</Accordion> */}
					<div className="flex gap-2 mt-2">
						<Button
							fullWidth
							className="font-medium text-white text-medium"
							color="primary"
							size="lg"
							startContent={<Icon icon="lucide:shopping-cart" width={24} />}
						>
							Add to cart
						</Button>
					</div>
				</div>
			</div>
		);
	},
);

ProductViewInfo.displayName = 'ProductViewInfo';

export default ProductViewInfo;
