import { API_URL, type ErrorResponse } from '@lib/constants/api.constants';
import { EndpointEnum } from '@lib/constants/endpoints.constants';
import type { Product } from '@lib/data/products.data';
import { buildCatalogQueryString } from '@lib/utils/query.utils';

const CATALOG_ENDPOINT = EndpointEnum.Books;
const CATALOG_URL = `${API_URL}${CATALOG_ENDPOINT}`;

const BOOK_ENDPOINT = EndpointEnum.Book;
const BOOK_URL = `${API_URL}${BOOK_ENDPOINT}`;

const HEADERS = {
	'Content-Type': 'application/json',
};

export type BookResult = {
	total: number;
	page: number;
	pageSize: number;
	books: Product[];
};

export type GetBooksProperties = {
	title?: string;
	author?: string;
	genre?: string;
	page?: number;
	sort?: string;
	minPrice?: number;
	maxPrice?: number;
};

export const getBooks = async (
	params: GetBooksProperties = {},
): Promise<BookResult> => {
	try {
		const queryString = buildCatalogQueryString(params);
		const response = await fetch(`${CATALOG_URL}?${queryString}`, {
			method: 'GET',
			headers: HEADERS,
			cache: 'no-cache',
		});

		if (!response.ok) {
			throw new Error('Failed to fetch books');
		}

		return response.json();
	} catch (error) {
		console.error('Error fetching books:', error);
		return {} as BookResult;
	}
};

type GetBookByIdProperties = {
	id: string;
};

export const getBookById = async ({
	id,
}: GetBookByIdProperties): Promise<Product | null> => {
	try {
		const response = await fetch(`${BOOK_URL}${id}`, {
			method: 'GET',
			headers: HEADERS,
			cache: 'no-cache',
		});

		console.log('Response:', response);

		if (!response.ok) {
			return null;
		}

		return response.json();
	} catch (error) {
		console.error('Error fetching book:', error);
		return null;
	}
};

type GetBooksByIdsProperties = {
	ids: string[];
};

export const getBooksByIds = async ({
	ids,
}: GetBooksByIdsProperties): Promise<Product[] | null> => {
	try {
		const response = await fetch(`${BOOK_URL}ids`, {
			method: 'POST',
			headers: HEADERS,
			cache: 'no-cache',
			body: JSON.stringify({ booksIds: ids }),
		});

		if (!response.ok) {
			return null;
		}

		return response.json();
	} catch (error) {
		console.error('Error fetching books:', error);
		return null;
	}
};
