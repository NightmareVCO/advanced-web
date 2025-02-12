'use server';

import { SERVER_PATH } from '@lib/constants/server.constants';
const THIS_PATH = 'project';

const CURRENT_PATH = `${SERVER_PATH}/${THIS_PATH}/`;

export async function createProject(prevState: unknown, formData: FormData) {
	try {
		const project = Object.fromEntries(formData.entries());
		const response = await fetch(CURRENT_PATH, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(project),
		});

		const result = await response.json();
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
		const response = await fetch(CURRENT_PATH, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(project),
		});

		const result = await response.json();
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

// TODO: change endpoint
export async function addUserToTeam(prevState: unknown, formData: FormData) {
  try {
    const project = Object.fromEntries(formData.entries());
    const response = await fetch(CURRENT_PATH, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
    });

    const result = await response.json();
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
