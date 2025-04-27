'use server';
import type { Product } from '@lib/data/products.data';

import { API_URL, type ErrorResponse } from '@lib/constants/api.constants';
import { EndpointEnum } from '@lib/constants/endpoints.constants';

const ORDERS_ENDPOINT = EndpointEnum.Orders;
const ORDERS_URL = `${API_URL}${ORDERS_ENDPOINT}`;

const EMAIL_ENDPOINT = EndpointEnum.Email;
const EMAIL_URL = `${API_URL}${EMAIL_ENDPOINT}`;

const HEADERS = {
	'Content-Type': 'application/json',
};

type OrderBookDTO = {
	bookId: string;
	bookName: string;
	bookCover: string;
	bookAuthor: string;
	bookGenres: string[];
	bookDescription: string;
	bookPrice: number;
};

type CreateOrderDTO = {
	userId: string;
	items: OrderBookDTO[];
	totalPrice: number;
};

// OrderResponseDTO {
//     String id;
//     OrderItemResponseDTO[] items;
//     double totalPrice;
//     LocalDateTime createDate;
// }


type OderResponseDTO = {
	id: string;
	items: OrderBookDTO[];
	totalPrice: number;
	createDate: string;
}

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

		const items: OrderBookDTO[] = parsedProducts.map((product) => ({
			bookId: product.id,
			bookName: product.title,
			bookCover: product.cover,
			bookAuthor: product.author,
			bookGenres: product.genres,
			bookDescription: product.description,
			bookPrice: product.price,
		}));

		const orderDTO: CreateOrderDTO = {
			userId: formData.get('userId') as string,
			items: items,
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

		const orderResponse: OderResponseDTO = await response.json();

		const infoDTO: InfoDTO = {
			orderId: orderResponse.id,
			userInfo: {
				email: formData.get('email') as string,
				name: formData.get('firstName') as string,
				lastName: formData.get('lastName') as string,
			},
			bookInfo: orderResponse.items.map((item) => ({
				title: item.bookName,
				description: item.bookDescription,
				author: item.bookAuthor,
				price: item.bookPrice,
				cover: item.bookCover,
			})),
			totalPrice: orderResponse.totalPrice,
			orderDate: orderResponse.createDate,
		};

		console.log({infoDTO});

		await sendEmailPurchase(infoDTO);
		return orderResponse;
	} catch (error: unknown) {
		return manageError(error);
	}
};

type EmailUserDTO = {
	email: string;
	name: string;
	lastName: string;
};
type EmailBookDTO = {
	title: string;
	description: string;
	author: string;
	price: number;
	cover: string;
}
type InfoDTO = {
	orderId: string;
	userInfo: EmailUserDTO;
	bookInfo: EmailBookDTO[];
	totalPrice: number;
	orderDate: string;
};

export const sendEmailPurchase= async (
 infoDTO: InfoDTO,
) => {
	try {
		const response = await fetch(`${EMAIL_URL}send-purchase`, {
			method: 'POST',
			headers: HEADERS,
			body: JSON.stringify(infoDTO),
		});

		if (!response.ok) {
			throw new Error('Failed to send email');
		}
	} catch (error: unknown) {
		return null;
	}
};