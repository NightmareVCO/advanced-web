import Header from '@components/Header/Header';
import UserSection from '@components/Users/UserSection';
import UserModalSection from '@components/Users/UsersModalSection';

export default function UsersPage() {
	return (
		<main className="mt-6 flex w-full flex-col items-center">
			<Header title="Users" description="Manage all users here.">
				<UserModalSection />
			</Header>
			<section className="w-full max-w-7xl px-4 lg:px-8">
				<UserSection />
			</section>
		</main>
	);
}
