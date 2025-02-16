import { Form, Input, Select, SelectItem } from '@heroui/react';

import { EyeFilledIcon } from '@components/Icons/EyeFilledIcon';
import { EyeSlashFilledIcon } from '@components/Icons/EyeSlashFilledIcon';
import Role from '@lib/data/roles.data';
import type { AuthPackage } from '@lib/entity/auth.entity';
import type User from '@lib/entity/user.entity';
import { useTranslations } from 'next-intl';
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

	const t = useTranslations('userForm');

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
				label={t('firstNameLabel')}
				name="firstName"
				placeholder={t('firstNamePlaceholder')}
				type="text"
				variant="bordered"
				size="lg"
				radius="full"
				defaultValue={user?.firstName}
			/>

			<Input
				isRequired
				label={t('lastNameLabel')}
				name="lastName"
				placeholder={t('lastNamePlaceholder')}
				type="text"
				variant="bordered"
				size="lg"
				radius="full"
				defaultValue={user?.lastName}
			/>

			<Input
				isRequired
				label={t('usernameLabel')}
				name="username"
				placeholder={t('usernamePlaceholder')}
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
				label={t('emailLabel')}
				name="email"
				placeholder={t('emailPlaceholder')}
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
					label={t('passwordLabel')}
					name="password"
					placeholder={t('passwordPlaceholder')}
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
				label={t('mainRoleLabel')}
				placeholder={t('mainRolePlaceholder')}
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
