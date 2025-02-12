'use server';

import { createSession, deleteSession } from '@lib/auth/session';
import Routes from '@lib/data/routes.data';
import { redirect } from 'next/navigation';

import { SERVER_PATH } from '@lib/constants/server.constants';
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
		await createSession(result?.token);

		redirect(Routes.Projects);

		return result;
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	} catch (error: any) {
		return {
			errors: {
				login: error.message,
			},
		};
	}
}

export async function logout() {
	deleteSession();
	redirect(Routes.Home);
}
