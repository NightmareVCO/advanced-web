'use server';

import { SERVER, TEST_SERVER } from '@constants/constants';
import { revalidatePath } from 'next/cache';

const CURRENT_SERVER = SERVER || TEST_SERVER;
const ERROR_MESSAGE = 'Action not available';

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export async function createStudent(prevState: any, formData: FormData) {
	try {
		const student = Object.fromEntries(formData.entries());
		const response = await fetch(`http://${CURRENT_SERVER}/api/v1/students`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(student),
		});
		const result = await response.json();
		revalidatePath('/students');
		return result;
	} catch (error) {
		return {
			errors: {
				student: `${ERROR_MESSAGE} + ${error}`,
			}
		};
	}
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export async function updateStudent(prevState: any, formData: FormData) {
	try {
		const id = Number(formData.get('id'));
		const student = Object.fromEntries(formData.entries());

		const response = await fetch(
			`http://${CURRENT_SERVER}/api/v1/students/${id}`,
			{
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(student),
			},
		);
		const result = await response.json();

		revalidatePath('/students');
		return result;
	} catch (error) {
		return {
			errors: `${ERROR_MESSAGE} + ${error}`,
		};
	}
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export async function deleteStudent(prevState: any, formData: FormData) {
	try {
		const id = Number(formData.get('id'));
		const response = await fetch(
			`http://${CURRENT_SERVER}/api/v1/students/${id}`,
			{
				method: 'DELETE',
			},
		);
		const result = await response.json();

		revalidatePath('/students');
		return result;
	} catch (error) {
		return {
			errors: `${ERROR_MESSAGE} + ${error}`,
		};
	}
}
