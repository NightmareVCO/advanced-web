import { Divider } from '@heroui/react';

type HeaderProps = {
	title: string;
	description: string;
	children?: React.ReactNode;
};

export default function Header({ title, description, children }: HeaderProps) {
	return (
		<div className="w-full max-w-7xl px-4 lg:px-8">
			<header className="mb-6 flex w-full items-center justify-between">
				<div className="flex flex-col">
					<h1 className="text-xl font-bold text-default-900 lg:text-3xl">
						{title}
					</h1>
					<p className="text-small text-default-400 lg:text-medium">
						{description}
					</p>
				</div>
				{children}
			</header>
			<Divider className="my-4" />
		</div>
	);
}
