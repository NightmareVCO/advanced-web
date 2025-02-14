'use server';

import { SERVER_PATH } from '@lib/constants/server.constants';
import Method from '@lib/data/method.data';
import Routes from '@lib/data/routes.data';
import { revalidatePath } from 'next/cache';
const THIS_PATH = 'projects';

const CURRENT_PATH = `${SERVER_PATH}/${THIS_PATH}/`;

export async function createProject(prevState: unknown, formData: FormData) {
	try {
		const project = Object.fromEntries(formData.entries());
		const projectDTO = {
			name: project.name,
			desc: project.desc,
			tag: project.tag,
			owner: {
				username: project.owner,
			},
			openAccess: project.openAccess === 'true',
		};
		const response = await fetch(CURRENT_PATH, {
			method: Method.POST,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${String(project.jwt)}`,
			},
			body: JSON.stringify(projectDTO),
		});

		const result = await response.json();
		revalidatePath(Routes.Projects);
		return result;
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	} catch (error: any) {
		return {
			errors: {
				createProject: error.message,
			},
		};
	}
}

export async function updateProject(prevState: unknown, formData: FormData) {
	try {
		const project = Object.fromEntries(formData.entries());
		const projectDTO = {
			name: project.name,
			desc: project.desc,
			tag: project.tag,
			owner: {
				username: project.owner,
			},
			openAccess: project.openAccess === 'true',
		};

		const response = await fetch(
			`${CURRENT_PATH}${String(project.projectId)}`,
			{
				method: Method.PATCH,
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${String(project.jwt)}`,
				},
				body: JSON.stringify(projectDTO),
			},
		);

		const result = await response.json();
		revalidatePath(`${Routes.Projects}/${String(project.projectId)}`);
		return result;
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	} catch (error: any) {
		return {
			errors: {
				updateProject: error.message,
			},
		};
	}
}

export async function addUserToTeam(prevState: unknown, formData: FormData) {
	try {
		const userDTO = Object.fromEntries(formData.entries());
		const response = await fetch(
			`${CURRENT_PATH}add-user/${String(userDTO.username)}/to-project/${String(userDTO.projectId)}`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${String(userDTO.jwt)}`,
				},
			},
		);

		const result = await response.json();
		revalidatePath(`${Routes.Projects}/${String(userDTO.projectId)}`);
		return result;
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	} catch (error: any) {
		return {
			errors: {
				username: error.message,
			},
		};
	}
}

export async function removeUserFromTeam(prevState: unknown, formData: FormData) {
	try {
		const userDTO = Object.fromEntries(formData.entries());
		const response = await fetch(
			`${CURRENT_PATH}remove-user/${String(userDTO.username)}/from-project/${String(userDTO.projectId)}`,
			{
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${String(userDTO.jwt)}`,
				},
			},
		);
		console.log(userDTO);
		console.log(response.body);

		const result = await response.json();
		revalidatePath(`${Routes.Projects}/${String(userDTO.projectId)}`);
		return result;
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	} catch (error: any) {
		return {
			errors: {
				username: error.message,
			},
		};
	}
}