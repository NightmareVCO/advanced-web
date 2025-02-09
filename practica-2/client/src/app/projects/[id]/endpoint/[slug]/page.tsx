import BreadcrumbsBuilder from '@/components/BreadcrumbsBuilder/BreadcrumbsBuilder';
import EndpointForm from '@components/Forms/EndpointForm/EndpointForm';
import Header from '@components/Header/Header';
import Routes from '@lib/data/routes.data';

export default async function ViewEndpointPage({
	params,
}: {
	params: Promise<{ id: string; slug: string }>;
}) {
	const id = (await params).id;
	const slug = (await params).slug;

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
				<EndpointForm />
			</div>
		</main>
	);
}
