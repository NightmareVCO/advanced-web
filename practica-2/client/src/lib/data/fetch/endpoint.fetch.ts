import { ENDPOINT_PATH, SERVER_PATH } from '@lib/constants/server.constants';
import Method from '@lib/data/method.data';
import type Endpoint from '@lib/entity/endpoint.entity';
const THIS_PATH = ENDPOINT_PATH;

const CURRENT_PATH = `${SERVER_PATH}/${THIS_PATH}/`;

export const getEndpoint = async ({
	token,
	id,
}: { token: string; id: string }): Promise<[Endpoint, Error | null]> => {
	try {
		const response = await fetch(`${CURRENT_PATH}${id}`, {
			method: Method.GET,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
		const project = await response.json();
		return [project, null];
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	} catch (error: any) {
		return [{} as Endpoint, error];
	}
};
