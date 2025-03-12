import type Role from '@lib/data/roles.data';

export type User = {
	id: number;
	firstName: string;
	lastName: string;
	username: string;
	email: string;
	password: string;
	active: boolean;
	roles: Set<Role>;
};

export default User;
