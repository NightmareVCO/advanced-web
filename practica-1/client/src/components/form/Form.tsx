import { Form, Input } from '@heroui/react';
import type { Student } from '@type/types';

type FormProps = {
	student?: Student;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	errors: any;
	formAction?: (payload: FormData) => void;
	justWatch?: boolean;
};

export default function StudentForm({
	student,
	errors,
	formAction,
	justWatch,
}: FormProps) {
	return (
		<Form
			action={formAction}
			id="student-form"
			className="items-center justify-center w-full space-y-4"
			validationBehavior="native"
			validationErrors={errors}
		>
			<input type="hidden" name="id" value={student?.id} />
			<Input
				label="First Name"
				name="firstName"
				isClearable
				placeholder="Enter your first name"
				isRequired
				defaultValue={student?.firstName}
				isDisabled={justWatch}
			/>
			<Input
				label="Last Name"
				name="lastName"
				isClearable
				placeholder="Enter your last name"
				isRequired
				defaultValue={student?.lastName}
				isDisabled={justWatch}
			/>
			<Input
				label="Matricula"
				name="matricula"
				maxLength={8}
				minLength={8}
				isClearable
				placeholder="Enter your matricula"
				isRequired
				defaultValue={student?.matricula}
				isDisabled={justWatch}
			/>
			<Input
				label="Email"
				name="email"
				type="email"
				isClearable
				placeholder="Enter your email"
				isRequired
				defaultValue={student?.email}
				isDisabled={justWatch}
			/>
			<Input
				label="Phone"
				name="phone"
				type="tel"
				isClearable
				maxLength={11}
				minLength={10}
				placeholder="Enter your phone"
				isRequired
				defaultValue={student?.phone}
				isDisabled={justWatch}
			/>
		</Form>
	);
}
