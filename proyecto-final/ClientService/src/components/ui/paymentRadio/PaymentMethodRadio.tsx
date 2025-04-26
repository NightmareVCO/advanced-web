'use client';

import type { RadioProps } from '@heroui/react';

import { Chip, Radio } from '@heroui/react';
import { cn } from '@heroui/react';
import React from 'react';

export type PaymentMethodRadioProps = RadioProps & {
	icon?: React.ReactNode;
	label?: string;
	isExpired?: boolean;
	isRecommended?: boolean;
};

const PaymentMethodRadio = React.forwardRef<
	HTMLInputElement,
	PaymentMethodRadioProps
>(
	(
		{
			label,
			children,
			description,
			icon,
			isExpired,
			isRecommended,
			classNames = {},
			className,
			...props
		},
		ref,
	) => (
		<Radio
			ref={ref}
			{...props}
			classNames={{
				...classNames,
				base: cn(
					'inline-flex m-0 px-3 py-4 max-w-[100%] items-center justify-between',
					'flex-row-reverse w-full cursor-pointer rounded-lg 3 !border-medium border-default-100',
					'data-[selected=true]:border-primary-500',
					classNames?.base,
					className,
				),
				labelWrapper: cn('ml-0', classNames?.labelWrapper),
			}}
			color="primary"
		>
			<div className="flex items-center w-full gap-3">
				<div className="flex p-2 item-center rounded-small">{icon}</div>
				<div className="flex flex-col w-full gap-1">
					<div className="flex items-center gap-3">
						<p className="text-small">{label}</p>
						{isExpired && (
							<Chip className="h-6 p-0 text-tiny" color="danger">
								Expired
							</Chip>
						)}
						{isRecommended && (
							<Chip
								className="h-6 p-0 text-tiny"
								color="success"
								variant="flat"
							>
								Recommended
							</Chip>
						)}
					</div>
					<p className="text-tiny text-default-700">
						{description || children}
					</p>
				</div>
			</div>
		</Radio>
	),
);

PaymentMethodRadio.displayName = 'PaymentMethodRadio';

export default PaymentMethodRadio;
