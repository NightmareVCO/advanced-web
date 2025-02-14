import { SERVER_PATH, USERS_PATH } from '@lib/constants/server.constants';
import Method from '@lib/data/method.data';
import type User from '@lib/entity/user.entity';
const THIS_PATH = USERS_PATH;

const CURRENT_PATH = `${SERVER_PATH}/${THIS_PATH}/`;

export const getUsers = async (
	token: string,
): Promise<[User[], Error | null]> => {
	try {
		const response = await fetch(CURRENT_PATH, {
			method: Method.GET,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
		const projects = await response.json();
		return [projects, null];
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	} catch (error: any) {
		return [[], error];
	}
};
