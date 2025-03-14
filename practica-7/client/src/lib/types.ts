import type { SVGProps } from 'react';

export type IconSvgProps = SVGProps<SVGSVGElement> & {
	size?: number;
};

export type CalendarBookingStepType = 'booking_initial' | 'booking_confirmation' | 'booking_form';
