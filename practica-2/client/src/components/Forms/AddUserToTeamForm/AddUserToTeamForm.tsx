import AddToUserToTeamModal from '@components/Modal/AddUserToTeamModal/AddUserToTeamModal';
import { Form, Input } from '@heroui/react';
import { addUserToTeam } from '@lib/actions/project.action';
import type { AuthPackage } from '@lib/entity/auth.entity';
import type { Project } from '@lib/entity/project.entity';
import { startTransition, useActionState, useState } from 'react';

export type AddUserToTeamFormProps = {
	authPackage: AuthPackage;
	project: Project;
};

export default function AddUserToTeamForm({
	project,
	authPackage,
}: AddUserToTeamFormProps) {
	const [{ errors }, action, pending] = useActionState(addUserToTeam, {
		errors: {},
	});

	const [username, setUsername] = useState('');

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = e.currentTarget;

		startTransition(() => {
			if (form.checkValidity()) {
				const formData = new FormData(form);
				action(formData);
			} else {
				form.reportValidity();
			}
		});
	};

	return (
		<Form
			id="add-user-to-team"
			className="flex flex-row items-center justify-between w-full p-4"
			validationBehavior="native"
			validationErrors={errors}
			onSubmit={handleSubmit}
		>
			<input type="hidden" name="projectId" value={project.id} />
			<input type="hidden" name="jwt" value={authPackage.jwt} />
			<Input
				isRequired
				label="Member username"
				isClearable
				name="username"
				placeholder="Enter the username of the member"
				type="text"
				variant="bordered"
				size="lg"
				radius="full"
				onKeyDown={(e) => {
					if (e.key === 'Enter') {
						e.preventDefault();
					}
				}}
				onChange={(e) => setUsername(e.target.value)}
			/>
			<div className="flex flow-row items-center gap-x-2 justify-end w-full">
				{errors?.username && (
					<span className="text-red-500 text-sm">{errors.username}</span>
				)}
				<AddToUserToTeamModal pending={pending} username={username} />
			</div>
		</Form>
	);
}
