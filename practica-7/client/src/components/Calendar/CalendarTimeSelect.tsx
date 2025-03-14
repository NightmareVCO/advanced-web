import { ScrollShadow } from '@heroui/scroll-shadow';
import { Tab, Tabs } from '@heroui/tabs';
import { useMemo, useState } from 'react';

import type { DurationEnum, TimeSlot } from '../../config/Calendar/calendar.config';
import { TimeFormatEnum, timeFormats } from '../../config/Calendar/calendar.config';

import CalendarTime from './CalendarTime';

interface CalendarTimeSelectProps {
	weekday: string;
	day: number;
	duration: DurationEnum;
	selectedTime: string;
	onTimeChange: (time: string, selectedTimeSlotRange?: TimeSlot[]) => void;
	onConfirm: () => void;
}

export default function CalendarTimeSelect({
	weekday,
	day,
	duration,
	selectedTime,
	onTimeChange,
	onConfirm,
}: CalendarTimeSelectProps) {
	const [timeFormat, setTimeFormat] = useState<TimeFormatEnum>(TimeFormatEnum.TwelveHour);

	const onTimeFormatChange = (selectedKey: React.Key) => {
		const timeFormatIndex = timeFormats.findIndex((tf) => tf.key === selectedKey);

		if (timeFormatIndex !== -1) {
			setTimeFormat(timeFormats[timeFormatIndex].key);
			onTimeChange('');
		}
	};

	const timeSlots = useMemo(() => {
		const slots: TimeSlot[] = [];
		const startHour = 8; // Starting at 8 AM
		const endHour = 22; // Include 10 PM (22:00)

		for (let hours = startHour; hours <= endHour; hours++) {
			const mins = 0;
			const value = `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
			const disabled = hours === 22; // Disable 10 PM slot

			if (timeFormat === TimeFormatEnum.TwelveHour) {
				const period = hours >= 12 ? 'pm' : 'am';
				const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;

				slots.push({
					value,
					label: `${displayHours}:${mins.toString().padStart(2, '0')} ${period}`,
					disabled,
				});
			} else {
				slots.push({
					value,
					label: value,
					disabled,
				});
			}
		}

		return slots;
	}, [timeFormat]);

	return (
		<div className="flex w-full flex-col items-center gap-2 px-6 pb-6 lg:w-[220px] lg:p-0">
			<div className="flex justify-between w-full py-3">
				<p className="flex items-center text-small">
					<span className="text-default-700">{weekday}</span>
					&nbsp;
					<span className="text-default-500">{day}</span>
				</p>
				<Tabs
					classNames={{
						tab: 'h-6 py-0.5 px-1.5',
						tabList: 'p-0.5 rounded-[7px] gap-0.5',
						cursor: 'rounded-md',
					}}
					size="sm"
					onSelectionChange={onTimeFormatChange}
				>
					{timeFormats.map((timeFormat) => (
						<Tab key={timeFormat.key} title={timeFormat.label} />
					))}
				</Tabs>
			</div>
			<div className="flex h-full max-h-[335px] w-full">
				<ScrollShadow hideScrollBar className="flex flex-col w-full gap-2">
					{timeSlots.map((slot) => (
						<CalendarTime
							key={slot.value}
							isSelected={slot.value === selectedTime}
							slot={slot}
							timeSlots={timeSlots}
							onConfirm={onConfirm}
							onTimeChange={onTimeChange}
						/>
					))}
				</ScrollShadow>
			</div>
		</div>
	);
}
