import ProjectCard from '@/components/Cards/ProjectsCard/ProjectCard';
import Header from '@components/Header/Header';
import { getPublicProjects } from '@lib/data/fetch/projects.fetch';

export default async function ExplorePage() {
	const [projects, error] = await getPublicProjects();

	return (
		<main className="mt-6 flex w-full flex-col items-center">
			<Header
				title="Community"
				description="Take a look over the community open projects"
			/>
			<section className="w-full max-w-7xl px-4 lg:px-8">
				<div className="gap-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
					{projects.map((project) => (
						<ProjectCard project={project} key={project.id} />
					))}
				</div>
				{projects?.length === 0 && (
					<p className="text-start text-default-400">
						No public projects found. Create a new one and share with the
						community!
					</p>
				)}
			</section>
			{error && (
				<p className="text-start text-red-400">
					{`An error occurred while fetching the projects ${error}`}
				</p>
			)}
		</main>
	);
}
