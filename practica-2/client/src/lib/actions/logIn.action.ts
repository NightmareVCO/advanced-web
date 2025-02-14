'use server';

import { createSession, deleteSession } from '@lib/auth/session';
import Routes from '@lib/data/routes.data';

import { SERVER_PATH } from '@lib/constants/server.constants';
import { redirect } from 'next/navigation';
const THIS_PATH = 'login';

const CURRENT_PATH = `${SERVER_PATH}/${THIS_PATH}/`;

export async function logIn(prevState: unknown, formData: FormData) {
	try {
		const loginDTO = Object.fromEntries(formData.entries());
		const response = await fetch(CURRENT_PATH, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(loginDTO),
		});

		const result = await response.json();
		if (result.message === 'Wrong Credentials') {
			throw new Error('Wrong Credentials');
		}

		await createSession(result?.token);

		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	} catch (error: any) {
		if (error.message.includes('NEXT_REDIRECT')) {
			return {
				errors: {
					login: 'LogIn Successful',
				},
			};
		}

		return {
			errors: {
				login: error.message,
			},
		};
	}

	redirect(Routes.Projects);
}

export async function logout() {
	deleteSession();
	redirect(Routes.Home);
}
