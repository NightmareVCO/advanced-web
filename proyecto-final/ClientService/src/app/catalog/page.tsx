import BooksSection from '@components/sections/catalogPage/BooksSection';
import HeaderSection from '@components/sections/catalogPage/HeaderSection';
import { type BookResult, getBooks } from '@lib/fetch/books.fetch';

export default async function CatalogPage({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	const resolvedParams = await searchParams;
	const title = resolvedParams.title;
	const genre = resolvedParams.genre;
	const author = resolvedParams.author;
	const minPrice = resolvedParams.minPrice;
	const maxPrice = resolvedParams.maxPrice;
	const page = resolvedParams.page;
	const sort = resolvedParams.sort;

	const booksResult: BookResult = await getBooks({
		title: title as string,
		author: author as string,
		genre: genre as string,
		sort: sort as string,
		page: page ? Number.parseInt(page as string) : undefined,
		minPrice: minPrice ? Number.parseInt(minPrice as string) : undefined,
		maxPrice: maxPrice ? Number.parseInt(maxPrice as string) : undefined,
	});

	return (
		<main className="flex flex-col w-screen gap-y-6">
			<section>
				<HeaderSection />
			</section>

			<div className="container flex flex-col items-center justify-center w-full py-6 mx-auto mb-6 bg-white border rounded-md shadow-md">
				<section id="books">
					<h1 className="text-4xl font-bold text-center text-primary">
						Explore Our Collection
					</h1>
					<BooksSection booksResult={booksResult} />
				</section>
			</div>
		</main>
	);
}
