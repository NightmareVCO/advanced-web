'use server';

import { SERVER_PATH, PUBLIC_SERVER_PATH  } from '@lib/constants/server.constants';
import ContentEncoding from '@lib/data/contentEncoding.data';
import ContentType from '@lib/data/contentType.data';
import Method from '@lib/data/method.data';
import Routes from '@lib/data/routes.data';
import statusCodes from '@lib/data/statusCode.data';
import { parseExpirationTime } from '@lib/utils/date.utils';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
const THIS_PATH = 'endpoint';

const CURRENT_PATH = `${SERVER_PATH}/${THIS_PATH}/`;

export async function createEndpoint(prevState: unknown, formData: FormData) {
	const id = formData.get('projectId');
	try {
		const endpoint = Object.fromEntries(formData.entries());

		const prefix = PUBLIC_SERVER_PATH;
		const path = endpoint.path as string;
		const cleanPath = path.replace(prefix, '');
		const endpointDTO = {
			name: String(endpoint.name).toLowerCase(),
			description: endpoint.description,
			path: cleanPath.startsWith('/') ? cleanPath.slice(1) : cleanPath,
			method: Method[endpoint.method as keyof typeof Method],
			body: endpoint.code,
			responseStatus: String(
				statusCodes.find(
					(code) => code.code === Number.parseInt(String(endpoint.statusCode)),
				)?.code,
			),
			responseType:
				ContentType[endpoint.contentType as keyof typeof ContentType],
			encoding:
				ContentEncoding[
					endpoint.contentEncoding as keyof typeof ContentEncoding
				],
			delay: Number.parseInt(endpoint.delay as string, 10),
			expirationDate: parseExpirationTime(endpoint.expiration as string),
			headers: Object.keys(endpoint)
				.filter((key) => key.startsWith('headerKey-'))
				.map((key, index) => ({
					key: endpoint[key],
					value: endpoint[`headerValue-${index}`],
				})),
			security: endpoint.security === 'on',
			status: true,
			projectId: endpoint.projectId,
		};

		const result = await fetch(CURRENT_PATH, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(endpointDTO),
		});

		const resultBody = await result.json();
		if (
			resultBody?.message ===
			'Endpoint with the same path and method already exists'
		) {
			throw new Error('Endpoint with the same path and method already exists');
		}

		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	} catch (error: any) {
		return {
			errors: {
				error: error?.message || 'An unknown error occurred',
			},
		};
	}
	revalidatePath(`${Routes.Projects}/${String(id)}`);
	redirect(`${Routes.Projects}/${String(id)}`);
}

export async function updateEndpoint(prevState: unknown, formData: FormData) {
	const id = formData.get('projectId');
	try {
		const endpoint = Object.fromEntries(formData.entries());
		console.log({ endpoint });

		const prefix = SERVER_PATH;
		const path = endpoint.path as string;
		const cleanPath = path.replace(prefix, '');

		const endpointDTO = {
			name: String(endpoint.name).toLowerCase(),
			description: endpoint.description,
			path: cleanPath.startsWith('/') ? cleanPath.slice(1) : cleanPath,
			method: Method[endpoint.method as keyof typeof Method],
			body: endpoint.code,
			responseStatus: String(
				statusCodes.find(
					(code) => code.code === Number.parseInt(String(endpoint.statusCode)),
				)?.code,
			),
			responseType:
				ContentType[endpoint.contentType as keyof typeof ContentType],
			encoding:
				ContentEncoding[
					endpoint.contentEncoding as keyof typeof ContentEncoding
				],
			delay: Number.parseInt(endpoint.delay as string, 10),
			expirationDate: parseExpirationTime(endpoint.expiration as string),
			headers: Object.keys(endpoint)
				.filter((key) => key.startsWith('headerKey-'))
				.map((key, index) => ({
					key: endpoint[key],
					value: endpoint[`headerValue-${index}`],
				})),
			security: endpoint.security === 'on',
			status: true,
			projectId: endpoint.projectId,
		};

		console.log({ endpointDTO });

		const result = await fetch(`${CURRENT_PATH}${String(endpoint.id)}`, {
			method: Method.PATCH,
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(endpointDTO),
		});

		const resultBody = await result.json();
		if (
			resultBody?.message ===
			'Endpoint with the same path and method already exists'
		) {
			throw new Error('Endpoint with the same path and method already exists');
		}
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	} catch (error: any) {
		return {
			errors: {
				error: error?.message || 'An unknown error occurred',
			},
		};
	}
	revalidatePath(`${Routes.Projects}/${String(id)}`);
	redirect(`${Routes.Projects}/${String(id)}`);
}

export async function deleteEndpoint(prevState: unknown, formData: FormData) {
	const id = formData.get('projectId');
	try {
		const endpoint = Object.fromEntries(formData.entries());
		const result = await fetch(`${CURRENT_PATH}${String(endpoint.id)}`, {
			method: Method.DELETE,
			headers: {
				'Content-Type': 'application/json',
			},
		});

		revalidatePath(`${Routes.Projects}/${String(id)}`);
		return await result.json();
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	} catch (error: any) {
		return {
			errors: {
				deleteEndpoint: error.message || 'An unknown error occurred',
			},
		};
	}
}
