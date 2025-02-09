'use client';

import type { CardProps } from '@heroui/react';

import LogoIcon from '@components/Icons/LogoIcon';
import {
	Avatar,
	Button,
	Card,
	CardBody,
	CardFooter,
	Chip,
} from '@heroui/react';
import type { Project } from '@lib/entity/project.entity';
import Link from 'next/link';
import React from 'react';

import { Icon } from '@iconify/react';

export type ProjectCardProps = {
	project: Project;
	props?: CardProps;
};

export default function ProjectCard({
	project: { name, owner, desc, tag, isPublic },
	...props
}: ProjectCardProps) {
	return (
		<Card
			className="border-small border-default-100 p-3 min-h-66 max-h-66 m-2 hover:scale-[1.02] transition-transform"
			shadow="sm"
			{...props}
		>
			<CardBody className="px-4 pb-1">
				<div className="flex items-center justify-between gap-2">
					<div className="flex max-w-[80%] flex-col gap-1">
						<div className="flex items-center gap-2">
							<p className="text-medium font-medium">{name}</p>
							<Chip
								variant="flat"
								size="sm"
								startContent={
									isPublic ? (
										<Icon icon="lucide:globe" width={13} />
									) : (
										<Icon icon="lucide:shield" width={13} />
									)
								}
								color={isPublic ? 'success' : 'warning'}
							>
								{isPublic ? 'Public' : 'Private'}
							</Chip>
						</div>
						<p className="text-small text-default-500">{owner}</p>
					</div>
					<Avatar className="bg-content2" icon={<LogoIcon />} />
				</div>
				<p className="pt-4 text-small text-default-500">{desc}</p>
			</CardBody>
			<CardFooter className="justify-between gap-2">
				<Button
					size="sm"
					variant="faded"
					as={Link}
					href="http://localhost:3000/projects/1/"
				>
					Open
				</Button>
				<Chip color="primary" variant="dot">
					{tag}
				</Chip>
			</CardFooter>
		</Card>
	);
}
