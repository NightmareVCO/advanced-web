'use client';

import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	useDisclosure,
} from '@heroui/react';

import UserForm from '@components/Forms/UserForm/UserForm';
import { Icon } from '@iconify/react';
import type User from '@lib/entity/user.entity';
import { useEffect } from 'react';

type UserModalProps = {
	user?: User;
	setUser?: React.Dispatch<React.SetStateAction<User | null>>;
	isOpen: boolean;
	onOpen: () => void;
	onOpenChange: () => void;
};

export default function UserModal({
	user,
	setUser,
	isOpen,
	onOpen,
	onOpenChange,
}: UserModalProps) {
	useEffect(() => {
		if (user) {
			onOpen();
		}
	}, [user, onOpen]);

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
							{user ? 'Edit User' : 'Create New User'}
						</ModalHeader>
						<ModalBody>
							<UserForm user={user} />
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
								Close
							</Button>
							<Button
								form="project-form"
								className="bg-primary font-medium text-white"
								color="secondary"
								radius="full"
							>
								Create
							</Button>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	);
}
