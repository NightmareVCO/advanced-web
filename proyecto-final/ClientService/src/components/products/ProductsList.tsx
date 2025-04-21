'use client';

import { Button, Image } from '@heroui/react';
import { cn } from '@heroui/react';
import { Icon } from '@iconify/react';
import React from 'react';

import RatingRadioGroup from '@components/filterWrapper/components/ratingRadio/RatingRadio';
import type { ProductItem } from '@lib/data/products.template.data';

export type ProductListItemProps = Omit<
	React.HTMLAttributes<HTMLDivElement>,
	'id'
> & {
	isPopular?: boolean;
	removeWrapper?: boolean;
} & ProductItem;

const ProductListItem = React.forwardRef<HTMLDivElement, ProductListItemProps>(
	(
		{
			name,
			price,
			rating,
			ratingCount,
			description,
			imageSrc,
			isNew,
			isPopular,
			availableColors,
			removeWrapper,
			className,
			...props
		},
		ref,
	) => {
		const [isStarred, setIsStarred] = React.useState(false);
		const hasColors = availableColors && availableColors?.length > 0;

		return (
			<div
				ref={ref}
				className={cn(
					'relative flex w-64 max-w-full flex-none scroll-ml-6 flex-col gap-3 rounded-large bg-content1 p-4 shadow-medium',
					{
						'rounded-none bg-transparent shadow-none': removeWrapper,
					},
					className,
				)}
				{...props}
			>
				{isNew && isPopular ? (
					<span className="absolute z-20 font-semibold right-7 top-7 text-tiny text-default-400">
						NEW
					</span>
				) : null}
				<Button
					isIconOnly
					className={cn('absolute right-6 top-6 z-20', {
						hidden: isPopular,
					})}
					radius="full"
					size="sm"
					variant="flat"
					onPress={() => setIsStarred(!isStarred)}
				>
					<Icon
						className={cn('text-default-500', {
							'text-warning': isStarred,
						})}
						icon="solar:star-bold"
						width={16}
					/>
				</Button>
				<div
					className={cn(
						'relative flex h-52 max-h-full w-full flex-col items-center justify-center overflow-visible rounded-medium bg-content2',
						{
							'h-full justify-between': isPopular,
						},
					)}
				>
					<div
						className={cn('flex flex-col gap-2 px-4 pt-6', {
							hidden: !isPopular,
						})}
					>
						<h3 className="text-xl font-semibold tracking-tight text-default-800">
							{name}
						</h3>
						<p className="text-small text-default-500">{description}</p>
					</div>
					<Image
						removeWrapper
						alt={name}
						className={cn(
							'z-0 h-full max-h-full w-full max-w-[80%] overflow-visible object-contain object-center hover:scale-110',
							{
								'flex h-56 w-56 items-center': isPopular,
								'mb-2': hasColors,
							},
						)}
						src={imageSrc}
					/>
					{hasColors ? (
						<div className="absolute bottom-3">
							<h4 className="sr-only">Available colors</h4>
							<ul className="flex items-center justify-center pt-6 mt-auto space-x-3">
								{availableColors.map((color) => (
									<li
										key={color.name}
										className="w-2 h-2 border rounded-full border-default-300 border-opacity-10"
										style={{ backgroundColor: color.hex }}
									>
										<span className="sr-only">{color.name}</span>
									</li>
								))}
							</ul>
						</div>
					) : null}
				</div>
				<div className="flex flex-col gap-3 px-1">
					<div
						className={cn('flex items-center justify-between', {
							hidden: isPopular,
						})}
					>
						<h3 className="font-medium text-medium text-default-700">{name}</h3>
						<p className="font-medium text-medium text-default-500">${price}</p>
					</div>
					{description && !isPopular ? (
						<p className="text-small text-default-500">{description}</p>
					) : null}
					{rating !== undefined ? (
						<RatingRadioGroup
							// @ts-ignore
							hideStarsText
							isReadOnly
							className="gap-1"
							label={
								<p className="text-small text-default-400">({ratingCount})</p>
							}
							size="sm"
							value={`${rating}`}
						/>
					) : null}
					<div className="flex gap-2">
						{isPopular ? (
							<Button
								fullWidth
								className="font-medium bg-default-300/20 text-default-700"
								radius="lg"
								variant="flat"
							>
								Save
							</Button>
						) : null}
						<Button
							fullWidth
							className="font-medium"
							color="primary"
							radius="lg"
							variant={isPopular ? 'flat' : 'solid'}
						>
							Add to cart
						</Button>
					</div>
				</div>
			</div>
		);
	},
);

ProductListItem.displayName = 'ProductListItem';

export default ProductListItem;
