'use client';

import { Button, Card, Chip, cn } from '@heroui/react';
import { Icon } from '@iconify/react';
import React from 'react';

const data = [
	{
		title: 'Today Orders',
		value: '23',
		changeType: 'neutral',
		iconName: 'lucide:notebook-text',
	},
	{
		title: 'Today Sales',
		value: '$1,232',
		changeType: 'neutral',
		iconName: 'lucide:circle-dollar-sign',
	},
	{
		title: 'Total Books',
		value: '700',
		changeType: 'positive',
		iconName: 'lucide:users-round',
	},
];

export default function TodayOrdersTodaySalesTotalBooks() {
	return (
		<dl className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
			{data.map(({ title, value, changeType, iconName }, index) => (
				<Card
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					key={index}
					className="border border-transparent dark:border-default-100"
				>
					<div className="flex p-4">
						<div
							className={cn(
								'mt-1 flex h-8 w-8 items-center justify-center rounded-md',
								{
									'bg-success-50': changeType === 'positive',
									'bg-warning-50': changeType === 'neutral',
									'bg-danger-50': changeType === 'negative',
								},
							)}
						>
							{changeType === 'positive' ? (
								<Icon className="text-success" icon={iconName} width={20} />
							) : changeType === 'neutral' ? (
								<Icon className="text-warning" icon={iconName} width={20} />
							) : (
								<Icon className="text-danger" icon={iconName} width={20} />
							)}
						</div>

						<div className="flex flex-col gap-y-2">
							<dt className="mx-4 font-medium text-small text-default-800">
								{title}
							</dt>
							<dd className="px-4 text-2xl font-semibold text-default-900">
								{value}
							</dd>
						</div>
					</div>
				</Card>
			))}
		</dl>
	);
}
