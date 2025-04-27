import type { GetBooksProperties } from '@lib/fetch/books.fetch';

export const buildCatalogQueryString = (params: GetBooksProperties): string => {
	const query = new URLSearchParams();

	if (params.title) query.append('title', params.title);
	if (params.author) query.append('author', params.author);
	if (params.genre) {
		const allGenres = params.genre.split(',');
		for (const genre of allGenres) {
			query.append('genre', genre);
		}
	}
	if (params.minPrice !== undefined)
		query.append('minPrice', params.minPrice.toString());
	if (params.maxPrice !== undefined)
		query.append('maxPrice', params.maxPrice.toString());
	if (params.page !== undefined) query.append('page', params.page.toString());
	if (params.sort) query.append('sort', params.sort);

	return query.toString();
};
