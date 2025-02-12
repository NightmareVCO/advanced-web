'use client';

import { Button, Spacer, Tab, Tabs } from '@heroui/react';
import Routes from '@lib/data/routes.data';

import Link from 'next/link';

import ProjectForm from '@components/Forms/ProjectForm/ProjectForm';
import EndpointTable from '@components/Table/EndpointsTable';
import UsersTable from '@components/Table/UsersTable';
import { updateProject } from '@lib/actions/project.action';
import Method from '@lib/data/method.data';
import type Endpoint from '@lib/entity/endpoint.entity';
import type { Project } from '@lib/entity/project.entity';
import { useActionState } from 'react';
import AddUserToTeamForm from '@components/Forms/AddUserToTeamForm/AddUserToTeamForm';
import UpdateProjectModal from '@components/Modal/UpdateProjectModal/UpdateProjectModal';

const endpoints: Endpoint[] = [
	{
		id: 1,
		name: 'Get users',
		path: '/api/users',
		method: Method.GET,
		status: true,
		responseType: 'application/json',
		responseStatus: '200',
		description: '',
		delay: '0',
		security: false,
		expirationDate: '523423424',
		encoding: 'UTF-8',
		projectId: 1,
	},
	{
		id: 2,
		name: 'Create user',
		path: '/api/users',
		method: Method.POST,
		status: true,
		responseType: 'application/json',
		responseStatus: '201',
		description: '',
		delay: '0',
		security: false,
		expirationDate: '523423424',
		encoding: 'UTF-8',
		projectId: 1,
	},
	{
		id: 3,
		name: 'Update user',
		path: '/api/users/:id',
		method: Method.PUT,
		status: true,
		responseType: 'application/json',
		responseStatus: '200',
		description: '',
		delay: '0',
		security: false,
		expirationDate: '523423424',
		encoding: 'UTF-8',
		projectId: 1,
	},
	{
		id: 4,
		name: 'Delete user',
		path: '/api/users/:id',
		status: false,
		method: Method.DELETE,
		responseType: 'application/json',
		responseStatus: '204',
		description: '',
		delay: '0',
		security: false,
		expirationDate: '523423424',
		encoding: 'UTF-8',
		projectId: 1,
	},
];

type ProjectSectionProps = {
	project: Project;
};

export default function ProjectSection({ project }: ProjectSectionProps) {
	const [{ errors }, action, pending] = useActionState(updateProject, {
		errors: {},
	});

	return (
		<section className="flex flex-col gap-4">
			<div className="sm:flex justify-end w-full hidden">
				<Button
					className="text-white"
					radius="full"
					variant="ghost"
					color="primary"
					as={Link}
					href={`${Routes.Projects}/1/endpoint`}
				>
					Create New Endpoint
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
				<Tab key="endpoints" title="Endpoints">
					<Spacer y={4} />
					<EndpointTable endpoints={endpoints} />
					<Spacer y={4} />
					<div className="flex sm:hidden justify-center w-full ">
						<Button
							className="text-white"
							radius="full"
							variant="ghost"
							color="primary"
						>
							Create New Endpoint
						</Button>
					</div>
				</Tab>
				<Tab key="team" title="Team">
					<Spacer y={4} />
					<AddUserToTeamForm />
					<UsersTable users={project?.team} noEdit isProject />
					<Spacer y={4} />
				</Tab>
				<Tab key="settings" title="Settings">
					<div className="bg-black/30 rounded-3xl p-4 w-full max-w-7xl">
						<Spacer y={4} />
						<ProjectForm
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
			</Tabs>
		</section>
	);
}
