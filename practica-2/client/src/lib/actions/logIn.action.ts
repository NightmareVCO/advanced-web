'use server';

import { createSession, deleteSession } from '@lib/auth/session';
import Routes from '@lib/data/routes.data';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function logIn(prevState: unknown, formData: FormData) {
	try {
		const loginDTO = Object.fromEntries(formData.entries());
		const response = await fetch('http://localhost:8080/api/v1/login/', {
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
