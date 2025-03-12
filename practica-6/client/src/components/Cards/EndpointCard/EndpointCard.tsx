import { Card, CardBody, Chip, Tooltip } from '@heroui/react';

import DeleteIcon from '@components/Icons/DeleteIcon';
import EditIcon from '@components/Icons/EditIcon';
import EyeIcon from '@components/Icons/EyeIcon';
import MethodColor from '@lib/data/method.color.data';
import type Endpoint from '@lib/entity/endpoint.entity';

type EndpointCardProps = {
	endpoint: Endpoint;
};

export default function EndpointCard({ endpoint }: EndpointCardProps) {
	const minWidthClass = 'min-w-[16%]';

	return (
		<Card
			key={endpoint.id}
			shadow="sm"
			className="w-full hover:scale-[1.01] transition-transform"
		>
			<CardBody className="flex flex-row items-center justify-evenly">
				<div className={minWidthClass}>
					<Chip variant="bordered" size="lg">
						<p>{endpoint.name}</p>
					</Chip>
				</div>
				<div className={minWidthClass}>
					<Chip variant="bordered" size="lg">
						<p>{endpoint.path}</p>
					</Chip>
				</div>
				<div className={minWidthClass}>
					<Chip variant="bordered" size="lg">
						<p>{endpoint.responseType}</p>
					</Chip>
				</div>
				<div className={minWidthClass}>
					<Chip
						variant="dot"
						classNames={{
							dot: `${MethodColor[endpoint.method]}`,
						}}
					>
						<p>{endpoint.method}</p>
					</Chip>
				</div>
				<div className={minWidthClass}>
					<Chip color={endpoint.status ? 'success' : 'danger'} variant="dot">
						{endpoint.status ? 'Active' : 'Inactive'}
					</Chip>
				</div>
				<div className="relative flex items-center gap-2">
					<Tooltip content="Details">
						<span className="text-lg text-default-400 cursor-pointer active:opacity-50">
							<EyeIcon />
						</span>
					</Tooltip>
					<Tooltip content="Edit user">
						<span className="text-lg text-default-400 cursor-pointer active:opacity-50">
							<EditIcon />
						</span>
					</Tooltip>
					<Tooltip color="danger" content="Delete user">
						<span className="text-lg text-danger cursor-pointer active:opacity-50">
							<DeleteIcon />
						</span>
					</Tooltip>
				</div>
			</CardBody>
		</Card>
	);
}
