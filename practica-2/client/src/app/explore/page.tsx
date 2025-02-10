import ProjectCard from '@/components/Cards/ProjectsCard/ProjectCard';
import BreadcrumbsBuilder from '@components/BreadcrumbsBuilder/BreadcrumbsBuilder';
import Header from '@components/Header/Header';
import ProjectSection from '@components/Projects/ProjectSection';
import Role from '@lib/data/roles.data';
import Routes from '@lib/data/routes.data';
import type { Project } from '@lib/entity/project.entity';

const projects: Project[] = [
	{
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
	},
	{
		id: 2,
		name: 'Project 2',
		owner: 'Owner 2',
		desc: 'This is a description of the project number 2',
		tag: 'GraphQL',
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
		isPublic: false,
	},
	{
		id: 3,
		name: 'Project 3',
		owner: 'Owner 3',
		desc: 'This is a description of the project number 3',
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
	},
];

export default function ExplorePage() {
	const projectsToShow = projects.filter((project) => project.isPublic);

	return (
		<main className="mt-6 flex w-full flex-col items-center">
			<Header
				title="Community"
				description="Take a look over the community open projects"
			/>
			<section className="w-full max-w-7xl px-4 lg:px-8">
				<div className="gap-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
					{projectsToShow.map((project) => (
						<ProjectCard project={project} key={project.id} />
					))}
				</div>
			</section>
		</main>
	);
}
