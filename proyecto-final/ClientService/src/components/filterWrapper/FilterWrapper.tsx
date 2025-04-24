'use client';

import SortInput from '@components/input/SortInput';
import {
	Accordion,
	AccordionItem,
	Checkbox,
	CheckboxGroup,
	Divider,
	RadioGroup,
	ScrollShadow,
	Switch,
	Tab,
	Tabs,
} from '@heroui/react';
import { cn } from '@heroui/react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState, useCallback, useEffect } from 'react';

import { type Filter, FilterTypeEnum } from '@lib/data/filter.data';

import PriceSlider from '@components/filterWrapper/components/priceSlider/PriceSlider';
import RatingRadioGroup from '@components/filterWrapper/components/ratingRadio/RatingRadio';
import TagGroupItem from '@components/filterWrapper/components/tagGroup/TagGroup';

export type FiltersWrapperProps = React.HTMLAttributes<HTMLDivElement> & {
	items: Filter[];
	title?: string;
	showTitle?: boolean;
	showActions?: boolean;
	className?: string;
	scrollShadowClassName?: string;
};

const FiltersWrapper = React.forwardRef<HTMLDivElement, FiltersWrapperProps>(
	(
		{
			items,
			title = 'Filters',
			showTitle = true,
			showActions = true,
			className,
			scrollShadowClassName,
		},
		ref,
	) => {
		const searchParams = useSearchParams();

		const genreFromUrl =
			searchParams.get('genre')?.split(',').filter(Boolean) || [];
		const [selectedGenres, setSelectedGenres] =
			useState<string[]>(genreFromUrl);

		const router = useRouter();

		const updateGenreInUrl = (selectedGenres: string[]) => {
			const params = new URLSearchParams(Array.from(searchParams.entries()));

			if (selectedGenres.length > 0) {
				params.set('genre', selectedGenres.join(','));
			} else {
				params.delete('genre');
			}

			router.push(`?${params.toString()}`, { scroll: false });
		};

		const handleCheckboxChange = (value: string) => {
			setSelectedGenres((prevSelected) => {
				if (prevSelected.includes(value)) {
					return prevSelected.filter((genre) => genre !== value);
				}
				return [...prevSelected, value];
			});
		};

		// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
		const renderFilter = useCallback(
			(filter: Filter) => {
				switch (filter.type) {
					case FilterTypeEnum.Tabs:
						return (
							<Tabs fullWidth aria-label={filter.title}>
								{filter.options?.map((option) => (
									<Tab key={option.value} title={option.title} />
								))}
							</Tabs>
						);
					case FilterTypeEnum.PriceRange:
						return (
							<div className="flex flex-col gap-y-6">
								<PriceSlider aria-label={filter.title} range={filter.range} />
								<SortInput />
							</div>
						);
					case FilterTypeEnum.Rating:
						return <RatingRadioGroup value={''} />;
					case FilterTypeEnum.TagGroup:
						return (
							<CheckboxGroup
								aria-label="Select amenities"
								className="gap-1"
								orientation="horizontal"
							>
								{filter.options?.map((option) => (
									<TagGroupItem
										key={option.value}
										icon={option.icon}
										value={option.value}
									>
										{option.title}
									</TagGroupItem>
								))}
							</CheckboxGroup>
						);
					case FilterTypeEnum.Toggle:
						return (
							<div className="flex flex-col -mx-4">
								{filter.options?.map((option) => (
									<Switch
										key={option.value}
										classNames={{
											base: cn(
												'inline-flex flex-row-reverse w-full max-w-md bg-content1 hover:bg-content2 items-center',
												'justify-between cursor-pointer rounded-lg gap-2 -mr-2 px-4 py-3',
											),
											wrapper: 'mr-0',
										}}
										value={option.value}
									>
										<div className="flex flex-col gap-1">
											<p className="text-medium">{option.title}</p>
											<p className="text-tiny text-default-400">
												{option.description}
											</p>
										</div>
									</Switch>
								))}
							</div>
						);
					case FilterTypeEnum.CheckboxGroup:
						return (
							<Accordion
								className="px-0"
								defaultExpandedKeys={filter?.defaultOpen ? ['options'] : []}
							>
								<AccordionItem
									key="options"
									classNames={{
										title: 'text-medium font-medium leading-8 text-default-600',
										trigger: 'p-0',
										content: 'px-1',
									}}
									title={filter.title}
								>
									<CheckboxGroup
										aria-label={filter.title}
										defaultValue={selectedGenres}
									>
										{filter.options?.map((option) => (
											<Checkbox
												key={option.value}
												value={option.value}
												onChange={() => handleCheckboxChange(option.value)}
											>
												{option.title}
											</Checkbox>
										))}
									</CheckboxGroup>
								</AccordionItem>
							</Accordion>
						);
				}
			},
			[selectedGenres],
		);

		// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
		useEffect(() => {
			updateGenreInUrl(selectedGenres);
		}, [selectedGenres]);

		return (
			<div
				ref={ref}
				className={cn(
					'h-full max-h-fit w-full max-w-sm rounded-medium bg-content1 p-6',
					className,
				)}
			>
				{showTitle && (
					<>
						<h2 className="font-medium text-large text-foreground">{title}</h2>
						<Divider className="my-3 bg-default-100" />
					</>
				)}
				<ScrollShadow
					className={cn(
						'-mx-6 h-full px-6',
						{
							'max-h-[calc(100%_-_220px)]': showActions,
						},
						scrollShadowClassName,
					)}
				>
					<div className="flex flex-col gap-6">
						{items.map((filter) => (
							<div key={filter.title} className="flex flex-col gap-3">
								{filter.type !== FilterTypeEnum.CheckboxGroup && (
									<div>
										<h3 className="font-medium leading-8 text-medium text-default-600">
											{filter.title}
										</h3>
										<p className="text-small text-default-400">
											{filter.description}
										</p>
									</div>
								)}
								{renderFilter(filter)}
							</div>
						))}
					</div>
				</ScrollShadow>
			</div>
		);
	},
);

FiltersWrapper.displayName = 'FiltersWrapper';

export default FiltersWrapper;
