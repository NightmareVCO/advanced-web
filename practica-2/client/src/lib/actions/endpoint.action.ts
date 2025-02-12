'use server';

import { SERVER_PATH } from '@lib/constants/server.constants';
import ContentEncoding from '@lib/data/contentEncoding.data';
import ContentType from '@lib/data/contentType.data';
import Method from '@lib/data/method.data';
import statusCodes from '@lib/data/statusCode.data';
import { parseExpirationTime } from '@lib/utils/date.utils';
const THIS_PATH = 'endpoint';

const CURRENT_PATH = `${SERVER_PATH}/${THIS_PATH}/`;

export async function createEndpoint(prevState: unknown, formData: FormData) {
	try {
		const endpoint = Object.fromEntries(formData.entries());

		const prefix = 'http://localhost:3000/';
		const endpointDTO = {
			name: endpoint.name,
			description: endpoint.description,
			path:
				typeof endpoint.path === 'string'
					? endpoint.path.replace(prefix, '')
					: '', // Remove the prefix
			method: Method[endpoint.method as keyof typeof Method],
			content: endpoint.code,
			statusCode: statusCodes.find(
				(code) => code.message === endpoint.statusCode,
			)?.code,
			contentType:
				ContentType[endpoint.contentType as keyof typeof ContentType],
			contentEncoding:
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
			security: endpoint.remember === 'on',
		};

		const response = await fetch(CURRENT_PATH, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(endpointDTO),
		});

		const result = await response.json();
		return result;

		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	} catch (error: any) {
		return {
			errors: {
				createEndpoint: error.message,
			},
		};
	}
}
