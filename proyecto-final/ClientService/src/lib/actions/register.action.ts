'use server';

import { API_URL, type ErrorResponse } from '@lib/constants/api.constants';
import { EndpointEnum } from '@lib/constants/endpoints.constants';

import { createSession } from '@/lib/actions/session.action';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const REGISTER_ENDPOINT = EndpointEnum.Register;
const REGISTER_URL = `${API_URL}${REGISTER_ENDPOINT}`;

const EMAIL_ENDPOINT = EndpointEnum.Email;
const EMAIL_URL = `${API_URL}${EMAIL_ENDPOINT}`;

const HEADERS = {
	'Content-Type': 'application/json',
};

type RegisterDTO = {
	firstName: string;
	lastName: string;
	username: string;
	email: string;
	password: string;
	role: string;
};

type RegisterResponse = {
	token: string;
};

const manageError = (error: unknown) => {
	if (error instanceof Error) {
		return {
			errors: {
				firstName: error.message,
				lastName: error.message,
				email: error.message,
				username: error.message,
				password: error.message,
				confirmPassword: error.message,
			},
		};
	}

	if (error === 'string') {
		return {
			errors: {
				firstName: error,
				lastName: error,
				email: error,
				username: error,
				password: error,
				confirmPassword: error,
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

export async function register(prevState: unknown, formData: FormData) {
	try {
		const registerDTO: RegisterDTO = {
			firstName: formData.get('firstName') as string,
			lastName: formData.get('lastName') as string,
			email: formData.get('email') as string,
			username: (formData.get('email') as string).split('@')[0],
			password: formData.get('password') as string,
			role: 'USER',
		};

		const response = await fetch(REGISTER_URL, {
			method: 'POST',
			headers: HEADERS,
			body: JSON.stringify(registerDTO),
		});
		if (response.status === 401) {
			const unauthorizedResponse: ErrorResponse = await response.json();
			return {
				errors: {
					firstName: unauthorizedResponse.message,
					lastName: unauthorizedResponse.message,
					email: unauthorizedResponse.message,
					username: unauthorizedResponse.message,
					password: unauthorizedResponse.message,
					confirmPassword: unauthorizedResponse.message,
				},
			};
		}

		const authorizedResult: RegisterResponse = await response.json();
		await createSession(authorizedResult.token);
		await sendEmailRegistration(prevState, formData);
	} catch (error: unknown) {
		return manageError(error);
	}
	redirect('/');
}

export async function createUser(prevState: unknown, formData: FormData) {
	try {
		const registerDTO: RegisterDTO = {
			firstName: formData.get('firstName') as string,
			lastName: formData.get('lastName') as string,
			email: formData.get('email') as string,
			username: (formData.get('email') as string).split('@')[0],
			password: formData.get('password') as string,
			role: 'ADMIN',
		};

		const response = await fetch(REGISTER_URL, {
			method: 'POST',
			headers: HEADERS,
			body: JSON.stringify(registerDTO),
		});
		if (response.status === 401) {
			const unauthorizedResponse: ErrorResponse = await response.json();
			return {
				errors: {
					firstName: unauthorizedResponse.message,
					lastName: unauthorizedResponse.message,
					email: unauthorizedResponse.message,
					username: unauthorizedResponse.message,
					password: unauthorizedResponse.message,
					confirmPassword: unauthorizedResponse.message,
				},
			};
		}

		revalidatePath('/dashboard/users');
	} catch (error: unknown) {
		return manageError(error);
	}
	redirect('/');
}

type InfoDTO = {
	email: string;
	name: string;
};

export const sendEmailRegistration = async (
	prevState: unknown,
	formData: FormData,
) => {
	try {
		const infoDTO: InfoDTO = {
			email: formData.get('email') as string,
			name: formData.get('firstName') as string,
		};

		const response = await fetch(`${EMAIL_URL}send-registration`, {
			method: 'POST',
			headers: HEADERS,
			body: JSON.stringify(infoDTO),
		});

		if (!response.ok) {
			throw new Error('Failed to send email');
		}
	} catch (error: unknown) {
		return null;
	}
};
