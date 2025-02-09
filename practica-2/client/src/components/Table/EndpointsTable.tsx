import {
	Button,
	Chip,
	Link,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
	Tooltip,
} from '@heroui/react';
import React, { useCallback, useState } from 'react';

import EditIcon from '@components/Icons/EditIcon';
import EyeIcon from '@components/Icons/EyeIcon';
import MethodColor from '@lib/data/method.color.data';

import DeleteEndpointModal from '@components/Modal/DeleteModals/DeleteEndpointModal';
import Routes from '@lib/data/routes.data';
import { statusCodesRecord } from '@lib/data/statusCode.data';
import type Endpoint from '@lib/entity/endpoint.entity';

export const columns = [
	{ name: 'Live', uid: 'live' },
	{ name: 'Name', uid: 'name' },
	{ name: 'Path', uid: 'path' },
	{ name: 'Response Type', uid: 'responseType' },
	{ name: 'Method', uid: 'method' },
	{ name: 'Status Code', uid: 'status' },
	{ name: 'Actions', uid: 'actions' },
];

type EndpointTableProps = {
	endpoints: Endpoint[];
};

export default function EndpointTable({ endpoints }: EndpointTableProps) {
	const [selectedEndpoint, setSelectedEndpoint] = useState<Endpoint | null>(
		null,
	);

	const renderCell = useCallback(
		(endpoint: Endpoint, columnKey: keyof Endpoint | string) => {
			const cellValue = endpoint[columnKey as keyof Endpoint];

			switch (columnKey) {
				case columns[0].uid:
					return (
						<Chip
							color={endpoint.status ? 'success' : 'danger'}
							variant="dot"
						/>
					);
				case columns[1].uid:
					return (
						<Chip variant="bordered" size="lg">
							<p>{endpoint.name}</p>
						</Chip>
					);
				case columns[2].uid:
					return (
						<Chip variant="bordered" size="lg">
							<p>{endpoint.path}</p>
						</Chip>
					);
				case columns[3].uid:
					return (
						<Chip variant="bordered" size="lg">
							<p>{endpoint.responseType}</p>
						</Chip>
					);
				case columns[4].uid:
					return (
						<Chip
							variant="dot"
							classNames={{
								dot: `${MethodColor[endpoint.method]}`,
							}}
						>
							<p>{endpoint.method}</p>
						</Chip>
					);
				case columns[5].uid:
					return (
						<Chip variant="bordered">
							{statusCodesRecord[endpoint.responseStatus]}
						</Chip>
					);
				case columns[6].uid:
					return (
						<div className="relative flex items-center justify-center gap-2">
							<Tooltip content="Test">
								<span className="text-lg text-default-400 cursor-pointer active:opacity-50">
									<EyeIcon />
								</span>
							</Tooltip>
							<Link
								href={`${Routes.Projects}/${endpoint.projectId}${Routes.Endpoint}/${endpoint.id}`}
							>
								<Tooltip content="Edit">
									<span className="text-lg text-default-400 cursor-pointer active:opacity-50">
										<EditIcon />
									</span>
								</Tooltip>
							</Link>
							<DeleteEndpointModal
								endpoint={endpoint}
								setSelectedEndpoint={setSelectedEndpoint}
							/>
						</div>
					);
				default:
					return cellValue;
			}
		},
		[],
	);

	return (
		<Table aria-label="Endpoints Table">
			<TableHeader columns={columns}>
				{(column) => (
					<TableColumn
						className="p-3"
						key={column.uid}
						align={column.uid === 'actions' ? 'center' : 'start'}
					>
						<Chip variant="bordered">
							<span className="font-bold">{column.name}</span>
						</Chip>
					</TableColumn>
				)}
			</TableHeader>
			<TableBody items={endpoints}>
				{(endpoint) => (
					<TableRow key={endpoint.id}>
						{(columnKey) => (
							<TableCell>{renderCell(endpoint, columnKey as string)}</TableCell>
						)}
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
}
