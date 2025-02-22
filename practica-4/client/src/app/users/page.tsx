import Header from '@components/Header/Header';
import UserSection from '@components/Users/UserSection';
import UserModalSection from '@components/Users/UsersModalSection';
import { getUsers } from '@lib/data/fetch/users.fetch';
import { getAuthUser } from '@lib/utils/auth.utils';
import { getTranslations } from 'next-intl/server';
import { cookies } from 'next/headers';

export default async function UsersPage() {
	const jwt = (await cookies()).get('session')?.value;
	const [authPackage, authError] = await getAuthUser(jwt as string);
	if (authError) {
		return;
	}

	const [users, error] = await getUsers(jwt as string);

	const t = await getTranslations('usersPage');

	return (
		<main className="mt-6 flex w-full flex-col items-center">
			<Header title={t('title')} description={t('description')}>
				<UserModalSection authPackage={authPackage} />
			</Header>
			<section className="w-full max-w-7xl px-4 lg:px-8">
				<div className="w-full flex flex-col items-center justify-center pb-4">
					{error && <p className="text-start text-red-400">{t('error')}</p>}
				</div>
				<UserSection users={users} authPackage={authPackage} />
			</section>
		</main>
	);
}
