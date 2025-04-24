import ProductViewInfo from '@/components/products/ProductViewItem';
import ReviewsSection from '@/components/sections/bookPage/ReviewsSection';
import type { Product as Book } from '@/lib/data/products.data';
import { getBookById } from '@/lib/fetch/books.fetch';
import HeaderSection from '@components/sections/bookPage/HeaderSection';

export default async function BookDetailsView({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const book: Book | null = await getBookById({ id });

	if (!book) {
		return (
			<main className="flex flex-col w-screen gap-y-6">
				<div className="container flex flex-col items-center justify-center w-full py-6 mx-auto my-6 bg-white border rounded-md shadow-md">
					<h1>Book not found</h1>
				</div>
			</main>
		);
	}

	return (
		<main className="flex flex-col w-screen gap-y-6">
			<div className="container flex flex-col items-center justify-center w-full py-6 mx-auto my-6 bg-white border rounded-md shadow-md">
				<section className="w-full">
					<HeaderSection />
				</section>

				<h2 className="mt-6 text-2xl font-bold text-center text-primary">
					Book Info
				</h2>

				<section className="w-full mt-8">
					<ProductViewInfo
						id={book.id}
						title={book.title}
						author={book.author}
						price={book.price}
						description={book.description}
						genres={book.genres}
						cover={book.cover}
						rating={4.5}
					/>
				</section>

				{/* reviews */}
				<section className="w-full mt-14">
					<h2 className="text-2xl font-bold text-center text-primary">
						Reviews
					</h2>
					{/* Add reviews component here */}
					<div className="flex items-center justify-center w-full h-full">
						<p className="text-default-500">No reviews yet</p>
					</div>
					<ReviewsSection />
				</section>
			</div>
		</main>
	);
}
