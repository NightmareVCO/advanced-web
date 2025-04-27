import { API_URL, type ErrorResponse } from '@lib/constants/api.constants';
import { EndpointEnum } from '@lib/constants/endpoints.constants';

const ORDERS_ENDPOINT = EndpointEnum.Orders;
const ORDERS_URL = `${API_URL}${ORDERS_ENDPOINT}`;

const HEADERS = {
	'Content-Type': 'application/json',
};

export type OrderItem = {
	bookId: string;
	bookName: string;
	bookCover: string;
	bookAuthor: string;
	bookGenres: string[];
	bookDescription: string;
	bookPrice: number;
};

export type Order = {
	id: string;
	items: OrderItem[];
	totalPrice: number;
	createDate: string;
};

type GetOrdersProperties = {
	userToken: string;
	userId: string;
};

export const getOrders = async ({
	userToken,
	userId,
}: GetOrdersProperties): Promise<Order[] | null> => {
	try {
		const response = await fetch(`${ORDERS_URL}user/${userId}`, {
			method: 'GET',
			headers: {
				...HEADERS,
				Authorization: `Bearer ${userToken}`,
			},
			cache: 'no-cache',
		});

		if (!response.ok) {
			throw new Error('Failed to fetch orders');
		}

		return await response.json();
	} catch (error) {
		console.error('Error fetching orders:', error);
		return [] as Order[];
	}
};

export const getUserHasBook = async ({
	userToken,
	userId,
	bookId,
}: {
	userId: string;
	bookId: string;
	userToken: string;
}): Promise<boolean> => {
	try {
		const response = await fetch(`${ORDERS_URL}user/${userId}/has-book/${bookId}`, {
			method: 'GET',
			headers: {
				...HEADERS,
				Authorization: `Bearer ${userToken}`,
			},
			cache: 'no-cache',
		});

		if (!response.ok) {
			const errorResponse = (await response.json()) as ErrorResponse;
			throw new Error(errorResponse.message);
		}

		return response.json();
	} catch (error) {
		console.error('Error fetching user book:', error);
		return false;
	}
};