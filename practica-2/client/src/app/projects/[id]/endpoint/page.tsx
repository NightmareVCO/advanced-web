import BreadcrumbsBuilder from '@components/BreadcrumbsBuilder/BreadcrumbsBuilder';
import EndpointForm from '@components/Forms/EndpointForm/EndpointForm';
import Header from '@components/Header/Header';
import React from 'react';

import Routes from '@lib/data/routes.data';
import { getProject } from '@/lib/data/fetch/projects.fetch';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { getTranslations } from 'next-intl/server';

export default async function CreateEndpointPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const id = (await params).id;
	const jwt = (await cookies()).get('session')?.value;

	const [_, error] = await getProject({ token: jwt as string, id });
	if (error?.message === 'Project not found') {
		redirect(Routes.Projects);
	}

	const t = await getTranslations('createEndpointPage');
	const t2 = await getTranslations('projectPage');

	return (
		<main className="mt-6 flex w-full flex-col items-center">
			<Header
				title={`${t('title')}: ${id}`}
				description="Add your new endpoint here."
			>
				<BreadcrumbsBuilder
					items={[
						{ name: t2('title'), href: Routes.Projects },
						{ name: id, href: `${Routes.Projects}/${id}` },
						{ name: 'Endpoint', href: '#' },
					]}
				/>
			</Header>
			<div className="bg-black/30 rounded-3xl p-4  w-full max-w-7xl">
				<EndpointForm projectId={id} />
			</div>
		</main>
	);
}
