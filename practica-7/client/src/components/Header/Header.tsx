import { Divider } from '@heroui/react';

type HeaderProps = {
	title: string;
	description: string;
	children?: React.ReactNode;
};

export default function Header({ title, description, children }: HeaderProps) {
	return (
		<div className="w-full px-4 lg:px-8">
			<header className="flex items-center justify-between w-full mb-6">
				<div className="flex flex-col">
					<h1 className="text-xl font-bold text-main-color lg:text-3xl">{title}</h1>
					<p className="text-small text-default-400 lg:text-medium">{description}</p>
				</div>
				{children}
			</header>
			<Divider className="my-4" />
		</div>
	);
}
