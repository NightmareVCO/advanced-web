'use server';

import { API_URL, type ErrorResponse } from '@lib/constants/api.constants';
import { EndpointEnum } from '@lib/constants/endpoints.constants';

import { createSession, deleteSession } from '@/lib/actions/session.action';
import { redirect } from 'next/navigation';

const LOGIN_ENDPOINT = EndpointEnum.Login;
const LOGIN_URL = `${API_URL}${LOGIN_ENDPOINT}`;

const HEADERS = {
	'Content-Type': 'application/json',
};

type LoginDTO = {
	username: string;
	password: string;
};

type LoginResponse = {
	token: string;
};

const manageError = (error: unknown) => {
	if (error instanceof Error) {
		return {
			errors: {
				username: error.message,
				password: error.message,
			},
		};
	}

	if (error === 'string') {
		return {
			errors: {
				username: error,
				password: error,
			},
		};
	}

	return {
		errors: {
			username: 'An unknown error occurred',
			password: 'An unknown error occurred',
		},
	};
};

export async function logIn(prevState: unknown, formData: FormData) {
	try {
		const loginDTO: LoginDTO = {
			username: formData.get('username') as string,
			password: formData.get('password') as string,
		};

		const response = await fetch(LOGIN_URL, {
			method: 'POST',
			headers: HEADERS,
			body: JSON.stringify(loginDTO),
		});
		if (response.status === 401) {
			const unauthorizedResponse: ErrorResponse = await response.json();
			return {
				errors: {
					username: unauthorizedResponse.message,
					password: unauthorizedResponse.message,
				},
			};
		}

		const authorizedResult: LoginResponse = await response.json();
		await createSession(authorizedResult.token);
	} catch (error: unknown) {
		return manageError(error);
	}
	redirect('/');
}

export async function logout() {
	await deleteSession();
	redirect('/');
}
