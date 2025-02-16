import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	useDisclosure,
} from '@heroui/react';
import type User from '@lib/entity/user.entity';
import { useTranslations } from 'next-intl';

type AddToUserToTeam = {
	pending: boolean;
	username: string;
};

export default function AddToUserToTeamModal({
	pending,
	username,
}: AddToUserToTeam) {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const t = useTranslations('addToUserToTeamModal');

	return (
		<>
			<Button
				form="project-form"
				className="bg-primary font-medium text-white"
				color="secondary"
				radius="full"
				isLoading={pending}
				isDisabled={pending || !username}
				onPress={onOpen}
			>
				{t('buttonLabel')}
			</Button>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">
								{t('modalTitle')}
							</ModalHeader>
							<ModalBody>
								<p className="text-sm text-default-500">
									{' '}
									{t('modalUserLabel', { username })}
								</p>
								<p className="text-sm text-default-500">
									{t('modalConfirmation')}
								</p>
							</ModalBody>
							<ModalFooter>
								<Button
									color="danger"
									radius="full"
									variant="light"
									onPress={onClose}
								>
									{t('closeButton')}
								</Button>
								<Button
									form="add-user-to-team"
									type="submit"
									className="bg-primary font-medium text-white"
									color="secondary"
									radius="full"
									isDisabled={pending}
									isLoading={pending}
								>
									{t('addButton')}
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}
