import { Card, CardBody, Chip } from '@heroui/react';

const order = {
	Name: 1,
	Path: 2,
	'Response Type': 3,
	Method: 4,
	Status: 5,
	Actions: 6,
};

export default function DefaultEndpointCard() {
	const minWidthClass = 'min-w-[16%]';

	return (
		<Card className="w-full" shadow="sm">
			<CardBody className="flex flex-row items-center justify-evenly">
				{Object.keys(order).map((key) => (
					<Chip key={key} variant="flat">
						<div className={minWidthClass}>
							<p className="font-bold">{key}</p>
						</div>
					</Chip>
				))}
			</CardBody>
		</Card>
	);
}
