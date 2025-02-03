import StudentManagement from '@components/section/StudentManagement';

export default async function Students() {
	let students = [];

	try {
		const data = await fetch('http://app-prod:8080/api/v1/students', {
			cache: 'no-store',
		});
		students = await data.json();
	} catch (error) {}

	return (
		<main className="container mx-auto mt-[80px] flex max-w-[1024px] flex-col items-start px-8">
			<StudentManagement students={students} />
		</main>
	);
}
