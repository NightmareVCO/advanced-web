import BooksSection from '@components/sections/catalogPage/BooksSection';
import HeaderSection from '@components/sections/catalogPage/HeaderSection';

export default function CatalogPage() {
	return (
		<main className="flex flex-col w-screen gap-y-6">
			<section>
				<HeaderSection />
			</section>

			<div className="container flex flex-col items-center justify-center w-full py-6 mx-auto mb-6 bg-white border rounded-md shadow-md">
				<section>
					<h1 className="text-4xl font-bold text-center text-primary">
						Explore Our Collection
					</h1>
					<BooksSection />
				</section>
			</div>
		</main>
	);
}
