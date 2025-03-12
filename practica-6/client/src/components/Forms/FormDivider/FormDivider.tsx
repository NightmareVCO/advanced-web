import { Divider, Spacer } from '@heroui/react';

type FormDividerProps = {
	title: string;
};

export default function FormDivider({ title }: FormDividerProps) {
	return (
		<div className="flex flex-col w-full">
			<p className="title-small text-default-400 w-full">{title}</p>
			<Divider />
			<Spacer y={1} />
		</div>
	);
}
