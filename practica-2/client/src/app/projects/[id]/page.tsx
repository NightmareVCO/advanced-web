import BreadcrumbsBuilder from '@components/BreadcrumbsBuilder/BreadcrumbsBuilder';
import Header from '@components/Header/Header';
import ProjectSection from '@components/Projects/ProjectSection';

import Role from '@lib/data/roles.data';
import Routes from '@lib/data/routes.data';

const project = {
	id: 1,
	name: 'Project 1',
	owner: 'Owner 1',
	desc: 'This is a description of the project number 1',
	tag: 'Rest API',
	team: [
		{
			id: 1,
			firstName: 'User 1',
			lastName: 'Last Name',
			username: 'user1',
			email: 'User1@email.com',
			role: Role.Admin,
			password: 'password',
			status: 'active',
		},
		{
			id: 2,
			firstName: 'User 2',
			lastName: 'Last Name',
			username: 'user2',
			email: 'User2@email.com',
			role: Role.User,
			password: 'password',
			status: 'active',
		},
	],
	isPublic: true,
};

export default async function ProjectPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const id = (await params).id;

	return (
		<main className="mt-6 flex w-full flex-col items-center">
			<Header title={`Project ${id}`} description="Manage your project here.">
				<BreadcrumbsBuilder
					items={[
						{ name: 'Projects', href: Routes.Projects },
						{ name: id, href: '#' },
					]}
				/>
			</Header>
			<section className="w-full max-w-7xl px-4 lg:px-8">
				<ProjectSection project={project} />
			</section>
		</main>
	);
}
