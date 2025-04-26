'use server';
import type { Product } from '@lib/data/products.data';

import { API_URL, type ErrorResponse } from '@lib/constants/api.constants';
import { EndpointEnum } from '@lib/constants/endpoints.constants';

const ORDERS_ENDPOINT = EndpointEnum.Orders;
const ORDERS_URL = `${API_URL}${ORDERS_ENDPOINT}`;

const HEADERS = {
	'Content-Type': 'application/json',
};

type CreateOrderDTO = {
	userId: string;
	items: {
		bookId: string;
		bookName: string;
		bookCover: string;
		bookAuthor: string;
		bookGenres: string[];
		bookDescription: string;
		bookPrice: number;
	}[];
	totalPrice: number;
};

const manageError = (error: unknown) => {
	if (error instanceof Error) {
		return {
			errors: {
				userId: error.message,
				Products: error.message,
				totalAmount: error.message,
			},
		};
	}
	if (error === 'string') {
		return {
			errors: {
				userId: error,
				Products: error,
				totalAmount: error,
			},
		};
	}
	return {
		errors: {
			userId: 'An unknown error occurred',
			Products: 'An unknown error occurred',
			totalAmount: 'An unknown error occurred',
		},
	};
};

export const createOrderInServer = async (
	prevState: unknown,
	formData: FormData,
) => {
	try {
		const userToken = formData.get('userToken') as string;

		const rawProducts = formData.get('items') as string | null;
		const parsedProducts = JSON.parse(rawProducts ?? '[]') as Product[];
		const totalPrice = Number.parseFloat(formData.get('totalPrice') as string);

		const orderDTO: CreateOrderDTO = {
			userId: formData.get('userId') as string,
			items: parsedProducts.map((product) => ({
				bookId: product.id,
				bookName: product.title,
				bookCover: product.cover,
				bookAuthor: product.author,
				bookGenres: product.genres,
				bookDescription: product.description,
				bookPrice: product.price,
			})),
			totalPrice: totalPrice,
		};

		const response = await fetch(ORDERS_URL, {
			method: 'POST',
			headers: {
				...HEADERS,
				Authorization: `Bearer ${userToken}`,
			},
			body: JSON.stringify(orderDTO),
		});

		if (!response.ok) {
			const errorResponse: ErrorResponse = await response.json();
			console.error('Error response:', errorResponse);
			return {
				errors: {
					userId: errorResponse.message,
					Products: errorResponse.message,
					totalAmount: errorResponse.message,
				},
			};
		}
	} catch (error: unknown) {
		return manageError(error);
	}
};
