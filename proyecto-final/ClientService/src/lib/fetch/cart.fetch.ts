import { API_URL } from '@lib/constants/api.constants';
import { EndpointEnum } from '@lib/constants/endpoints.constants';
import type { Product } from '@lib/data/products.data';

const CART_ENDPOINT = EndpointEnum.Cart;
const CART_URL = `${API_URL}${CART_ENDPOINT}`;

const HEADERS = {
	'Content-Type': 'application/json',
};

export type CartResult = {
	id: string;
	bookId: string;
};

export type GetUserCartProperties = {
	userToken: string;
	userId: string;
};

export const getUserCart = async ({
	userToken,
	userId,
}: GetUserCartProperties): Promise<CartResult[] | null> => {
	try {
		const response = await fetch(`${CART_URL}user/${userId}`, {
			method: 'GET',
			headers: {
				...HEADERS,
				Authorization: `Bearer ${userToken}`,
			},
			cache: 'no-cache',
		});

		if (!response.ok) {
			throw new Error('Failed to fetch books');
		}

		return response.json();
	} catch (error) {
		console.error('Error fetching books:', error);
		return [] as CartResult[];
	}
};

type AddProductToShoppingCartProperties = {
	bookId: string;
	userId: string;
	userToken: string;
};

export const addProductToShoppingCart = async ({
	bookId,
	userId,
	userToken,
}: AddProductToShoppingCartProperties): Promise<CartResult | null> => {
	try {
		const response = await fetch(`${CART_URL}`, {
			method: 'POST',
			headers: {
				...HEADERS,
				Authorization: `Bearer ${userToken}`,
			},
			body: JSON.stringify({
				bookId,
				userId,
			}),
		});
		if (!response.ok) {
			throw new Error('Failed to add product to shopping cart');
		}

		return response.json();
	} catch (error) {
		console.error('Error adding product to shopping cart:', error);
		return null;
	}
};

type RemoveProductFromShoppingCartProperties = {
	userToken: string;
	cartItemId: string;
};

export const removeProductFromShoppingCart = async ({
	userToken,
	cartItemId,
}: RemoveProductFromShoppingCartProperties): Promise<void> => {
	try {
		const response = await fetch(`${CART_URL}${cartItemId}`, {
			method: 'DELETE',
			headers: {
				...HEADERS,
				Authorization: `Bearer ${userToken}`,
			},
			cache: 'no-cache',
		});

		if (!response.ok) {
			throw new Error('Failed to remove product from shopping cart');
		}
	} catch (error) {
		console.error('Error removing product from shopping cart:', error);
	}
};

type ClearShoppingCartProperties = {
	userToken: string;
	userId: string;
};

export const clearShoppingCart = async ({
	userToken,
	userId,
}: ClearShoppingCartProperties): Promise<void> => {
	try {
		const response = await fetch(`${CART_URL}clean/user/${userId}`, {
			method: 'DELETE',
			headers: {
				...HEADERS,
				Authorization: `Bearer ${userToken}`,
			},
			cache: 'no-cache',
		});

		if (!response.ok) {
			throw new Error('Failed to clear shopping cart');
		}
	} catch (error) {
		console.error('Error clearing shopping cart:', error);
	}
};
