import { removeUserFromTeam } from '@/lib/actions/project.action';
import DeleteIcon from '@components/Icons/DeleteIcon';
import {
	Button,
	Form,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Tooltip,
	useDisclosure,
} from '@heroui/react';
import type { AuthPackage } from '@lib/entity/auth.entity';
import type User from '@lib/entity/user.entity';
import { useTranslations } from 'next-intl';
import { useActionState } from 'react';

type RemoveUserFromTeamProps = {
	authPackage: AuthPackage;
	user: User;
	projectId: string;
	setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export default function RemoveUserFromTeam({
	authPackage,
	user,
	projectId,
	setSelectedUser,
}: RemoveUserFromTeamProps) {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [{ errors }, action, pending] = useActionState(removeUserFromTeam, {
		errors: {},
	});

	const t = useTranslations('removeUserFromTeamModal');

	return (
		<>
			<Tooltip color="danger" content="Delete">
				<Button
					color="default"
					variant="light"
					isIconOnly
					size="lg"
					onPress={() => {
						onOpen();
					}}
				>
					<span className="text-lg text-danger cursor-pointer active:opacity-50">
						<DeleteIcon />
					</span>
				</Button>
			</Tooltip>
			<Modal
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				isDismissable={false}
				isKeyboardDismissDisabled={false}
				size="md"
			>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader>
								<h2 className="text-lg font-medium">{t('modalTitle')}</h2>
							</ModalHeader>
							<ModalBody>
								<Form
									id="remove-user-form-team"
									validationBehavior="native"
									validationErrors={errors}
									action={action}
								>
									<input type="hidden" name="username" value={user.username} />
									<input type="hidden" name="jwt" value={authPackage.jwt} />
									<input type="hidden" name="projectId" value={projectId} />
									<p className="text-default-400">
										{user.firstName} {user.lastName} - ({user.email})
									</p>
									<p className="text-default-400">{t('modalConfirmation')}</p>
								</Form>
							</ModalBody>
							<ModalFooter>
								<Button
									color="default"
									radius="full"
									variant="light"
									onPress={() => {
										setSelectedUser(null);
										onClose();
									}}
								>
									{t('cancelButton')}
								</Button>
								<Button
									form="remove-user-form-team"
									isDisabled={pending}
									isLoading={pending}
									type="submit"
									color="danger"
									radius="full"
								>
									{t('deleteButton')}
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}
