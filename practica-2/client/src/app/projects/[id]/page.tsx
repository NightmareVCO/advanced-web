import BreadcrumbsBuilder from '@components/BreadcrumbsBuilder/BreadcrumbsBuilder';
import Header from '@components/Header/Header';
import ProjectSection from '@components/Projects/ProjectSection';
import { getProject } from '@lib/data/fetch/projects.fetch';
import Routes from '@lib/data/routes.data';
import { getAuthUser } from '@lib/utils/auth.utils';
import { getTranslations } from 'next-intl/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function ProjectPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const id = (await params).id;
	const jwt = (await cookies()).get('session')?.value;
	const [authPackage, authError] = await getAuthUser(jwt as string);
	if (authError) {
		return;
	}
	const [project, error] = await getProject({ token: jwt as string, id });
	if (error?.message === 'Project not found') {
		redirect(Routes.Projects);
	}

	const t = await getTranslations('projectPage');

	return (
		<main className="mt-6 flex w-full flex-col items-center">
			<Header
				title={`${t('title')}: ${project.name}`}
				description={project.desc}
			>
				<BreadcrumbsBuilder
					items={[
						{ name: t('title'), href: Routes.Projects },
						{ name: id, href: '#' },
					]}
				/>
			</Header>
			<section className="w-full max-w-7xl px-4 lg:px-8">
				<ProjectSection project={project} authPackage={authPackage} />
			</section>
			{error && <p className="text-start text-red-400">{t('error')}</p>}
		</main>
	);
}
