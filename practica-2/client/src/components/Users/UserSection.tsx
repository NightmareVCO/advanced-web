'use client';

import UsersTable from '@components/Table/UsersTable';
import Role from '@lib/data/roles.data';
import type User from '@lib/entity/user.entity';

const users: User[] = [
	{
		id: 1,
		firstName: 'User 1',
		lastName: 'Last Name',
		username: 'user1',
		email: 'User1@email.com',
		role: Role.Admin,
		password: 'password',
		status: 'active',
	},
	{
		id: 2,
		firstName: 'User 2',
		lastName: 'Last Name',
		username: 'user2',
		email: 'User2@email.com',
		role: Role.User,
		password: 'password',
		status: 'active',
	},
];

export default function UserSection() {
	return (
		<section className="flex flex-col gap-4">
			<div className="sm:flex justify-end w-full hidden">
				<UsersTable users={users} />
			</div>
		</section>
	);
}
