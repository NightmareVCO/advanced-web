import {
	Spinner,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
	User,
} from '@heroui/react';

import DeleteReservationModal from '@components/Modal/DeleteReservationModal';
import { useAsyncList } from '@react-stately/data';
import React, { useEffect, useState } from 'react';

export const columns = [
	{ name: 'USER', uid: 'user' },
	{ name: 'LABORATORIO', uid: 'name' },
	{ name: 'HORARIO', uid: 'schedule' },
	{ name: 'ACTIONS', uid: 'actions' },
];

export interface UserI {
	id: string;
	email: string;
	name: string;
}

export interface Schedule {
	day: string;
	month: string;
	year: string;
	hour: string;
}

export interface Reservation {
	id: string;
	name: string;
	schedule: Schedule;
	user: UserI;
}

export default function ReservationsTable() {
	const [isLoading, setIsLoading] = useState(true);
	const [requestedInitialDate, setRequestedInitialDate] = useState('');
	const [requestedFinalDate, setRequestedFinalDate] = useState('');
	const [reservations, setReservations] = useState<Reservation[]>([]);

	useEffect(() => {
		const searchParams = new URLSearchParams(window.location.search);
		const initialDate = searchParams.get('requestedInitialDate');
		const finalDate = searchParams.get('requestedFinalDate');

		console.log('URL parameters checked - initialDate:', initialDate, 'finalDate:', finalDate);

		if (initialDate !== requestedInitialDate) {
			setRequestedInitialDate(initialDate ?? '');
		}
		if (finalDate !== requestedFinalDate) {
			setRequestedFinalDate(finalDate ?? '');
		}

		const intervalId = setInterval(() => {
			const currentParams = new URLSearchParams(window.location.search);
			const currentInitialDate = currentParams.get('requestedInitialDate');
			const currentFinalDate = currentParams.get('requestedFinalDate');

			if (currentInitialDate !== requestedInitialDate || currentFinalDate !== requestedFinalDate) {
				if (currentInitialDate !== requestedInitialDate) {
					setRequestedInitialDate(currentInitialDate ?? '');
				}
				if (currentFinalDate !== requestedFinalDate) {
					setRequestedFinalDate(currentFinalDate ?? '');
				}
			}
		}, 500); // Check every 500ms

		return () => clearInterval(intervalId);
	}, [requestedInitialDate, requestedFinalDate]);

	useEffect(() => {
		const fetchReservations = async () => {
			setIsLoading(true);
			try {
				let response: Response;

				if (!requestedInitialDate || !requestedFinalDate) {
					response = await fetch(
						'https://4u0zfu3fha.execute-api.us-east-2.amazonaws.com/reservations',
					);
				} else {
					response = await fetch(
						`https://4u0zfu3fha.execute-api.us-east-2.amazonaws.com/reservations?requestedInitialDate=${requestedInitialDate}&requestedFinalDate=${requestedFinalDate}`,
					);
				}

				const data = await response.json();
				const rawReservations = data.Items || [];

				// Transform the data
				const transformedReservations = rawReservations.map((reservation: any) => {
					const user = reservation.student.Value;
					const schedule = {
						day: reservation.requestedDay.Value,
						month: reservation.requestedMonth.Value,
						year: reservation.requestedYear.Value,
						hour: reservation.requestedHour.Value,
					};

					return {
						id: reservation.id.Value,
						name: reservation.labName.Value,
						schedule,
						user: {
							id: user.ID.Value,
							email: user.Email.Value,
							name: user.Name.Value,
						},
					};
				});

				setReservations(transformedReservations);
				setIsLoading(false);
			} catch (error) {
				console.error('Error fetching reservations:', error);
				setIsLoading(false);
				setReservations([]);
			}
		};

		fetchReservations();
	}, [requestedInitialDate, requestedFinalDate]);

	const renderCell = React.useCallback((reservation: Reservation, columnKey: React.Key) => {
		const cellValue = reservation[columnKey as keyof Reservation];

		switch (columnKey) {
			case 'user':
				return (
					<User
						avatarProps={{ radius: 'lg' }}
						description={reservation.user.email}
						name={` ${reservation.user.name} - ${reservation.user.id}`}
					>
						{reservation.user.email}
					</User>
				);
			case 'name':
				return <p className="text-default-500">{reservation.name}</p>;
			case 'schedule':
				return (
					<div className="flex flex-col">
						<p className="text-default-500">
							{`${reservation.schedule.day}/${reservation.schedule.month}/${reservation.schedule.year}`}{' '}
							- {`${reservation.schedule.hour}`}
						</p>
					</div>
				);
			case 'actions':
				return (
					<div className="relative flex items-center justify-center w-full gap-2">
						<DeleteReservationModal reservation={reservation} />
					</div>
				);
			default:
				return typeof cellValue === 'object' ? JSON.stringify(cellValue) : cellValue;
		}
	}, []);

	return (
		<Table aria-label="Example table with custom cells">
			<TableHeader columns={columns}>
				{(column) => (
					<TableColumn key={column.uid} align={column.uid === 'actions' ? 'center' : 'start'}>
						{column.name}
					</TableColumn>
				)}
			</TableHeader>
			<TableBody items={reservations} isLoading={isLoading} loadingContent={<Spinner />}>
				{(reservation) => (
					<TableRow key={reservation.id}>
						{(columnKey) => <TableCell>{renderCell(reservation, columnKey)}</TableCell>}
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
}
