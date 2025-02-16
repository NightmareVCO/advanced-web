'use client';

import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from '@heroui/react';

import UserForm from '@components/Forms/UserForm/UserForm';
import { createUser, updateUser } from '@lib/actions/users.action';
import type { AuthPackage } from '@lib/entity/auth.entity';
import type User from '@lib/entity/user.entity';
import { useTranslations } from 'next-intl';
import { useActionState, useEffect } from 'react';

type UserModalProps = {
	authPackage: AuthPackage;
	user?: User;
	setUser?: React.Dispatch<React.SetStateAction<User | null>>;
	isOpen: boolean;
	onOpen: () => void;
	onOpenChange: () => void;
	actionToPerform: string;
};

export default function UserModal({
	authPackage,
	user,
	setUser,
	isOpen,
	onOpen,
	onOpenChange,
	actionToPerform,
}: UserModalProps) {
	useEffect(() => {
		if (user) {
			onOpen();
		}
	}, [user, onOpen]);

	const formAction = actionToPerform === 'create' ? createUser : updateUser;
	const [{ errors }, action, pending] = useActionState(formAction, {
		errors: {},
	});

	const t = useTranslations('userModal');

	return (
		<Modal
			isOpen={isOpen}
			onOpenChange={onOpenChange}
			isDismissable={false}
			isKeyboardDismissDisabled={false}
			size="xl"
		>
			<ModalContent>
				{(onClose) => (
					<>
						<ModalHeader className="flex flex-col gap-1">
							{user ? t('editUser') : t('createUser')}
						</ModalHeader>
						<ModalBody>
							<UserForm
								action={action}
								errors={errors}
								pending={pending}
								user={user}
								authPackage={authPackage}
							/>
						</ModalBody>
						<ModalFooter>
							<Button
								color="danger"
								radius="full"
								variant="light"
								onPress={() => {
									if (setUser) setUser(null);
									onClose();
								}}
							>
								{t('closeButton')}
							</Button>
							<Button
								form="user-form"
								type="submit"
								className="bg-primary font-medium text-white"
								color="secondary"
								radius="full"
								isDisabled={pending}
								isLoading={pending}
							>
								{t('createButton')}
							</Button>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	);
}
