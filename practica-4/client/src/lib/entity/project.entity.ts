import type Endpoint from '@lib/entity/endpoint.entity';
import type User from '@lib/entity/user.entity';

export type Project = {
	id: number;
	name: string;
	owner: User;
	description: string;
	tag: string;
	team: User[];
	openAccess: boolean;
	endpoints: Endpoint[];
};
