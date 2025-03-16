'use client';

import type { CalendarBookingStepType } from '../../lib/types';

import type { DateValue } from '@heroui/calendar';
import type { SharedSelection } from '@heroui/system';
import type React from 'react';
import { useState } from 'react';

import { DurationEnum, type TimeSlot, durations } from '../../config/Calendar/calendar.config';
import CalendarBookingDetails from '../Booking/BookingDetails';
import BookingForm from '../Booking/BookingForm';

interface CalendarBookingFormProps {
	setCalendarBookingStep: (step: CalendarBookingStepType) => void;
	selectedTimeSlotRange?: TimeSlot[];
	selectedDate?: DateValue;
	setIsCompleted: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CalendarBookingForm({
	setCalendarBookingStep,
	selectedTimeSlotRange,
	selectedDate,
	setIsCompleted,
}: CalendarBookingFormProps) {
	const [selectedTimeZone, setSelectedTimeZone] = useState<string>(
		// use system time zone as default
		Intl.DateTimeFormat().resolvedOptions().timeZone,
	);
	const [selectedDuration, setSelectedDuration] = useState<DurationEnum>(DurationEnum.OneHour);

	const onTimeZoneChange = (keys: SharedSelection) => {
		const newTimeZone = Array.from(keys)[0];

		if (newTimeZone) {
			setSelectedTimeZone(newTimeZone.toString());
		}
	};

	const onDurationChange = (selectedKey: React.Key) => {
		const durationIndex = durations.findIndex((d) => d.key === selectedKey);

		setSelectedDuration(durations[durationIndex].key);
	};

	const onConfirm = () => {
		setCalendarBookingStep('booking_confirmation');
		setIsCompleted(true);
	};

	return (
		<div className="flex flex-col items-center gap-5 rounded-large bg-default-50 md:w-fit md:flex-row md:items-start md:px-6">
			<CalendarBookingDetails
				className="md:px-4 md:pt-8"
				selectedDate={selectedDate}
				selectedDuration={selectedDuration}
				selectedTimeSlotRange={selectedTimeSlotRange}
				selectedTimeZone={selectedTimeZone}
				onDurationChange={onDurationChange}
				onTimeZoneChange={onTimeZoneChange}
				isShort={false}
			/>
			<BookingForm
				selectedTimeSlotRange={selectedTimeSlotRange}
				selectedDate={selectedDate}
				setCalendarBookingStep={setCalendarBookingStep}
				onConfirm={onConfirm}
			/>
		</div>
	);
}
