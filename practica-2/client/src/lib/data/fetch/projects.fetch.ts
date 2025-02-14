import type { Project } from '@lib/entity/project.entity';

import { PROJECTS_PATH, SERVER_PATH } from '@lib/constants/server.constants';
import Method from '@lib/data/method.data';
import Routes from '@lib/data/routes.data';
import { redirect } from 'next/navigation';
const THIS_PATH = PROJECTS_PATH;

const CURRENT_PATH = `${SERVER_PATH}/${THIS_PATH}/`;

export const getUserProjects = async (
	token: string,
): Promise<[Project[], Error | null]> => {
	try {
		const response = await fetch(CURRENT_PATH, {
			method: Method.GET,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			cache: 'no-cache',
		});
		const projects = await response.json();
		return [projects, null];
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	} catch (error: any) {
		return [[], error];
	}
};

export const getProject = async ({
	token,
	id,
}: { token: string; id: string }): Promise<[Project, Error | null]> => {
	try {
		const response = await fetch(`${CURRENT_PATH}${id}`, {
			method: Method.GET,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
		const project = await response.json();
		if (project?.message === 'Project not found') {
			return [{} as Project, new Error('Project not found')];
		}

		return [project, null];
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	} catch (error: any) {
		return [{} as Project, error];
	}
};

export const getPublicProjects = async (): Promise<
	[Project[], Error | null]
> => {
	try {
		const response = await fetch(`${CURRENT_PATH}public/`, {
			method: Method.GET,
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const projects = await response.json();
		return [projects, null];
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	} catch (error: any) {
		return [[], error];
	}
};
