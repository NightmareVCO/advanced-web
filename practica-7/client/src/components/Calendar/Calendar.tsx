import type { CalendarBookingStepType } from '../../lib/types';

import { Calendar, type DateValue } from '@heroui/calendar';
import { cn } from '@heroui/react';
import { Skeleton } from '@heroui/skeleton';
import type { SharedSelection } from '@heroui/system';
import { getLocalTimeZone, isWeekend, today } from '@internationalized/date';
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';
import React, { useEffect, useState } from 'react';

import BookingDetails from '@components/Booking/BookingDetails';
import CalendarBookingConfirmation from '@components/Calendar/CalendarBookingConfirmation';
import CalendarBookingForm from '@components/Calendar/CalendarBookingForm';
import CalendarTimeSelect from '@components/Calendar/CalendarTimeSelect';
import { DurationEnum, type TimeSlot, durations } from '@config/Calendar/calendar.config';

const compareDate = (a: DateValue, b: DateValue): number => {
	const dateA = new Date(a.toString());
	const dateB = new Date(b.toString());

	return dateA.getTime() - dateB.getTime();
};

const LoadingSkeleton = () => (
	<div
		className={
			'flex w-[393px] flex-col items-center gap-5 rounded-large bg-default-50 lg:w-fit lg:flex-row lg:items-start lg:px-6'
		}
	>
		<div className={'flex w-full flex-col p-6 lg:w-[220px] lg:px-4 lg:pt-8'}>
			<Skeleton className={'h-8 w-8 rounded-full'} />
			<Skeleton className="mt-3 h-2.5 w-[60px] rounded-lg" />
			<Skeleton className="mt-[5.5px] h-4 w-[95px]  rounded-lg" />
			<Skeleton className="mt-4 h-[10.5px] w-full  rounded-lg" />
			<Skeleton className="mt-[4.5px] h-[10.5px] w-[112px]  rounded-lg" />
			<Skeleton className="mt-10 h-2.5 w-[40px]  rounded-lg" />
			<Skeleton className="mt-[18px] h-2.5 w-[70px]  rounded-lg" />
			<Skeleton className="mt-[15px] h-2.5 w-[124px]  rounded-lg" />
			<Skeleton className="mt-[29px] h-8 w-[114px]  rounded-lg" />
		</div>
		<div className={'w-full px-6 lg:w-[372px] lg:px-0'}>
			<div className={'flex items-center justify-center py-3'}>
				<Skeleton className={'h-[9px] w-[98px] rounded-full'} />
			</div>
			<div className={'grid grid-cols-4 gap-4'}>
				<Skeleton className={'h-2.5 rounded-full'} />
				<Skeleton className={'h-2.5 rounded-full'} />
				<Skeleton className={'h-2.5 rounded-full'} />
				<Skeleton className={'h-2.5 rounded-full'} />
			</div>
			<div className={'mt-8 grid grid-cols-7 gap-5'}>
				{Array.from({ length: 35 }).map((_, i) => {
					return (
						<Skeleton
							key={i}
							className={cn('size-[29px] rounded-full ', {
								'opacity-0': i === 0 || i === 1 || i === 33 || i === 34,
							})}
						/>
					);
				})}
			</div>
		</div>
		<div className={'w-full  gap-2 px-6 pb-6 lg:w-[220px] lg:p-0'}>
			<div className={'flex items-center justify-between py-2'}>
				<Skeleton className={'h-[15px] w-[100px] rounded-full '} />
				<Skeleton className={'h-[27px] w-[67px] rounded-full '} />
			</div>
			<div className={'mt-2 space-y-2'}>
				<Skeleton className={'h-10 w-full rounded-full '} />
				<Skeleton className={'h-10 w-full rounded-full '} />
				<Skeleton className={'h-10 w-full rounded-full '} />
				<Skeleton className={'h-10 w-full rounded-full '} />
			</div>
		</div>
	</div>
);

export default function CalendarBooking({
	setIsCompleted,
}: { setIsCompleted: React.Dispatch<React.SetStateAction<boolean>> }) {
	const [isLoading, setIsLoading] = useState(true);
	const [calendarBookingStep, setCalendarBookingStep] =
		useState<CalendarBookingStepType>('booking_initial');
	const [selectedTimeZone, setSelectedTimeZone] = useState<string>(
		// use system time zone as default
		Intl.DateTimeFormat().resolvedOptions().timeZone,
	);
	const [selectedDuration, setSelectedDuration] = useState<DurationEnum>(DurationEnum.OneHour);
	const [selectedDate, setSelectedDate] = React.useState<DateValue>(today(getLocalTimeZone()));
	const [selectedTimeSlotRange, setSelectedTimeSlotRange] = useState<TimeSlot[]>([]);
	const [selectedTime, setSelectedTime] = useState<string>('');

	const onTimeZoneChange = (keys: SharedSelection) => {
		const newTimeZone = Array.from(keys)[0];

		if (newTimeZone) {
			setSelectedTimeZone(newTimeZone.toString());
		}
	};

	const onDurationChange = (selectedKey: React.Key) => {
		const durationIndex = durations.findIndex((d) => d.key === selectedKey);

		setSelectedDuration(durations[durationIndex].key);
		setSelectedTime('');
	};

	const onDateChange = (date: DateValue) => {
		setSelectedDate(date);
	};

	const onTimeChange = (time: string, selectedTimeSlotRange?: TimeSlot[]) => {
		if (selectedTimeSlotRange) setSelectedTimeSlotRange(selectedTimeSlotRange);
		setSelectedTime(time);
	};

	const onConfirm = () => {
		setCalendarBookingStep('booking_form');
	};

	const isDateUnavailable = (date: DateValue) => {
		return isWeekend(date, 'en-US') || compareDate(date, today(getLocalTimeZone())) < 0;
	};

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsLoading(false);

			return () => {
				clearTimeout(timer);
			};
		}, 500);
	}, []);
	if (isLoading) {
		return <LoadingSkeleton />;
	}
	if (calendarBookingStep === 'booking_form') {
		return (
			<CalendarBookingForm
				selectedDate={selectedDate}
				selectedTimeSlotRange={selectedTimeSlotRange}
				setCalendarBookingStep={setCalendarBookingStep}
				setIsCompleted={setIsCompleted}
			/>
		);
	}

	if (calendarBookingStep === 'booking_confirmation') {
		return <CalendarBookingConfirmation />;
	}

	return (
		<div className="flex flex-col items-center gap-5 bg-default-50 lg:w-fit lg:flex-row lg:items-start lg:px-6">
			<BookingDetails
				selectedDuration={selectedDuration}
				selectedTimeZone={selectedTimeZone}
				onDurationChange={onDurationChange}
				onTimeZoneChange={onTimeZoneChange}
				isShort
			/>
			<Calendar
				calendarWidth="372px"
				className="shadow-none dark:bg-transparent"
				classNames={{
					headerWrapper: 'bg-transparent px-3 pt-1.5 pb-3',
					title: 'text-default-700 text-small font-semibold',
					gridHeader: 'bg-transparent shadow-none',
					gridHeaderCell: 'font-medium text-primary text-xs p-0 w-full',
					gridHeaderRow: 'px-3 pb-3',
					gridBodyRow: 'gap-x-1 px-3 mb-1 first:mt-4 last:mb-0',
					gridWrapper: 'pb-3',
					cell: 'p-1.5 w-full',
					cellButton:
						'w-full h-9 rounded-medium data-[selected]:shadow-[0_2px_12px_0] data-[selected]:shadow-primary text-small font-medium',
				}}
				isDateUnavailable={isDateUnavailable}
				value={selectedDate}
				weekdayStyle="short"
				onChange={onDateChange}
			/>
			<CalendarTimeSelect
				day={selectedDate.day}
				month={selectedDate.month}
				year={selectedDate.year}
				duration={selectedDuration}
				selectedTime={selectedTime}
				weekday={format(selectedDate.toString(), 'EEE', { locale: enUS })}
				onConfirm={onConfirm}
				onTimeChange={onTimeChange}
			/>
		</div>
	);
}
