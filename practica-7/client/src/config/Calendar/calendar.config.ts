// sample booking durations
export enum DurationEnum {
	OneHour = '1h',
}

export const durations = [{ key: DurationEnum.OneHour, label: '1h' }];

// sample time zone options
export const timeZoneOptions = Intl.supportedValuesOf('timeZone').map((timeZone) => ({
	label: timeZone,
	value: timeZone,
}));

export enum TimeFormatEnum {
	TwelveHour = '12h',
	TwentyFourHour = '24h',
}

export const timeFormats = [
	// { key: TimeFormatEnum.TwelveHour, label: '12h' },
	{ key: TimeFormatEnum.TwentyFourHour, label: '24h' },
];

export interface TimeSlot {
	value: string;
	label: string;
	disabled?: boolean;
	appointmentCount?: number;
}
