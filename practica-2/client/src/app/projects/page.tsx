import { getAuthUser } from '@/lib/utils/auth.utils';
import ProjectCard from '@components/Cards/ProjectsCard/ProjectCard';
import ProjectModalClientWrapper from '@components/ClientWrapper/ProjectModalClientWrapper';
import Header from '@components/Header/Header';
import { getUserProjects } from '@lib/data/fetch/projects.fetch';
import { cookies } from 'next/headers';

export default async function ProjectsPage() {
	const jwt = (await cookies()).get('session')?.value;
	const [authPackage, authError] = await getAuthUser(jwt as string);
	if (authError) {
		return;
	}

	const [projects, error] = await getUserProjects(jwt as string);

	return (
		<main className="mt-6 flex w-full flex-col items-center">
			<Header title="Projects" description="Manage your project here.">
				<ProjectModalClientWrapper authPackage={authPackage} />
			</Header>
			<section className="w-full max-w-7xl px-4 lg:px-8">
				<div className="gap-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
					{Array.isArray(projects) &&
						projects.map((project) => (
							<ProjectCard project={project} key={project.id} />
						))}
					{(projects?.length === 0 ||
						// @ts-ignore
						projects.message === 'No projects found') && (
						<p className="text-start text-default-400">
							No projects found. Create a new one!
						</p>
					)}
					{error && (
						<p className="text-start text-red-400">
							{`An error occurred while fetching the projects ${error}`}
						</p>
					)}
				</div>
			</section>
		</main>
	);
}
