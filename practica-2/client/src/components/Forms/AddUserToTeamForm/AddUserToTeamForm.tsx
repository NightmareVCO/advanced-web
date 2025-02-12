import { addUserToTeam } from '@lib/actions/project.action';
import { Form, Input } from '@heroui/react';
import { useActionState, useState } from 'react';
import AddToUserToTeam from '@components/Modal/AddUserToTeamModal/AddUserToTeamModal';

export default function AddUserToTeamForm() {
	const [{ errors }, action, pending] = useActionState(addUserToTeam, {
		errors: {},
	});

	const [username, setUsername] = useState('');

	return (
		<Form
			id="add-user-to-team"
			className="flex flex-row gap-3 items-center justify-center w-full p-4"
			validationBehavior="native"
			validationErrors={errors}
			action={action}
		>
			<Input
				isRequired
				label="Member username"
				name="username"
				placeholder="Enter the username of the member"
				type="text"
				variant="bordered"
				size="lg"
				radius="full"
				onChange={(e) => setUsername(e.target.value)}
			/>
			<div className="flex justify-center w-full">
				<AddToUserToTeam pending={pending} username={username} />
				{errors?.username && (
					<span className="text-red-500 text-sm">{errors.username}</span>
				)}
			</div>
		</Form>
	);
}
