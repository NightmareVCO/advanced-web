import type Role from '@lib/data/roles.data';

export type User = {
	id: number;
	firstName: string;
	lastName: string;
	username: string;
	email: string;
	password: string;
	status: string;
	role: Role;
};

export default User;
