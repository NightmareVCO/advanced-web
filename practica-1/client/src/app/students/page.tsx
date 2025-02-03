import StudentManagement from '@components/section/StudentManagement';

import { SERVER, TEST_SERVER } from '@constants/constants';

const CURRENT_SERVER = SERVER || TEST_SERVER;

export default async function Students() {
	let students = [];

	try {
		const data = await fetch(`http://${CURRENT_SERVER}/api/v1/students`, {
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
