import StudentManagement from '@components/section/StudentManagement';

export default async function Students() {
	const data = await fetch('http://app-prod:8080/api/v1/students', {
		cache: 'no-store',
	});
	const students = await data.json();

	return (
		<main className="container mx-auto mt-[80px] flex max-w-[1024px] flex-col items-start px-8">
			<StudentManagement students={students} />
		</main>
	);
}
