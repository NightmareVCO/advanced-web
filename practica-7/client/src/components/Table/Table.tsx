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

import React, { useEffect, useState } from 'react';
import DeleteReservationModal from '@components/Modal/DeleteReservationModal';
import { useAsyncList } from '@react-stately/data';

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

	const list = useAsyncList<Reservation>({
		async load({ signal }) {
			setIsLoading(true);
			try {
				const response = await fetch(
					'https://4u0zfu3fha.execute-api.us-east-2.amazonaws.com/reservations',
					{
						signal,
					},
				);

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

				setIsLoading(false);
				return { items: transformedReservations };
			} catch (error) {
				console.error('Error fetching reservations:', error);
				setIsLoading(false);
				return { items: [] };
			}
		},
		async sort({ items, sortDescriptor }) {
			return {
				items: items.sort((a, b) => {
					let first = a[sortDescriptor.column as keyof Reservation];
					let second = b[sortDescriptor.column as keyof Reservation];

					if (sortDescriptor.column === 'user') {
						first = a.user.name;
						second = b.user.name;
					} else if (sortDescriptor.column === 'schedule') {
						first = `${a.schedule.year}-${a.schedule.month}-${a.schedule.day} ${a.schedule.hour}`;
						second = `${b.schedule.year}-${b.schedule.month}-${b.schedule.day} ${b.schedule.hour}`;
					}
					let cmp =
						(Number.parseInt(first as string) || first) <
						(Number.parseInt(second as string) || second)
							? -1
							: 1;

					if (sortDescriptor.direction === 'descending') {
						cmp *= -1;
					}

					return cmp;
				}),
			};
		},
	});

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
		<Table
			aria-label="Example table with custom cells"
			sortDescriptor={list.sortDescriptor}
			onSortChange={list.sort}
		>
			<TableHeader columns={columns}>
				{(column) => (
					<TableColumn
						allowsSorting
						allowsResizing
						key={column.uid}
						align={column.uid === 'actions' ? 'center' : 'start'}
					>
						{column.name}
					</TableColumn>
				)}
			</TableHeader>
			<TableBody items={list.items} isLoading={isLoading} loadingContent={<Spinner />}>
				{(reservation) => (
					<TableRow key={reservation.id}>
						{(columnKey) => <TableCell>{renderCell(reservation, columnKey)}</TableCell>}
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
}
