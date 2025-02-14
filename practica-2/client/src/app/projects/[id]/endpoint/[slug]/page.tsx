import BreadcrumbsBuilder from '@components/BreadcrumbsBuilder/BreadcrumbsBuilder';
import EndpointForm from '@components/Forms/EndpointForm/EndpointForm';
import Header from '@components/Header/Header';
import { getEndpoint } from '@lib/data/fetch/endpoint.fetch';
import Routes from '@lib/data/routes.data';
import { getAuthUser } from '@lib/utils/auth.utils';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function ViewEndpointPage({
	params,
}: {
	params: Promise<{ id: string; slug: string }>;
}) {
	const id = (await params).id;
	const slug = (await params).slug;
	const jwt = (await cookies()).get('session')?.value;
	const [endpoint, error] = await getEndpoint({
		token: jwt as string,
		id: slug,
	});
	if (error) {
		redirect(Routes.Projects);
	}
	const [authPackage, authError] = await getAuthUser(jwt as string);
	if (authError) {
		redirect(Routes.Projects);
	}
	return (
		<main className="mt-6 flex w-full flex-col items-center">
			<Header title={`Endpoint ${id}`} description="Manage your endpoint here.">
				<BreadcrumbsBuilder
					items={[
						{ name: 'Projects', href: Routes.Projects },
						{ name: id, href: `${Routes.Projects}/${id}` },
						{
							name: 'Endpoint',
							href: `${Routes.Projects}/${id}/${Routes.Endpoint}/${slug}`,
						},
						{ name: slug, href: '#' },
					]}
				/>
			</Header>
			<div className="bg-black/30 rounded-3xl p-4 w-full max-w-7xl">
				<EndpointForm
					projectId={id}
					authPackage={authPackage}
					endpoint={endpoint}
				/>
			</div>
		</main>
	);
}
