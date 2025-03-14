import type { DateValue } from '@heroui/calendar';
import { Avatar, Select, SelectItem, type SharedSelection, cn } from '@heroui/react';
import { Tab, Tabs } from '@heroui/react';
import { Icon } from '@iconify/react';
import { format } from 'date-fns';
import { useMemo } from 'react';

import {
	type DurationEnum,
	type TimeSlot,
	durations,
	timeZoneOptions,
} from '../../config/Calendar/calendar.config';

interface BookingDetailsProps {
	className?: string;
	selectedTimeZone: string;
	selectedDuration: DurationEnum;
	onTimeZoneChange?: (keys: SharedSelection) => void;
	onDurationChange?: (selectedKey: React.Key) => void;
	selectedTimeSlotRange?: TimeSlot[];
	selectedDate?: DateValue;
	isShort: boolean;
}

export default function BookingDetails({
	className,
	selectedTimeZone,
	selectedDuration,
	onDurationChange,
	onTimeZoneChange,
	selectedTimeSlotRange,
	selectedDate,
	isShort,
}: BookingDetailsProps) {
	const bookingDate = useMemo(() => {
		if (selectedDate) {
			const date = new Date(selectedDate.toString());

			return format(date, 'EEEE, MMMM d, yyyy');
		}

		return '';
	}, [selectedDate]);

	const defaultClassName = isShort
		? 'flex flex-col p-4 lg:w-[220px] lg:px-4'
		: 'flex flex-col p-4 lg:px-4';

	return (
		<div className={cn(defaultClassName, className)}>
			<p className="mb-2 text-lg font-semibold text-main-color">Reservación</p>
			<p className="mb-4 text-small text-default-500">
				Seleccione la fecha y la hora de su reserva en el horario disponible.
			</p>
			<div className="flex flex-col gap-3 mb-6">
				<div
					className={cn('flex items-start gap-2', {
						hidden: !bookingDate,
					})}
				>
					<Icon className="text-default-300" icon="solar:calendar-minimalistic-bold" width={16} />
					<div className="text-xs font-medium text-default-600">
						<p>{bookingDate}</p>
						<p>{`${selectedTimeSlotRange?.[0].label} - ${selectedTimeSlotRange?.[1].label}`}</p>
					</div>
				</div>
				<div className="flex items-center gap-2">
					<Icon className="text-default-300" icon="solar:clock-circle-bold" width={16} />
					<p className="text-xs font-medium text-default-600">{selectedDuration}</p>
				</div>
				<div className="flex items-center gap-2">
					<Icon className="text-default-300" icon="lucide:building-2" width={16} />
					<p className="text-xs font-medium text-default-600">PUCMM</p>
				</div>
			</div>
		</div>
	);
}
