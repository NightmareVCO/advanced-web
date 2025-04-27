import { API_URL } from '@lib/constants/api.constants';
import { EndpointEnum } from '@lib/constants/endpoints.constants';

const REVIEW_USER_ENDPOINT = EndpointEnum.Reviews;
const REVIEW_USER_URL = `${API_URL}${REVIEW_USER_ENDPOINT}`;

const USER_ENDPOINT = EndpointEnum.Users;
const USER_URL = `${API_URL}${USER_ENDPOINT}`;

const HEADERS = {
	'Content-Type': 'application/json',
};

export type UserForComments = {
	id: string;
	firstName: string;
	lastName: string;
};

type UserForCommentsResult = {
	ids: string[];
};

export const getUsersForCommentsById = async ({
	ids,
}: UserForCommentsResult): Promise<UserForComments[] | null> => {
	try {
		const response = await fetch(`${REVIEW_USER_URL}for-comments/`, {
			method: 'POST',
			headers: HEADERS,
			cache: 'no-cache',
			body: JSON.stringify({ ids }),
		});

		if (!response.ok) {
			return null;
		}

		return response.json();
	} catch (error) {
		console.error('Error fetching users:', error);
		return null;
	}
};

export type User = {
	id: string;
	firstName: string;
	lastName: string;
	username: string;
	email: string;
	role: string;
	active: boolean;
};

type GetUsersProperties = {
	userToken: string;
};
export const getUsers = async ({
	userToken,
}: GetUsersProperties): Promise<User[] | null> => {
	try {
		const response = await fetch(`${USER_URL}`, {
			method: 'GET',
			headers: {
				...HEADERS,
				Authorization: `Bearer ${userToken}`,
			},
			cache: 'no-cache',
		});

		if (!response.ok) {
			return null;
		}

		return response.json();
	} catch (error) {
		console.error('Error fetching users:', error);
		return null;
	}
};
