'use client';

import type { SliderProps } from '@heroui/react';
import type { RangeFilter, RangeValue } from '@lib/data/filter.data';

import { Divider, Input, Slider } from '@heroui/react';
import { cn } from '@heroui/react';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { useDebouncedCallback } from 'use-debounce';

export type PriceSliderAnimation = 'opacity' | 'height';

export type PriceSliderProps = Omit<SliderProps, 'ref'> & {
	range?: RangeFilter;
	animation?: PriceSliderAnimation;
};

function clampValue(value: number, min: number, max: number) {
	return Math.min(Math.max(value, min), max);
}

function scaleValue(
	value: number,
	fromRange: RangeValue,
	toRange: RangeValue = [0, 100],
) {
	const [fromMin, fromMax] = fromRange;
	const [toMin, toMax] = toRange;

	const scale = (toMax - toMin) / (fromMax - fromMin);

	return (value - fromMin) * scale + toMin;
}

export type PriceSliderPipProps = {
	isInRange: boolean;
	animation?: PriceSliderAnimation;
};

const PriceSliderPip: React.FC<PriceSliderPipProps> = ({
	animation = 'height',
	isInRange,
}) => {
	const rand = React.useMemo(() => Math.floor(Math.random() * 100), []);

	const height = `${clampValue(rand, 30, 100)}%`;

	const pip = React.useMemo(() => {
		if (animation === 'height') {
			return (
				<span
					className="relative h-12 w-1 rounded-full bg-default-100 after:absolute after:bottom-0 after:h-0 after:w-full after:rounded-full after:bg-primary after:transition-all after:!duration-500 after:content-[''] data-[in-range=true]:after:h-full"
					data-in-range={isInRange}
					style={{
						height,
					}}
				/>
			);
		}

		return (
			<span
				className="h-12 w-1 rounded-full bg-primary transition-all !duration-500"
				style={{
					background: isInRange
						? 'hsl(var(--heroui-primary-500))'
						: 'hsl(var(--heroui-default-100))',
					height,
				}}
			/>
		);
	}, [isInRange, height, animation]);

	return pip;
};

const PriceSlider = React.forwardRef<HTMLDivElement, PriceSliderProps>(
	({ range, animation, className, ...props }, ref) => {
		const searchParams = useSearchParams();
		const router = useRouter();

		const urlMinPrice = Number.parseInt(searchParams.get('minPrice') || '');
		const urlMaxPrice = Number.parseInt(searchParams.get('maxPrice') || '');

		const defaultValue = React.useMemo<RangeValue>(() => {
			const min = Number.isNaN(urlMinPrice) ? (range?.min ?? 0) : urlMinPrice;
			const max = Number.isNaN(urlMaxPrice)
				? (range?.max ?? 1000)
				: urlMaxPrice;
			return [min, max];
		}, [urlMinPrice, urlMaxPrice, range]);

		const [value, setValue] = React.useState<RangeValue>(defaultValue);

		const rangePercentageValue = React.useMemo(() => {
			const rangeScale = [
				range?.min || defaultValue[0],
				range?.max || defaultValue[1],
			] as RangeValue;

			const minPercentage = Math.floor(scaleValue(value[0], rangeScale));
			const maxPercentage = Math.floor(scaleValue(value[1], rangeScale));

			return [minPercentage, maxPercentage] as const;
		}, [value, range?.min, range?.max, defaultValue]);

		const rangePips = React.useMemo(() => {
			return Array.from({ length: 32 }).map((_, index) => {
				const pipValuePercentage = Math.round(scaleValue(index, [0, 31]));

				const isInRange =
					pipValuePercentage >= rangePercentageValue[0] + 5 &&
					pipValuePercentage <= rangePercentageValue[1] + 2;

				return (
					<PriceSliderPip
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						key={index}
						animation={animation}
						isInRange={isInRange}
					/>
				);
			});
		}, [animation, rangePercentageValue]);

		const onMinInputValueChange = React.useCallback(
			(inputValue: string) => {
				const newValue = Number(inputValue);
				const minValue = range?.min ?? defaultValue[0];

				if (!Number.isNaN(newValue)) {
					const clampedValue = clampValue(newValue, minValue, value[1]);
					setValue([clampedValue, value[1]]);
					const params = new URLSearchParams(
						Array.from(searchParams.entries()),
					);
					params.set('minPrice', clampedValue.toString());
					router.push(`?${params.toString()}`, { scroll: false });
				}
			},
			[value, range?.min, defaultValue, searchParams, router],
		);

		const onMaxInputValueChange = React.useCallback(
			(inputValue: string) => {
				const newValue = Number(inputValue);
				const maxValue = range?.max ?? defaultValue[1];

				if (!Number.isNaN(newValue) && newValue <= maxValue) {
					setValue([value[0], newValue]);
					const params = new URLSearchParams(
						Array.from(searchParams.entries()),
					);
					params.set('maxPrice', newValue.toString());
					router.push(`?${params.toString()}`, { scroll: false });
				}
			},
			[value, range?.max, defaultValue, searchParams, router],
		);

		const updatePriceQuery = useDebouncedCallback((newValue: RangeValue) => {
			const params = new URLSearchParams(Array.from(searchParams.entries()));
			params.set('minPrice', newValue[0].toString());
			params.set('maxPrice', newValue[1].toString());
			router.push(`?${params.toString()}`, { scroll: false });
		}, 500);

		return (
			<div className={cn('flex flex-col gap-3', className)}>
				<div className="flex flex-col gap-1">
					<div className="flex items-end justify-between w-full h-12 px-2">
						{rangePips}
					</div>
					<Slider
						{...props}
						ref={ref}
						formatOptions={{ style: 'currency', currency: 'USD' }}
						maxValue={range?.max}
						minValue={range?.min}
						size="sm"
						step={range?.step}
						value={value}
						onChange={(value) => {
							setValue(value as RangeValue);
							updatePriceQuery(value as RangeValue);
						}}
					/>
				</div>
				<div className="flex items-center">
					<Input
						aria-label="Min price"
						labelPlacement="outside"
						startContent={<p className="text-default-400">$</p>}
						type="number"
						value={`${value[0]}`}
						onValueChange={onMinInputValueChange}
					/>
					<Divider className="w-2 mx-2" />
					<Input
						aria-label="Max price"
						labelPlacement="outside"
						startContent={<p className="text-default-400">$</p>}
						type="number"
						value={`${value[1]}`}
						onValueChange={onMaxInputValueChange}
					/>
				</div>
			</div>
		);
	},
);

PriceSlider.displayName = 'PriceSlider';

export default PriceSlider;
