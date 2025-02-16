import ProjectCard from '@/components/Cards/ProjectsCard/ProjectCard';
import Header from '@components/Header/Header';
import { getPublicProjects } from '@lib/data/fetch/projects.fetch';
import { getTranslations } from 'next-intl/server';

export default async function ExplorePage() {
	const [projects, error] = await getPublicProjects();

	const t = await getTranslations('explorePage');

	return (
		<main className="mt-6 flex w-full flex-col items-center">
			<Header title={t('title')} description={t('description')} />
			<section className="w-full max-w-7xl px-4 lg:px-8">
				<div className="w-full flex flex-col items-center justify-center">
					{(projects?.length === 0 ||
						// @ts-ignore
						projects.message === 'No projects found') && (
						<p className="text-start text-default-400">{t('noProjects')}</p>
					)}
					{error && <p className="text-start text-red-400">{t('error')}</p>}
				</div>
				<div className="gap-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
					{projects.map((project) => (
						<ProjectCard project={project} key={project.id} />
					))}
				</div>
			</section>
		</main>
	);
}
