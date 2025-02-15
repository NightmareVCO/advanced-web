'use client';

import { Button, Spacer, Tab, Tabs } from '@heroui/react';
import Routes from '@lib/data/routes.data';

import Link from 'next/link';

import AddUserToTeamForm from '@components/Forms/AddUserToTeamForm/AddUserToTeamForm';
import ProjectForm from '@components/Forms/ProjectForm/ProjectForm';
import UpdateProjectModal from '@components/Modal/UpdateProjectModal/UpdateProjectModal';
import EndpointTable from '@components/Table/EndpointsTable';
import UsersTable from '@components/Table/UsersTable';
import { Icon } from '@iconify/react';
import { updateProject } from '@lib/actions/project.action';
import type { AuthPackage } from '@lib/entity/auth.entity';
import type { Project } from '@lib/entity/project.entity';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect, useState } from 'react';
import { ENDPOINT_PATH } from '@lib/constants/server.constants';
import {useTranslations} from "next-intl";

type ProjectSectionProps = {
	authPackage: AuthPackage;
	project: Project;
};

export default function ProjectSection({
	project,
	authPackage,
}: ProjectSectionProps) {
	const [{ errors }, action, pending] = useActionState(updateProject, {
		errors: {},
	});

	const [animateSpinner, setAnimateSpinner] = useState(false);

	useEffect(() => {
		setAnimateSpinner(false);
	}, []);

	const router = useRouter();
	const sortedEndpoints = project?.endpoints?.toSorted((a, b) => {
		if (a.name < b.name) {
			return -1;
		}
		if (a.name > b.name) {
			return 1;
		}
		return 0;
	});

	const t = useTranslations('projectSection');

	return (
		<section className="flex flex-col gap-4">
			<div className="sm:flex gap-x-3 justify-end w-full hidden">
				{authPackage.userId === String(project.owner?.id) && (
					<Button
						className="text-white"
						radius="full"
						variant="ghost"
						color="primary"
						as={Link}
						href={`${Routes.Projects}/${project.id}/${ENDPOINT_PATH}`}
					>
						{t('createNewEndpoint')}
					</Button>
				)}
				<Button
					className={`text-white ${animateSpinner ? 'animate-spin' : ''}`}
					radius="full"
					variant="ghost"
					color="primary"
					isIconOnly
					onPress={() => {
						setAnimateSpinner(true);
						setTimeout(() => {
							setAnimateSpinner(false);
							router.refresh();
						}, 2000);
					}}
				>
					<Icon icon="famicons:reload" className="size-4" />
				</Button>
			</div>

			<Tabs
				aria-label="Navigation Tabs"
				className="sm:-mt-14"
				classNames={{
					cursor: 'bg-default-200 shadow-none',
				}}
				radius="full"
				variant="light"
			>
				<Tab key="endpoints" title={t('endpoints')}>
					<Spacer y={4} />
					<EndpointTable
						projectId={String(project?.id)}
						projectOwnerId={String(project?.owner?.id)}
						endpoints={sortedEndpoints ?? []}
						authPackage={authPackage}
					/>
					<Spacer y={4} />
					<div className="flex flow-row gap-x-2 sm:hidden justify-center w-full ">
						<Button
							className="text-white"
							radius="full"
							variant="ghost"
							color="primary"
						>
							{t('createNewEndpoint')}
						</Button>
					</div>
				</Tab>
				{authPackage.userId === String(project.owner?.id) && (
					<Tab key="team" title={t('team')}>
						<Spacer y={4} />
						<AddUserToTeamForm authPackage={authPackage} project={project} />
						<UsersTable
							authPackage={authPackage}
							users={project?.team}
							projectId={String(project.id)}
							isProject
							noEdit
						/>
						<Spacer y={4} />
					</Tab>
				)}
				{authPackage.userId === String(project.owner?.id) && (
					<Tab key="settings" title={t('settings')}>
						<div className="bg-black/30 rounded-3xl p-4 w-full max-w-7xl">
							<Spacer y={4} />
							<ProjectForm
								authPackage={authPackage}
								project={project}
								errors={errors}
								action={action}
								pending={pending}
							/>
							<div className="flex justify-center w-full">
								<UpdateProjectModal pending={pending} project={project} />
								{errors?.projectName && (
									<span className="text-red-500 text-sm">
										{errors.projectName}
									</span>
								)}
							</div>
							<Spacer y={4} />
						</div>
					</Tab>
				)}
			</Tabs>
		</section>
	);
}
