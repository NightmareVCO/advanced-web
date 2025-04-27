import ProductViewInfo from '@components/products/ProductViewItem';
import HeaderSection from '@components/sections/bookPage/HeaderSection';
import ReviewsSection from '@components/sections/bookPage/ReviewsSection';
import type { Product as Book } from '@lib/data/products.data';
import { getBookById } from '@lib/fetch/books.fetch';
import { getUserHasBook } from '@lib/fetch/orders.fetch';
import {
	type ReviewRating,
	type ReviewResult,
	type ReviewResultWithUsers,
	getBookReviews,
} from '@lib/fetch/review.fetch';
import {
	type UserForComments,
	getUsersForCommentsById,
} from '@lib/fetch/users.fetch';
import { type UserSession, getUserSession } from '@lib/utils/auth.utils';
import { cookies } from 'next/headers';

export default async function BookDetailsView({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const book: Book | null = await getBookById({ id });

	const jwt = (await cookies()).get('session')?.value;
	const userSession: UserSession | null = await getUserSession(jwt);

	if (!book) {
		return (
			<main className="flex flex-col w-screen gap-y-6">
				<div className="container flex flex-col items-center justify-center w-full py-6 mx-auto my-6 bg-white border rounded-md shadow-md">
					<h1>Book not found</h1>
				</div>
			</main>
		);
	}

	const booksReviews: ReviewResult | null = await getBookReviews({
		bookId: book.id,
	});

	const usersIdsFromReviews: string[] | undefined = booksReviews?.reviews.map(
		(review) => review.userId,
	);

	const usersReview: UserForComments[] | null = await getUsersForCommentsById({
		ids: usersIdsFromReviews ?? [],
	});

	const reviewResultWithUsers: ReviewResultWithUsers = {
		bookId: booksReviews?.bookId ?? '',
		reviews:
			booksReviews?.reviews.map((review) => {
				const user = usersReview?.find((user) => user.id === review.userId);
				return {
					...review,
					user: {
						firstName: user?.firstName ?? '',
						lastName: user?.lastName ?? '',
					},
				};
			}) ?? [],
		rating: booksReviews?.rating ?? ({} as ReviewRating),
	};

	let userHasBook = false;

	if (userSession) {
		userHasBook = await getUserHasBook({
			bookId: book.id,
			userId: userSession.id,
			userToken: userSession.token,
		});
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
						canBuy={userHasBook}
					/>
				</section>

				<section className="w-full mt-14">
					<h2 className="text-2xl font-bold text-center text-primary">
						Reviews
					</h2>
					<ReviewsSection
						booksReviews={reviewResultWithUsers}
						canReview={userHasBook}
						userId={userSession?.id ?? ''}
						bookId={book.id}
					/>
				</section>
			</div>
		</main>
	);
}
