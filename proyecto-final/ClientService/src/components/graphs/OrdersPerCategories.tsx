'use client';

import type { ButtonProps, CardProps } from '@heroui/react';

import { Card, cn } from '@heroui/react';
import React from 'react';
import {
	Bar,
	BarChart,
	CartesianGrid,
	LabelList,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';

type ChartData = {
	weekday: string;
	[key: string]: string | number;
};

type BarChartProps = {
	title: string;
	color: ButtonProps['color'];
	categories: string[];
	chartData: ChartData[];
};

const data: BarChartProps[] = [
	{
		title: 'Amount of Order Per Categories',
		categories: [
			'Classic',
			'Comic/Graphic Novel',
			'Crime/Detective',
			'Fable',
			'Fairy tale',
			'Fanfiction',
			'Fantasy',
			'Fiction narrative',
			// 'Fiction in verse',
			// 'Folklore',
			// 'Historical fiction',
			// 'Horror',
			// 'Humor',
			// 'Legend',
			// 'Metafiction',
			// 'Mystery',
			// 'Mythology',
			// 'Mythopoeia',
			// 'Realistic fiction',
			// 'Science fiction',
			// 'Short story',
			// 'Suspense/Thriller',
			// 'Tall tale',
			// 'Western',
			// 'Biography/Autobiography',
			// 'Essay',
			// 'Narrative nonfiction',
			// 'Speech',
			// 'Textbook',
			// 'Reference book',
		],
		color: 'secondary',
		chartData: [
			{
				weekday: 'Mon',
				Classic: 12,
				'Comic/Graphic Novel': 12,
				'Crime/Detective': 20,
				Fable: 15,
				'Fairy tale': 10,
				Fanfiction: 8,
				Fantasy: 9,
				'Fiction narrative': 11,
				// 'Fiction in verse': 60,
				// Folklore: 70,
				// 'Historical fiction': 50,
				// Horror: 40,
				// Humor: 30,
				// Legend: 20,
				// Metafiction: 10,
				// Mystery: 55,
				// Mythology: 65,
				// Mythopoeia: 75,
				// 'Realistic fiction': 85,
				// 'Science fiction': 95,
				// 'Short story': 105,
				// 'Suspense/Thriller': 115,
				// 'Tall tale': 125,
				// Western: 135,
				// 'Biography/Autobiography': 145,
				// Essay: 155,
				// 'Narrative nonfiction': 165,
				// Speech: 175,
				// Textbook: 185,
				// 'Reference book': 195,
			},
			{
				weekday: 'Tue',
				Classic: 13,
				'Comic/Graphic Novel': 13,
				'Crime/Detective': 21,
				Fable: 16,
				'Fairy tale': 11,
				Fanfiction: 9,
				Fantasy: 10,
				'Fiction narrative': 12,
				// 'Fiction in verse': 70,
				// Folklore: 80,
				// 'Historical fiction': 60,
				// Horror: 50,
				// Humor: 40,
				// Legend: 30,
				// Metafiction: 20,
				// Mystery: 65,
				// Mythology: 75,
				// Mythopoeia: 85,
				// 'Realistic fiction': 95,
				// 'Science fiction': 105,
				// 'Short story': 115,
				// 'Suspense/Thriller': 125,
				// 'Tall tale': 135,
				// Western: 145,
				// 'Biography/Autobiography': 155,
				// Essay: 165,
				// 'Narrative nonfiction': 175,
				// Speech: 185,
				// Textbook: 195,
				// 'Reference book': 205,
			},
			{
				weekday: 'Wed',
				Classic: 12,
				'Comic/Graphic Novel': 13,
				'Crime/Detective': 25,
				Fable: 15,
				'Fairy tale': 10,
				Fanfiction: 8,
				Fantasy: 9,
				'Fiction narrative': 11,
				// 'Fiction in verse': 65,
				// Folklore: 75,
				// 'Historical fiction': 55,
				// Horror: 45,
				// Humor: 35,
				// Legend: 25,
				// Metafiction: 15,
				// Mystery: 60,
				// Mythology: 70,
				// Mythopoeia: 80,
				// 'Realistic fiction': 90,
				// 'Science fiction': 100,
				// 'Short story': 110,
				// 'Suspense/Thriller': 120,
				// 'Tall tale': 130,
				// Western: 140,
				// 'Biography/Autobiography': 150,
				// Essay: 160,
				// 'Narrative nonfiction': 170,
				// Speech: 180,
				// Textbook: 190,
				// 'Reference book': 200,
			},
			{
				weekday: 'Thu',
				Classic: 13,
				'Comic/Graphic Novel': 14,
				'Crime/Detective': 15,
				Fable: 15,
				'Fairy tale': 11,
				Fanfiction: 9,
				Fantasy: 15,
				'Fiction narrative': 12,
				// 'Fiction in verse': 75,
				// Folklore: 85,
				// 'Historical fiction': 65,
				// Horror: 55,
				// Humor: 45,
				// Legend: 35,
				// Metafiction: 25,
				// Mystery: 70,
				// Mythology: 80,
				// Mythopoeia: 90,
				// 'Realistic fiction': 100,
				// 'Science fiction': 110,
				// 'Short story': 120,
				// 'Suspense/Thriller': 130,
				// 'Tall tale': 140,
				// Western: 150,
				// 'Biography/Autobiography': 160,
				// Essay: 170,
				// 'Narrative nonfiction': 180,
				// Speech: 190,
				// Textbook: 200,
				// 'Reference book': 210,
			},
			{
				weekday: 'Fri',
				Classic: 14,
				'Comic/Graphic Novel': 15,
				'Crime/Detective': 22,
				Fable: 17,
				'Fairy tale': 12,
				Fanfiction: 10,
				Fantasy: 11,
				'Fiction narrative': 13,
				// 'Fiction in verse': 80,
				// Folklore: 90,
				// 'Historical fiction': 70,
				// Horror: 60,
				// Humor: 50,
				// Legend: 40,
				// Metafiction: 30,
				// Mystery: 75,
				// Mythology: 85,
				// Mythopoeia: 95,
				// 'Realistic fiction': 105,
				// 'Science fiction': 115,
				// 'Short story': 125,
				// 'Suspense/Thriller': 135,
				// 'Tall tale': 145,
				// Western: 155,
				// 'Biography/Autobiography': 165,
				// Essay: 175,
				// 'Narrative nonfiction': 185,
				// Speech: 195,
				// Textbook: 205,
				// 'Reference book': 215,
			},
			{
				weekday: 'Sat',
				Classic: 14,
				'Comic/Graphic Novel': 15,
				'Crime/Detective': 22,
				Fable: 17,
				'Fairy tale': 12,
				Fanfiction: 10,
				Fantasy: 11,
				'Fiction narrative': 13,
				// 'Fiction in verse': 85,
				// Folklore: 95,
				// 'Historical fiction': 75,
				// Horror: 65,
				// Humor: 55,
				// Legend: 45,
				// Metafiction: 35,
				// Mystery: 80,
				// Mythology: 90,
				// Mythopoeia: 100,
				// 'Realistic fiction': 110,
				// 'Science fiction': 120,
				// 'Short story': 130,
				// 'Suspense/Thriller': 140,
				// 'Tall tale': 150,
				// Western: 160,
				// 'Biography/Autobiography': 170,
				// Essay: 180,
				// 'Narrative nonfiction': 190,
				// Speech: 200,
				// Textbook: 210,
				// 'Reference book': 220,
			},
			{
				weekday: 'Sun',
				Classic: 10,
				'Comic/Graphic Novel': 11,
				'Crime/Detective': 20,
				Fable: 10,
				'Fairy tale': 13,
				Fanfiction: 11,
				Fantasy: 12,
				'Fiction narrative': 14,
				// 'Fiction in verse': 90,
				// Folklore: 100,
				// 'Historical fiction': 80,
				// Horror: 70,
				// Humor: 60,
				// Legend: 50,
				// Metafiction: 40,
				// Mystery: 85,
				// Mythology: 95,
				// Mythopoeia: 105,
				// 'Realistic fiction': 115,
				// 'Science fiction': 125,
				// 'Short story': 135,
				// 'Suspense/Thriller': 145,
				// 'Tall tale': 155,
				// Western: 165,
				// 'Biography/Autobiography': 175,
				// Essay: 185,
				// 'Narrative nonfiction': 195,
				// Speech: 205,
				// Textbook: 215,
				// 'Reference book': 225,
			},
		],
	},
];

export default function OrdersPerCategories() {
	return (
		<dl className="grid w-full grid-cols-1">
			{data.map((item, index) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
				<BarChartCard key={index} {...item} />
			))}
		</dl>
	);
}

const formatWeekday = (weekday: string) => {
	const day =
		{
			Mon: 1,
			Tue: 2,
			Wed: 3,
			Thu: 4,
			Fri: 5,
			Sat: 6,
			Sun: 0,
		}[weekday] ?? 0;

	return new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(
		new Date(2024, 0, day),
	);
};

const BarChartCard = React.forwardRef<
	HTMLDivElement,
	Omit<CardProps, 'children'> & BarChartProps
>(({ className, title, categories, color, chartData, ...props }, ref) => {
	return (
		<Card
			ref={ref}
			className={cn(
				'h-[800px] border border-transparent dark:border-default-100',
				className,
			)}
			{...props}
		>
			<div className="flex flex-col p-4 gap-y-2">
				<div className="flex items-center justify-between gap-x-2">
					<dt>
						<h3 className="font-medium text-small text-default-900">{title}</h3>
					</dt>
				</div>
			</div>
			<ResponsiveContainer
				className="[&_.recharts-surface]:outline-none"
				height="100%"
				width="100%"
			>
				<BarChart
					accessibilityLayer
					data={chartData}
					layout="vertical"
					margin={{
						top: 0,
						right: 34,
						left: -4,
						bottom: 5,
					}}
				>
					<CartesianGrid horizontal={false} strokeOpacity={0.25} />
					<XAxis
						hide
						axisLine={false}
						style={{ fontSize: 'var(--heroui-font-size-tiny)' }}
						tickLine={false}
						type="number"
					/>
					<YAxis
						axisLine={false}
						dataKey="weekday"
						strokeOpacity={0.25}
						style={{ fontSize: 'var(--heroui-font-size-tiny)' }}
						tickFormatter={(value) => value.slice(0, 3)}
						tickLine={false}
						type="category"
					/>
					<Tooltip
						content={({ label, payload }) => (
							<div className="flex h-auto min-w-[120px] items-center gap-x-2 rounded-medium bg-background p-2 text-tiny shadow-small">
								<div className="flex flex-col w-full gap-y-1">
									<span className="font-medium text-foreground">
										{formatWeekday(label)}
									</span>
									{payload?.map((p, index) => {
										const name = p.name;
										const value = p.value;
										const category =
											categories.find((c) => c.toLowerCase() === name) ?? name;

										return (
											<div
												key={`${index}-${name}`}
												className="flex items-center w-full gap-x-2"
											>
												<div
													className="flex-none w-2 h-2 rounded-full"
													style={{
														backgroundColor: `hsl(var(--heroui-${color}-${(index + 1) * 100}))`,
													}}
												/>
												<div className="flex items-center justify-between w-full pr-1 text-xs gap-x-2 text-default-700">
													<span className="text-default-500">{category}</span>
													<span className="font-mono font-medium text-default-700">
														{value}
													</span>
												</div>
											</div>
										);
									})}
								</div>
							</div>
						)}
						cursor={false}
					/>
					{categories.map((category, index) => {
						const step = (index + 1) * 100;
						const bg = `hsl(var(--heroui-${color}-${step}))`;
						const fg = `hsl(var(--heroui-${color}-${
							step === 100 ? 600 : step === 200 ? 800 : step === 300 ? 900 : 50
						}))`;

						return (
							<Bar
								key={`${category}-${
									// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
									index
								}`}
								animationDuration={450}
								animationEasing="ease"
								barSize={70}
								dataKey={category}
								fill={bg}
								layout="vertical"
								radius={index === categories.length - 1 ? [0, 8, 8, 0] : 0}
								stackId="bars"
							>
								<LabelList
									dataKey={category}
									fill={fg}
									fontSize={12}
									offset={4}
									position="insideLeft"
								/>
							</Bar>
						);
					})}
				</BarChart>
			</ResponsiveContainer>

			<div className="flex justify-center w-full gap-4 pb-4 text-tiny text-default-800">
				{categories.map((category, index) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					<div key={index} className="flex items-center gap-2">
						<span
							className="w-2 h-2 rounded-full"
							style={{
								backgroundColor: `hsl(var(--heroui-${color}-${(index + 1) * 100}))`,
							}}
						/>
						<span className="capitalize">{category}</span>
					</div>
				))}
			</div>
		</Card>
	);
});

BarChartCard.displayName = 'BarChartCard';
