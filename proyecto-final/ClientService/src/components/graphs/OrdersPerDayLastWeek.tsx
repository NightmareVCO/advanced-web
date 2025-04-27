'use client';

import type { ButtonProps, CardProps } from '@heroui/react';

import { Card, cn } from '@heroui/react';
import React from 'react';
import {
	Bar,
	BarChart,
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
		title: 'Orders Per Day in Last Week',
		categories: ['Orders'],
		color: 'primary',
		chartData: [
			{
				weekday: 'Mon',
				orders: 45,
			},
			{
				weekday: 'Tue',
				orders: 40,
			},
			{
				weekday: 'Wed',
				orders: 52,
			},
			{
				weekday: 'Thu',
				orders: 28,
			},
			{
				weekday: 'Fri',
				orders: 30,
			},
			{
				weekday: 'Sat',
				orders: 45,
			},
			{
				weekday: 'Sun',
				orders: 45,
			},
		],
	},
];

export default function OrdersPerDayLastWeek() {
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
				'h-[340px] border border-transparent dark:border-default-100',
				className,
			)}
			{...props}
		>
			<div className="flex flex-col p-4 gap-y-4">
				<dt>
					<h3 className="font-medium text-small text-default-900">{title}</h3>
				</dt>
				<dd className="flex justify-end w-full gap-4 text-tiny text-default-800">
					{categories.map((category, index) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						<div key={index} className="flex items-center gap-2">
							<span
								className="w-2 h-2 rounded-full"
								style={{
									backgroundColor: `hsl(var(--heroui-${color}-${(index + 1) * 400}))`,
								}}
							/>
							<span className="capitalize">{category}</span>
						</div>
					))}
				</dd>
			</div>
			<ResponsiveContainer
				className="[&_.recharts-surface]:outline-none"
				height="100%"
				width="100%"
			>
				<BarChart
					accessibilityLayer
					data={chartData}
					margin={{
						top: 20,
						right: 14,
						left: -8,
						bottom: 5,
					}}
				>
					<XAxis
						dataKey="weekday"
						strokeOpacity={0.5}
						style={{ fontSize: 'var(--heroui-font-size-tiny)', color: 'red' }}
						tickLine={false}
					/>
					<YAxis
						axisLine={false}
						style={{ fontSize: 'var(--heroui-font-size-tiny)' }}
						tickLine={false}
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
														backgroundColor: `hsl(var(--heroui-${color}-${(index + 1) * 500}))`,
													}}
												/>
												<div className="flex items-center justify-between w-full pr-1 text-xs gap-x-2 text-default-800">
													<span className="text-default-500">{category}</span>
													<span className="font-mono font-medium text-default-800">
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
					{categories.map((category, index) => (
						<Bar
							key={`${category}-${
								// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
								index
							}`}
							animationDuration={450}
							animationEasing="ease"
							barSize={100}
							dataKey={category.toLowerCase()}
							fill={`hsl(var(--heroui-${color}-${(index + 1) * 500}))`}
							radius={index === categories.length - 1 ? [4, 4, 0, 0] : 0}
							stackId="bars"
						/>
					))}
				</BarChart>
			</ResponsiveContainer>
		</Card>
	);
});

BarChartCard.displayName = 'BarChartCard';
