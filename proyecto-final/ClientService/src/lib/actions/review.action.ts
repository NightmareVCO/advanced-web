'use server';

import { API_URL, ErrorResponse } from '@lib/constants/api.constants';
import { EndpointEnum } from '@lib/constants/endpoints.constants';
import { revalidatePath } from 'next/cache';

const REVIEW_ENDPOINT = EndpointEnum.Reviews;
const REVIEW_URL = `${API_URL}${REVIEW_ENDPOINT}`;

const HEADERS = {
	'Content-Type': 'application/json',
};

// {
//     "title": "good soup",
//     "bookId": "6804a9e7ab0aad2a87d8a569",
//     "userId": "1",
//     "comment": "good book",
//     "rating": 4
// }

type CreateReviewDTO = {
	title: string;
	bookId: string;
	userId: string;
	comment: string;
	rating: number;
};

const manageError = (error: unknown) => {
	if (error instanceof Error) {
		return {
			errors: {
				title: error.message,
				comment: error.message,
			},
		};
	}
	if (error === 'string') {
		return {
			errors: {
				title: error,
				comment: error,
			},
		};
	}
	return {
		errors: {
			title: 'An unknown error occurred',
			comment: 'An unknown error occurred',
		},
	};
};

export const createReview = async (prevState: unknown, formData: FormData) => {
	try {
		const data = Object.fromEntries(formData.entries());

		const createReviewDTO: CreateReviewDTO = {
			title: data.title as string,
			bookId: data.bookId as string,
			userId: data.userId as string,
			comment: data.comment as string,
			rating: Number.parseInt(data.rating as string),
		};

		const response = await fetch(REVIEW_URL, {
			method: 'POST',
			headers: HEADERS,
			cache: 'no-cache',
			body: JSON.stringify(createReviewDTO),
		});

		if (!response.ok) {
			const errorResponse = await response.json();
			console.error('Error response:', errorResponse);
			return {
				errors: {
					title: errorResponse.message,
					comment: errorResponse.message,
				},
			};
		}

		revalidatePath(`/catalog/books/${data.bookId}`);
		return await response.json();
	} catch (error: unknown) {
		console.error('Error creating review:', error);
		return manageError(error);
	}
};
