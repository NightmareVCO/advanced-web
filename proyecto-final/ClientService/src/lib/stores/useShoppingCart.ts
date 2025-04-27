import type { Product } from '@lib/data/products.data';
import { getBookById, getBooksByIds } from '@lib/fetch/books.fetch';
import {
	type CartResult,
	addProductToShoppingCart,
	clearShoppingCart,
	getUserCart,
	removeProductFromShoppingCart,
} from '@lib/fetch/cart.fetch';
import type { UserSession } from '@lib/utils/auth.utils';
import { create } from 'zustand';

export type CartItem = {
	cartItemId: string;
	book: Product;
};

type ShoppingCartState = {
	cart: CartItem[];

	user: UserSession | null;
	setUser: (user: UserSession) => void;

	counter: number;
	setCounter: (counter: number) => void;

	totalPrice: number;
	setTotalPrice: (totalPrice: number) => void;

	isLoading: boolean;
	getCart: () => void;
	addItem: ({ bookId }: { bookId: string }) => void;
	removeItem: ({ cartItemId }: { cartItemId: string }) => void;
	clearCart: () => void;
};

export const useShoppingCart = create<ShoppingCartState>((set, get) => ({
	cart: [],

	user: null,
	setUser: (user) => set({ user }),

	counter: 0,
	setCounter: (counter) => set({ counter }),

	totalPrice: 0,
	setTotalPrice: (totalPrice) => set({ totalPrice }),

	isLoading: true,
	getCart: async () => {
		set((state) => ({ ...state, isLoading: true }));

		try {
			console.log('Fetching cart...');
			console.log('User:', get().user);

			const cartResults: CartResult[] | null = await getUserCart({
				userId: get().user?.id || '',
				userToken: get().user?.token || '',
			});

			if (!cartResults) {
				set((previous) => ({ ...previous, isLoading: false }));
				return;
			}

			const books: Product[] | null = await getBooksByIds({
				ids: cartResults.map((item) => item.bookId),
			});
			if (!books) {
				set((previous) => ({ ...previous, isLoading: false }));
				return;
			}

			const booksMap = new Map<string, Product>();
			for (const book of books) {
				booksMap.set(book.id, book);
			}

			const cartItems: CartItem[] = cartResults
				.map((cartResult) => {
					const book = booksMap.get(cartResult.bookId);
					if (!book) return null;

					return {
						cartItemId: cartResult.id,
						book,
					};
				})
				.filter((item): item is CartItem => item !== null);

			set({
				cart: cartItems,
				isLoading: false,
				counter: cartItems.length,
				totalPrice: cartItems.reduce(
					(acc, item) => acc + (item.book.price || 0),
					0,
				),
			});
		} catch {
			set((previous) => ({ ...previous, isLoading: false }));
		}
	},
	addItem: async ({ bookId }) => {
		set((state) => ({ ...state, isLoading: true }));
		if (get().cart.some((item) => item.book.id === bookId)) {
			set((previous) => ({ ...previous, isLoading: false }));
			return;
		}

		const response: CartResult | null = await addProductToShoppingCart({
			bookId,
			userId: get().user?.id || '',
			userToken: get().user?.token || '',
		});

		if (!response) {
			set((previous) => ({ ...previous, isLoading: false }));
			return;
		}

		const book: Product | null = await getBookById({
			id: bookId,
		});
		if (!book) {
			set((previous) => ({ ...previous, isLoading: false }));
			return;
		}

		set((state) => ({
			cart: [...state.cart, { cartItemId: response.id, book }],
			counter: state.counter + 1,
			totalPrice: state.totalPrice + (book.price || 0),
			isLoading: false,
		}));
	},
	removeItem: async ({ cartItemId }) => {
		set((state) => ({ ...state, isLoading: true }));

		await removeProductFromShoppingCart({
			userToken: get().user?.token || '',
			cartItemId,
		});

		const cartItem = get().cart.find((item) => item.cartItemId === cartItemId);
		if (!cartItem) {
			set((previous) => ({ ...previous, isLoading: false }));
			return;
		}

		set((state) => ({
			cart: state.cart.filter((item) => item.cartItemId !== cartItemId),
			counter: state.counter - 1,
			totalPrice: state.totalPrice - (cartItem.book.price || 0),
			isLoading: false,
		}));
	},
	clearCart: async () => {
		set((state) => ({ ...state, isLoading: true }));
		await clearShoppingCart({
			userToken: get().user?.token || '',
			userId: get().user?.id || '',
		});

		set({
			cart: [],
			counter: 0,
			totalPrice: 0,
			isLoading: false,
		});
	},
}));
