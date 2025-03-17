import { DateRangePicker, Switch } from '@heroui/react';
import { getLocalTimeZone, today } from '@internationalized/date';
import { useCallback, useEffect, useState } from 'react';

export default function CalendarFilter() {
	const [showFilter, setShowFilter] = useState(false);

	const urlParams = new URLSearchParams(window.location.search);

	const todayDate = today(getLocalTimeZone());
	const tomorrowDate = todayDate.add({ days: 1 });

	const [value, setValue] = useState({
		start: todayDate,
		end: tomorrowDate,
	});

	const formatDateForUrl = useCallback((dateValue: any) => {
		const day = dateValue.day;
		const month = dateValue.month;
		const year = dateValue.year;

		return `${day}-${month}-${year}`;
	}, []);

	useEffect(() => {
		if (showFilter) {
			const formattedStartDate = formatDateForUrl(value.start);
			const formattedEndDate = formatDateForUrl(value.end);

			urlParams.set('requestedInitialDate', formattedStartDate);
			urlParams.set('requestedFinalDate', formattedEndDate);
			window.history.replaceState({}, '', `${window.location.pathname}?${urlParams}`);
		} else {
			urlParams.delete('requestedInitialDate');
			urlParams.delete('requestedFinalDate');
			window.history.replaceState({}, '', `${window.location.pathname}?${urlParams}`);
		}
	}, [value, urlParams, showFilter, formatDateForUrl]);

	return (
		<div className="flex justify-center gap-4">
			{showFilter && (
				<DateRangePicker
					labelPlacement="outside"
					radius="full"
					value={value}
					onChange={(newValue) => {
						if (newValue) {
							setValue({ start: newValue.start, end: newValue.end });
						}
					}}
				/>
			)}
			<Switch onValueChange={(isSelected) => setShowFilter(isSelected)}>Filtrar</Switch>
		</div>
	);
}
