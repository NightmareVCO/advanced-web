import { ScrollShadow } from '@heroui/scroll-shadow';
import { Tab, Tabs } from '@heroui/tabs';
import { useEffect, useMemo, useState } from 'react';

import type { DurationEnum, TimeSlot } from '../../config/Calendar/calendar.config';
import { TimeFormatEnum, timeFormats } from '../../config/Calendar/calendar.config';

import CalendarTime from './CalendarTime';

interface CalendarTimeSelectProps {
	weekday: string;
	day: number;
	month: number;
	year: number;
	duration: DurationEnum;
	selectedTime: string;
	onTimeChange: (time: string, selectedTimeSlotRange?: TimeSlot[]) => void;
	onConfirm: () => void;
}

interface Availability {
	[timeSlot: string]: number; // number of appointments for this time slot
}

export default function CalendarTimeSelect({
	weekday,
	day,
	month,
	year,
	duration,
	selectedTime,
	onTimeChange,
	onConfirm,
}: CalendarTimeSelectProps) {
	const [timeFormat, setTimeFormat] = useState<TimeFormatEnum>(TimeFormatEnum.TwelveHour);
	const [availability, setAvailability] = useState<Availability>({});
	const [loading, setLoading] = useState<boolean>(false);

	const fetchAvailability = async (time: string) => {
		try {
			const response = await fetch(
				`https://4u0zfu3fha.execute-api.us-east-2.amazonaws.com/reservationAvailability?requestedTime=${time}&requestedDay=${day}&requestedMonth=${month}&requestedYear=${year}`,
			);
			const data = await response.json();
			return data.Items ? data.Items.length : 0;
		} catch (error) {
			console.error(`Error fetching availability for ${time}:`, error);
			return 0;
		}
	};

	useEffect(() => {
		const loadAllAvailability = async () => {
			setLoading(true);
			const availabilityData: Availability = {};
			const startHour = 8;
			const endHour = 22;

			const fetchPromises = [];

			for (let hours = startHour; hours <= endHour; hours++) {
				const time = `${hours.toString().padStart(2, '0')}:00`;
				fetchPromises.push(
					fetchAvailability(time).then((count) => {
						availabilityData[time] = count;
					}),
				);
			}

			await Promise.all(fetchPromises);
			setAvailability(availabilityData);
			setLoading(false);
		};

		loadAllAvailability();
	}, [day, month, year]);

	const onTimeFormatChange = (selectedKey: React.Key) => {
		const timeFormatIndex = timeFormats.findIndex((tf) => tf.key === selectedKey);

		if (timeFormatIndex !== -1) {
			setTimeFormat(timeFormats[timeFormatIndex].key);
			onTimeChange('');
		}
	};

	const timeSlots = useMemo(() => {
		const now = new Date();
		const currentHour = now.getHours();
		const currentDay = now.getDate();
		const slots: TimeSlot[] = [];
		const startHour = 8;
		const endHour = 22;

		const shouldValidateHours = currentDay === day;

		for (let hours = startHour; hours <= endHour; hours++) {
			const mins = 0;
			const value = `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
			const appointmentCount = availability[value] || 0;
			const showHour = shouldValidateHours && hours < currentHour;
			const isFull = appointmentCount >= 7;
			const disabled = hours === 22 || hours < 8 || showHour || isFull;

			if (timeFormat === TimeFormatEnum.TwelveHour) {
				const period = hours >= 12 ? 'pm' : 'am';
				const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;

				slots.push({
					value,
					label: `${displayHours}:${mins.toString().padStart(2, '0')} ${period}`,
					disabled,
					appointmentCount,
				});
			} else {
				slots.push({
					value,
					label: value,
					disabled,
					appointmentCount,
				});
			}
		}

		return slots;
	}, [timeFormat, day, availability]);

	return (
		<div className="flex w-full flex-col items-center gap-2 px-6 pb-6 lg:w-[220px] lg:p-0">
			<div className="flex justify-between w-full py-3">
				<p className="flex items-center text-small">
					<span className="text-default-700">{weekday}</span>
					&nbsp;
					<span className="text-default-500">{day}/</span>
					<span className="text-default-500">{month}/</span>
					<span className="text-default-500">{year}</span>
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
