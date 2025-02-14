import Header from '@components/Header/Header';
import UserSection from '@components/Users/UserSection';
import UserModalSection from '@components/Users/UsersModalSection';
import { getUsers } from '@lib/data/fetch/users.fetch';
import { getAuthUser } from '@lib/utils/auth.utils';
import { cookies } from 'next/headers';

export default async function UsersPage() {
	const jwt = (await cookies()).get('session')?.value;
	const [authPackage, authError] = await getAuthUser(jwt as string);
	if (authError) {
		return;
	}

	const [users, error] = await getUsers(jwt as string);

	return (
		<main className="mt-6 flex w-full flex-col items-center">
			<Header title="Users" description="Manage all users here.">
				<UserModalSection authPackage={authPackage} />
			</Header>
			<section className="w-full max-w-7xl px-4 lg:px-8">
				<UserSection users={users} authPackage={authPackage} />
				{error && (
					<p className="text-start text-red-400">
						{`An error occurred while fetching the users ${error}`}
					</p>
				)}
			</section>
		</main>
	);
}
