import { Button } from '@heroui/button';
import { Form } from '@heroui/form';
import { Input, Textarea } from '@heroui/input';
import { Link } from '@heroui/link';
import { useCallback } from 'react';

type CalendarBookingStepType = 'booking_initial' | 'booking_confirmation' | 'booking_form';
interface BookingFormProps {
	onConfirm: ({ name, email, notes }: { name: string; email: string; notes: string }) => void;
	setCalendarBookingStep?: (step: CalendarBookingStepType) => void;
}

export default function BookingForm({ onConfirm, setCalendarBookingStep }: BookingFormProps) {
	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.target as HTMLFormElement);
		const name = formData.get('name') as string;
		const email = formData.get('email') as string;
		const notes = formData.get('notes') as string;

		onConfirm({ name, email, notes });
	};

	const handlerBack = useCallback(() => {
		if (setCalendarBookingStep) {
			setCalendarBookingStep('booking_initial');
		}
	}, [setCalendarBookingStep]);

	return (
		<Form
			className="flex flex-col w-full gap-4 px-6 py-6 md:px-0"
			validationBehavior="native"
			onSubmit={onSubmit}
		>
			<Input
				isRequired
				classNames={{ label: 'text-tiny text-default-600' }}
				label="Nombre"
				labelPlacement="outside"
				name="name"
				placeholder=" "
			/>
			<Input
				isRequired
				classNames={{ label: 'text-tiny text-default-600' }}
				label="Email"
				labelPlacement="outside"
				name="email"
				placeholder=" "
				type="email"
			/>

			<Textarea
				classNames={{ label: 'text-tiny text-default-600' }}
				label="Notas"
				labelPlacement="outside"
				name="notes"
				placeholder=" "
			/>

			<div className="flex justify-end w-full gap-2 mt-2">
				<Button variant="flat" onPress={handlerBack} radius="full">
					Regresar
				</Button>
				<Button color="primary" type="submit" radius="full">
					Confirmar
				</Button>
			</div>
		</Form>
	);
}
