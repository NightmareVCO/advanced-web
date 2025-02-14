import { Form, Input, Select, SelectItem } from '@heroui/react';

import { EyeFilledIcon } from '@components/Icons/EyeFilledIcon';
import { EyeSlashFilledIcon } from '@components/Icons/EyeSlashFilledIcon';
import Role from '@lib/data/roles.data';
import type { AuthPackage } from '@lib/entity/auth.entity';
import type User from '@lib/entity/user.entity';
import { useState } from 'react';

type userFormProps = {
	authPackage: AuthPackage;
	user?: User;
	errors: Record<string, string>;
	action: (payload: FormData) => void;
	pending: boolean;
};

export default function UserForm({
	user,
	authPackage,
	errors,
	action,
}: userFormProps) {
	const [isVisible, setIsVisible] = useState(false);
	const toggleVisibility = () => setIsVisible(!isVisible);

	return (
		<Form
			id="user-form"
			className="flex flex-col gap-3 items-center justify-center w-full p-4"
			validationBehavior="native"
			validationErrors={errors}
			action={action}
		>
			<input
				type="hidden"
				name="currentUser"
				defaultValue={authPackage.username}
			/>
			<input type="hidden" name="id" value={user?.id} />
			<input type="hidden" name="jwt" defaultValue={authPackage.jwt} />
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
				isDisabled={String(user?.id) === authPackage.userId || !!user}
				defaultValue={user?.username}
			/>
			{user && <input type="hidden" name="username" value={user?.username} />}

			<Input
				isRequired
				label="Email"
				name="email"
				placeholder="Enter the user's email"
				type="email"
				variant="bordered"
				size="lg"
				radius="full"
				isDisabled={String(user?.id) === authPackage.userId || !!user}
				defaultValue={user?.email}
			/>
			{user && <input type="hidden" name="email" value={user?.email} />}

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
			{user && <input type="hidden" name="password" value={user?.password} />}

			<Select
				isRequired
				label="Main Role"
				placeholder="Select the user's main role"
				name="role"
				variant="bordered"
				size="lg"
				radius="full"
				isDisabled={String(user?.id) === authPackage.userId}
				// @ts-ignore
				defaultSelectedKeys={user ? [Role.User] : []}
			>
				{Object.keys(Role).map((role) => (
					<SelectItem key={role}>{role}</SelectItem>
				))}
			</Select>
		</Form>
	);
}
