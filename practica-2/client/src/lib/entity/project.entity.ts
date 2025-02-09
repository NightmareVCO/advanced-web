import type User from '@lib/entity/user.entity';

export type Project = {
	id: number;
	name: string;
	owner: string;
	desc: string;
	tag: string;
	team: User[];
	isPublic: boolean;
};
