import BreadcrumbsBuilder from '@components/BreadcrumbsBuilder/BreadcrumbsBuilder';
import EndpointForm from '@components/Forms/EndpointForm/EndpointForm';
import Header from '@components/Header/Header';
import React from 'react';

import Routes from '@lib/data/routes.data';

export default async function CreateEndpointPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const id = (await params).id;

	return (
		<main className="mt-6 flex w-full flex-col items-center">
			<Header
				title={`New endpoint of project ${id}`}
				description="Add your new endpoint here."
			>
				<BreadcrumbsBuilder
					items={[
						{ name: 'Projects', href: Routes.Projects },
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
