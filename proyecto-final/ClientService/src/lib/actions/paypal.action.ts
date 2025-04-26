'use server';
import {
	PAYPAL_SERVER_CLIENT_ID,
	PAYPAL_SERVER_SECRET_KEY,
} from '@lib/constants/paypal.constants';
import {
	CheckoutPaymentIntent,
	Client,
	Environment,
	OrdersController,
	type PurchaseUnitRequest,
} from '@paypal/paypal-server-sdk';

const client = new Client({
	clientCredentialsAuthCredentials: {
		oAuthClientId: PAYPAL_SERVER_CLIENT_ID,
		oAuthClientSecret: PAYPAL_SERVER_SECRET_KEY,
	},
	environment: Environment.Sandbox,
});

type OrderItem = {
	id: string;
	amount: string;
	name: string;
	description: string;
};

type OrderDTO = {
	items: OrderItem[];
	totalAmount: string;
};

export const createOrderInPayPal = async (
	prevState: unknown,
	formData: FormData,
) => {
	try {
		const orderDto: OrderDTO = {
			items: JSON.parse(
				(formData.get('items') as string | null) ?? '[]',
			) as unknown as OrderItem[],
			totalAmount: formData.get('totalAmount') as string,
		};

		const controller = new OrdersController(client);

		const amount = {
			currencyCode: 'USD',
			value: orderDto.totalAmount,
			breakdown: {
				itemTotal: {
					currencyCode: 'USD',
					value: orderDto.totalAmount,
				},
			},
		};

		const items = orderDto.items.map((item) => ({
			name: item.name,
			description: item.description,
			quantity: '1',
			unitAmount: {
				currencyCode: 'USD',
				value: item.amount,
			},
		}));

		const response = await controller.createOrder({
			prefer: 'return=representation',
			body: {
				intent: CheckoutPaymentIntent.Capture,
				purchaseUnits: [
					{
						amount: amount,
						items: items,
					},
				],
			},
		});

		return {
			success: true,
			orderId: response.result.id,
			approveLink: response.result.links?.find((link) => link.rel === 'approve')
				?.href,
		};
	} catch (error: unknown) {
		console.error('Error creating order:', error);
		return {
			success: false,
			error: 'Something went wrong creating the PayPal order',
		};
	}
};
