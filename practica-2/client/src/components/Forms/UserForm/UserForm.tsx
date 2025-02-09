import { Form, Input, Select, SelectItem } from '@heroui/react';

import { EyeFilledIcon } from '@components/Icons/EyeFilledIcon';
import { EyeSlashFilledIcon } from '@components/Icons/EyeSlashFilledIcon';
import Role from '@lib/data/roles.data';
import type User from '@lib/entity/user.entity';
import { useState } from 'react';

type userFormProps = {
	user?: User;
};

export default function UserForm({ user }: userFormProps) {
	const [isVisible, setIsVisible] = useState(false);

	const toggleVisibility = () => setIsVisible(!isVisible);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
	};

	return (
		<Form
			id="user-form"
			className="flex flex-col gap-3 items-center justify-center w-full p-4"
			validationBehavior="native"
			onSubmit={handleSubmit}
		>
			<Input
				isRequired
				label="First Name"
				name="firstName"
				placeholder="Enter the user's name"
				type="text"
				variant="bordered"
				size="lg"
				radius="full"
				defaultValue={user?.firstName}
			/>

			<Input
				isRequired
				label="Last Name"
				name="lastName"
				placeholder="Enter the user's last name"
				type="text"
				variant="bordered"
				size="lg"
				radius="full"
				defaultValue={user?.lastName}
			/>

			<Input
				isRequired
				label="Username"
				name="username"
				placeholder="Enter the user's username"
				type="text"
				variant="bordered"
				size="lg"
				radius="full"
				defaultValue={user?.username}
			/>

			<Input
				isRequired
				label="Email"
				name="email"
				placeholder="Enter the user's email"
				type="email"
				variant="bordered"
				size="lg"
				radius="full"
				defaultValue={user?.email}
			/>

			{!user && (
				<Input
					isRequired
					label="Password"
					name="password"
					placeholder="Enter the user's password"
					type={isVisible ? 'text' : 'password'}
					variant="bordered"
					size="lg"
					radius="full"
					endContent={
						<button
							aria-label="toggle password visibility"
							className="focus:outline-none"
							type="button"
							onClick={toggleVisibility}
						>
							{isVisible ? (
								<EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
							) : (
								<EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
							)}
						</button>
					}
				/>
			)}

			<Select
				isRequired
				label="Main Role"
				placeholder="Select the user's main role"
				variant="bordered"
				size="lg"
				radius="full"
				defaultSelectedKeys={user ? [user.role] : []}
			>
				{Object.keys(Role).map((role) => (
					<SelectItem key={role}>{role}</SelectItem>
				))}
			</Select>
		</Form>
	);
}
