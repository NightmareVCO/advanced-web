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
				errorMessage="First name must be a valid name"
				defaultValue={student?.firstName}
				isDisabled={justWatch}
			/>
			<Input
				label="Last Name"
				name="lastName"
				isClearable
				placeholder="Enter your last name"
				isRequired
				errorMessage="Last name must be a valid name"
				defaultValue={student?.lastName}
				isDisabled={justWatch}
			/>
			<Input
				label="ID"
				name="matricula"
				type="text"
				maxLength={8}
				minLength={8}
				isClearable
				placeholder="Enter your id"
				isRequired
				pattern="^10[1-9][0-9][0-9]{4}$"
				errorMessage="ID must be 8 digits and be a valid ID such as 10141514 or 10231514"
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
				maxLength={10}
				minLength={9}
				pattern="^1?(809|829|849)[0-9]{7}$"
				placeholder="Enter your phone"
				isRequired
				errorMessage="Phone number must be at least 9 digits and start with 809, 829 or 849"
				defaultValue={student?.phone}
				isDisabled={justWatch}
			/>
		</Form>
	);
}
