import {
	Button,
	Chip,
	Link,
	Snippet,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
	Tooltip,
} from '@heroui/react';
import type React from 'react';
import { useCallback, useState } from 'react';

import EditIcon from '@components/Icons/EditIcon';
import MethodColor from '@lib/data/method.color.data';

import type { AuthPackage } from '@/lib/entity/auth.entity';
import DeleteEndpointModal from '@components/Modal/DeleteModals/DeleteEndpointModal';
import { Icon } from '@iconify/react';
import {
	ENDPOINT_PATH,
	PUBLIC_SERVER_PATH,
} from '@lib/constants/server.constants';
import Routes from '@lib/data/routes.data';
import { statusCodesRecord } from '@lib/data/statusCode.data';
import type Endpoint from '@lib/entity/endpoint.entity';

export const columns = [
	{ name: 'Status', uid: 'live' },
	{ name: 'Name', uid: 'name' },
	{ name: 'Path', uid: 'path' },
	{ name: 'Response Type', uid: 'responseType' },
	{ name: 'Method', uid: 'method' },
	{ name: 'Status Code', uid: 'status' },
	{ name: 'Actions', uid: 'actions' },
];

type EndpointTableProps = {
	projectId: string;
	projectOwnerId: string;
	endpoints: Endpoint[];
	authPackage: AuthPackage;
};

export default function EndpointTable({
	projectId,
	projectOwnerId,
	endpoints,
	authPackage,
}: EndpointTableProps) {
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
							classNames={{
								base: 'w-full flex justify-center items-center',
							}}
						>
							{endpoint.status ? 'Live' : 'Off'}
						</Chip>
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
							{endpoint.status && endpoint.jwt && endpoint.security && (
								<Snippet
									symbol=" "
									tooltipProps={{
										content: 'Copy JWT',
									}}
									copyIcon={<Icon icon="lucide:shield-check" color="#e18c2e" />}
									classNames={{
										base: 'bg-transparent',
									}}
									disableCopy={!endpoint.status}
									onCopy={() => {
										navigator.clipboard.writeText(endpoint.jwt);
									}}
								/>
							)}
							<Snippet
								symbol=" "
								classNames={{
									base: 'bg-transparent',
								}}
								disableCopy={!endpoint.status}
								onCopy={() => {
									navigator.clipboard.writeText(
										`${PUBLIC_SERVER_PATH}/${ENDPOINT_PATH}/${endpoint.path}`,
									);
								}}
							/>
							<Link
								isDisabled={
									projectOwnerId !== authPackage.userId || !endpoint.status
								}
								href={`${Routes.Projects}/${projectId}${Routes.Endpoint}/${endpoint.id}`}
							>
								<Tooltip content="Edit">
									<span className="text-lg text-default-400 cursor-pointer active:opacity-50">
										<EditIcon className="text-white" />
									</span>
								</Tooltip>
							</Link>
							<DeleteEndpointModal
								projectOwnerId={projectOwnerId}
								authPackage={authPackage}
								endpoint={endpoint}
								setSelectedEndpoint={setSelectedEndpoint}
							/>
						</div>
					);
				default:
					return <>{cellValue}</>;
			}
		},
		[projectOwnerId, projectId, authPackage],
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
							<TableCell>
								{renderCell(endpoint, columnKey as string) as React.ReactNode}
							</TableCell>
						)}
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
}
