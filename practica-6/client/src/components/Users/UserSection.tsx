'use client';

import type { AuthPackage } from '@/lib/entity/auth.entity';
import UsersTable from '@components/Table/UsersTable';
import type User from '@lib/entity/user.entity';

type UserSectionProps = {
	authPackage: AuthPackage;
	users: User[];
};

export default function UserSection({ users, authPackage }: UserSectionProps) {
	return (
		<section className="flex flex-col gap-4">
			<div className="sm:flex justify-end w-full hidden">
				<UsersTable users={users} authPackage={authPackage} />
			</div>
		</section>
	);
}
