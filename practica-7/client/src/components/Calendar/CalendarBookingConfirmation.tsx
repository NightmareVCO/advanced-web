import type { CalendarBookingStepType } from '../../lib/types';

import { Button } from '@heroui/button';
import { Chip } from '@heroui/chip';
import { Link } from '@heroui/link';
import type { DateValue } from '@heroui/react';
import { Spacer } from '@heroui/spacer';
import { Icon } from '@iconify/react';
import type { TimeSlot } from '@src/config/Calendar/calendar.config';
import { useCallback } from 'react';

interface CalendarBookingConfirmationProps {
	setCalendarBookingStep?: (step: CalendarBookingStepType) => void;
	selectedTimeSlotRange?: TimeSlot[];
	selectedDate?: DateValue;
}

export default function CalendarBookingConfirmation({
	selectedDate,
	selectedTimeSlotRange,
	setCalendarBookingStep,
}: CalendarBookingConfirmationProps) {
	return (
		<div className="flex w-[375px] flex-col items-center gap-5 rounded-large bg-default-50 py-8">
			<div className="flex flex-col items-center w-full px-8">
				<Icon className="mb-3 text-success-500" icon="solar:check-circle-bold-duotone" width={56} />
				<p className="mb-2 text-base font-medium text-default-foreground">
					El laboratorio ha sido reservado con éxito
				</p>
				<p className="text-center text-tiny text-default-500">
					Hemos reservado el laboratorio para la fecha y hora seleccionada. No se podrá realizar
					otra reservación en este horario.
				</p>
			</div>
			<Spacer className="w-full bg-default-100" x={0} y={0} />
			<div className="flex flex-col items-center w-full gap-4 px-8">
				<div className="flex flex-col w-full gap-1">
					<p className="font-medium text-small text-default-foreground">Detalles</p>
					<p className="text-tiny text-default-500">Ha reservado el laboratorio durante 1h.</p>
				</div>
				<div className="flex flex-col w-full gap-1">
					<p className="font-medium text-small text-default-foreground">Cuando</p>
					<p className="text-tiny text-default-500">
						{selectedDate?.day.toString()}/{selectedDate?.month.toString()}/
						{selectedDate?.year.toString()}
						<br />
						{selectedTimeSlotRange?.[0].label} - {selectedTimeSlotRange?.[1].label}
						<br />
					</p>
				</div>
				<div className="flex flex-col w-full gap-1">
					<p className="font-medium text-small text-default-foreground">Laboratorio</p>
					<span className="flex items-center gap-1">
						<p className="text-tiny text-default-500">Zoey Lang (zoey@email.com)</p>
						<Chip
							classNames={{ base: 'px-0.5 h-4', content: 'text-[10px] leading-3' }}
							color="primary"
							size="sm"
							variant="flat"
						>
							Host
						</Chip>
					</span>
					<p className="text-tiny text-default-500">John Thompson (john.thompson@email.com)</p>
				</div>
				<div className="flex flex-col w-full gap-1">
					<p className="font-medium text-small text-default-foreground">Donde</p>
					<Link className="flex items-center gap-1 w-fit" href="#" size="sm">
						<p className="text-tiny text-default-500">Zoom</p>
						<Icon className="text-default-500" icon="mdi:open-in-new" width={12} />
					</Link>
				</div>
				<div className="flex flex-col w-full gap-1">
					<p className="font-medium text-small text-default-foreground">Additional notes</p>
					<span className="flex items-center gap-1">
						<p className="text-tiny text-default-500">
							Let&apos;s talk about the latest updates of the project
						</p>
					</span>
				</div>
			</div>
			<Spacer className="w-full bg-default-100" x={0} y={0} />
		</div>
	);
}
