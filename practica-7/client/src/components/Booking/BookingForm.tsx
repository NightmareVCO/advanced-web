import { Button } from '@heroui/button';
import { Form } from '@heroui/form';
import { Input, Textarea } from '@heroui/input';
import { Link } from '@heroui/link';
import type { DateValue } from '@heroui/react';
import type { TimeSlot } from '@src/config/Calendar/calendar.config';
import { useCallback, useEffect, useState } from 'react';

type CalendarBookingStepType = 'booking_initial' | 'booking_confirmation' | 'booking_form';
interface BookingFormProps {
	onConfirm: ({ name, email, notes }: { name: string; email: string; notes: string }) => void;
	setCalendarBookingStep?: (step: CalendarBookingStepType) => void;
	selectedDate?: DateValue;
	selectedTimeSlotRange?: TimeSlot[];
}

export default function BookingForm({
	onConfirm,
	setCalendarBookingStep,
	selectedDate,
	selectedTimeSlotRange,
}: BookingFormProps) {
	const [isLoading, setIsLoading] = useState(false);
	const [sendForm, setSendForm] = useState(false);
	const [Id, setId] = useState('');
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');

	const handlerBack = useCallback(() => {
		if (setCalendarBookingStep) {
			setCalendarBookingStep('booking_initial');
		}
	}, [setCalendarBookingStep]);

	const validateForm = useCallback(() => {
		if (Id && name && email) {
			setSendForm(true);
		}
	}, [Id, name, email]);

	useEffect(() => {
		if (sendForm) {
			const createReservation = async () => {
				setIsLoading(true);
				try {
					const response = await fetch(
						'https://4u0zfu3fha.execute-api.us-east-2.amazonaws.com/reservations',
						{
							method: 'POST',
							headers: {
								'Content-Type': 'application/json',
							},
							body: JSON.stringify({
								labName: 'LBA - 01',
								requestedDay: selectedDate?.day,
								requestedMonth: selectedDate?.month,
								requestedYear: selectedDate?.year,
								requestedHour: selectedTimeSlotRange?.[0].label,
								student: {
									ID: Id,
									Name: name,
									Email: email,
								},
							}),
						},
					);

					if (response.ok) {
						setIsLoading(false);
						setSendForm(false);
						onConfirm({ name, email, notes: '' });
					}
				} catch (error) {
					console.error(error);
					setIsLoading(false);
				}
			};

			createReservation();
		}
	}, [sendForm, selectedDate, selectedTimeSlotRange, Id, name, email, onConfirm]);

	return (
		<Form className="flex flex-col w-full gap-4 px-6 py-6 md:px-0" validationBehavior="native">
			<Input
				isRequired
				classNames={{ label: 'text-tiny text-default-600' }}
				label="ID"
				labelPlacement="outside"
				name="Id"
				placeholder="1014-1415"
				value={Id}
				onChange={(e) => setId(e.target.value)}
			/>

			<Input
				isRequired
				classNames={{ label: 'text-tiny text-default-600' }}
				label="Nombre"
				labelPlacement="outside"
				name="name"
				placeholder=" "
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>
			<Input
				isRequired
				classNames={{ label: 'text-tiny text-default-600' }}
				label="Email"
				labelPlacement="outside"
				name="email"
				placeholder=" "
				type="email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>

			<div className="flex justify-end w-full gap-2 mt-2">
				<Button variant="flat" onPress={handlerBack} radius="full">
					Regresar
				</Button>
				<Button
					color="primary"
					radius="full"
					type="submit"
					isLoading={isLoading}
					isDisabled={isLoading}
					onPress={validateForm}
				>
					Confirmar
				</Button>
			</div>
		</Form>
	);
}
